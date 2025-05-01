import express from 'express';
import {
    createElection,
    getAllElections,
    getElectionById,
    updateElection,
    deleteElection,
    updateElectionStatus,
    getPublicElections,
} from '../controllers/electionController.js';

const router = express.Router();

// Public route
router.get('/public', getPublicElections);

// Admin routes
router.post('/', createElection);
router.get('/', getAllElections);
router.get('/:id', getElectionById);
router.put('/:id', updateElection);
router.delete('/:id', deleteElection);
router.patch('/:id/status', updateElectionStatus);

export default router;