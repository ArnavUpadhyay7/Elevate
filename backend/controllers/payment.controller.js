const paymentModel = require("../models/payment.model");
const coachModel   = require("../models/coach.model");
const playerModel  = require("../models/player.model");
const reviewModel  = require("../models/review.model");
const instance     = require("../utils/razorpay");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

exports.payment = async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  try {
    const order = await instance.orders.create({
      amount: amount * 100,
      currency,
      receipt,
      notes,
    });

    const payment = new paymentModel({
      playerId: req.player._id,
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      status:   order.status,
      receipt:  order.receipt,
      notes:    order.notes,
    });
    const savedPayment = await payment.save();

    const coach = await coachModel.findOne({ email: notes.coachEmail });

    if (coach) {
      const alreadyBooked = req.player.payed_coach.some(
        (id) => id.toString() === coach._id.toString()
      );
      if (!alreadyBooked) {
        await playerModel.findByIdAndUpdate(req.player._id, {
          $addToSet: { payed_coach: coach._id },
        });
      }

      const coachHasPlayer = coach.payed_player.some(
        (id) => id.toString() === req.player._id.toString()
      );
      if (!coachHasPlayer) {
        await coachModel.findByIdAndUpdate(coach._id, {
          $addToSet: { payed_player: req.player._id },
        });
      }

      const existingReview = await reviewModel.findOne({
        player: req.player._id,
        coach:  coach._id,
        status: { $in: ["awaiting_upload", "under_review"] },
      });

      if (!existingReview) {
        await reviewModel.create({
          player: req.player._id,
          coach:  coach._id,
        });
      }
    }

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

    const payment = await paymentModel.findOne({
      orderId: paymentDetails.order_id,
    });

    if (!payment) {
      return res.status(200).json({ message: "Payment not found" });
    }

    payment.paymentId = paymentDetails.id;
    payment.status    = paymentDetails.status;
    await payment.save();

    return res.status(200).json({ message: "Webhook processed successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};