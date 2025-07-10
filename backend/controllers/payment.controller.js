import Stripe from "stripe";
import { Payment } from "../models/payment.model.js";
import { User } from "../models/user.model.js";
import { nextBillingDate, renewPlan } from "../utils/featureFunctions.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripePayment = async (req, res, next) => {
  try {
    const { amount, subscriptionPlan, monthlyRequestCount } = req.body;
    if (!amount || !subscriptionPlan || !monthlyRequestCount) {
      throw new Error("Provide subcription details");
    }
    const user = req?.user;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "inr",
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
        monthlyRequestCount,
      },
    });
    res.json({
      clientSecret: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
    });
  } catch (error) {
    next(error);
    // res.status(500).json({ success: false, error: error });
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    const { metadata, amount, status } = paymentIntent;
    const { userId, subscriptionPlan, monthlyRequestCount } = metadata;
    if (status === "succeeded") {
      const newPayment = await Payment.create({
        user: userId,
        reference: paymentId,
        amount: amount / 100,
        status,
        subscriptionPlan,
        monthlyRequestCount,
      });
      const updatingUser = await User.findByIdAndUpdate(
        userId,
        {
          trialPeriod: 0,
          trialActive: false,
          trialExpires: new Date(),
          apiRequestCount: 0,
          nextBillingDate: nextBillingDate(),
          subscriptionPlan,
          monthlyRequestCount,
          $addToSet: { payments: newPayment?._id },
        },
        { new: true }
      );
      if (updatingUser) {
        res.status(200).json({
          success: true,
          message: "Payment verified successfully",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Updating User payment verification failed",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Payment Failed, status not success",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const freeSubscription = async (req, res, next) => {
  try {
    const user = req.user;
    const newPayment = await Payment.create({
      user: user?._id,
      reference: Math.random().toString(36).substring(2),
      status: "succeeded",
      subscriptionPlan: "Free",
      amount: 0,
      monthlyRequestCount: 50,
    });
    if (renewPlan(user)) {
      user.trialPeriod = 0;
      user.trialActive = false;
      user.trialExpires = new Date();
      user.subscriptionPlan = "Free";
      user.apiRequestCount = 0;
      user.monthlyRequestCount = 50;
      user.nextBillingDate = nextBillingDate();
      user.payments.push(newPayment?._id);
      await user.save();
      res.json({
        success: true,
        message: `${user.subscriptionPlan} subscription plan updated successfully`,
      });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Subcription renewal not due yet" });
    }
  } catch (error) {
    next(error);
  }
};
