import mongoose from 'mongoose';
const { Schema } = mongoose;

const CandidateSchema = new Schema({
    electionId: {
        type: Schema.Types.ObjectId,
        ref: 'Election',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Candidate = mongoose.models.Candidate || mongoose.model('Candidate', CandidateSchema);
export default Candidate;