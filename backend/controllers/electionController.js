import Election from '../models/election.js';

// 1. Create a new election
export const createElection = async(req, res) => {
    const { title, description, startDate, endDate, isPublic } = req.body;

    try {
        const newElection = new Election({
            title,
            description,
            startDate,
            endDate,
            isPublic,
        });

        const saved = await newElection.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create election', error });
    }
};

// 2. Get all elections (admin-only, includes all statuses)
export const getAllElections = async(req, res) => {
    try {
        const elections = await Election.find().sort({ createdAt: -1 });
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching elections', error });
    }
};

// 3. Get election by ID
export const getElectionById = async(req, res) => {
    const { id } = req.params;

    try {
        const election = await Election.findById(id);
        if (!election) return res.status(404).json({ message: 'Election not found' });

        res.status(200).json(election);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching election', error });
    }
};

// 4. Update election (admin-only)
export const updateElection = async(req, res) => {
    const { id } = req.params;

    try {
        const updatedElection = await Election.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedElection) return res.status(404).json({ message: 'Election not found' });

        res.status(200).json(updatedElection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update election', error });
    }
};

// 5. Delete election
export const deleteElection = async(req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Election.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Election not found' });

        res.status(200).json({ message: 'Election deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting election', error });
    }
};

// 6. Manually update election status
export const updateElectionStatus = async(req, res) => {
    const { id } = req.params;
    const { status } = req.body; // expected: 'upcoming', 'ongoing', 'completed'

    if (!['upcoming', 'ongoing', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const updated = await Election.findByIdAndUpdate(id, { status }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Election not found' });

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status', error });
    }
};

// 7. Get only public and ongoing/upcoming elections
export const getPublicElections = async(req, res) => {
    try {
        const elections = await Election.find({
            isPublic: true,
            status: { $in: ['upcoming', 'ongoing'] },
        });
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch public elections', error });
    }
};