import mongoose from 'mongoose';

const coachMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coach',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        required: true,
    },
    text: {
        type: String,
    },
    image:{
        type:String,
    }
}, { timestamps: true });

const coachMessage = mongoose.model('coachMessage', coachMessageSchema);

export default coachMessage;