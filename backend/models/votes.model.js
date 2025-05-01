import mongoose from 'mongoose';

const { Schema } = mongoose;

const VoteSchema = new Schema({
    electionId: {
        type: Schema.Types.ObjectId,
        ref: 'Election',
        required: true,
    },
    candidateId: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})