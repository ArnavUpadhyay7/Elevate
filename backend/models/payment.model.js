const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'player'
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    receipt: {
        type: String,
        required: true
    },
    notes: {
        coachEmail: {
            type: String
        },
        playerEmail: {
            type: String
        }
    },
    status: {
        type: String,
        required: true
    }, 
}, {timestamps: true});

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;