const paymentModel = require("../models/payment.model");
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
    const webhookSignature = req.get["X-Razorpay-Signature"];

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
    payment.status = paymentDetails.status;
    await payment.save();

    // const user = 

    if(req.body.event == "payment.captured" ) {
        
    }
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
};