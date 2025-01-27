import mongoose from 'mongoose';

const playerMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coach',
        required: true,
    },
    text: {
        type: String,
    }
}, { timestamps: true });

const playerMessage = mongoose.model('playerMessage', playerMessageSchema);

export default playerMessage;