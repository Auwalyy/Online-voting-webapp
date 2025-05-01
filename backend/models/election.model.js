import { mongoose } from 'mongoose';


const { Schema } = mongoose;

const ElectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming',
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Election = mongoose.models.Election || mongoose.model('Election', ElectionSchema);
export default Election;