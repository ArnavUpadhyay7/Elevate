const paymentModel = require("../models/payment.model");
const coachModel = require("../models/coach.model");
const playerModel = require("../models/player.model");
const instance = require("../utils/razorpay");
const {validateWebhookSignature,} = require("razorpay/dist/utils/razorpay-utils");

exports.payment = async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  try {
    var options = {
      amount: amount * 100,
      currency,
      receipt,
      notes,
    };
    const order = await instance.orders.create(options);

    // saving it in db
    const payment = new paymentModel({
      playerId: req.player._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();

    // returning it back to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.webhook = async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    const isWebHookValid = validateWebhookSignature(
        JSON.stringify(req.body),
        webhookSignature,
        process.env.RAZORPAY_WEBHOOK_SECRET
      );
    
    if (!isWebHookValid) {
        return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await paymentModel.findOne({orderId: paymentDetails.order_id});
    payment.paymentId = paymentDetails.id;
    payment.status = paymentDetails.status;
    await payment.save();

    const player = await playerModel.findOne({_id: payment.playerId}).populate('payed_coach', 'fullname profilePic rank role');
    const coach = await coachModel.findOne({email: payment.notes.coachEmail}).populate('payed_player', 'fullname profilePic rank role');
    
    // add coach._id to payed_coach in playerModel
    // add player._id to payed_player in coachModel

    if(player.payed_coach.includes(coach._id) || coach.payed_player.includes(player._id)) {
      return res.status(200).json({ message: "Webhook received successfully"});
    };

    player.payed_coach.push(coach._id);
    await player.save();
    coach.payed_player.push(player._id);
    await coach.save();

    return res.status(200).json({ message: "Webhook received successfully" });

    } catch (error) {
    res.status(500).json({ message: error.message });
  }
};