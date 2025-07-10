import React, { useState } from "react";
import StatusMessage from "../components/StatusMessage.component";
import { Link, useLocation } from "react-router-dom";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const Publishable_key = process.env.REACT_APP_STRIPE_PUB_KEY;
const stripePromise = loadStripe(Publishable_key);

const CheckOutForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const amount = params.get("amount");
  const subscriptionPlan = params.get("plan");
  const monthlyRequestCount = params.get("credits");

  //Stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    try {
      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://geniehub.vercel.app/verify",
        },
      });

      if (error) {
        setIsLoading(false);
        console.error("Error confirming payment:", error);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setIsSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Confirm Your {subscriptionPlan} Plan
        </h2>
        <div className="flex flex-auto justify-between text-lg">
          <div className="text-center font-bold mb-6">
            Amount : <span className="text-green-600">₹{amount}</span>
          </div>
          <div className="text-center font-bold mb-6">
            Credits :
            <span className="text-indigo-500"> {monthlyRequestCount}</span>
          </div>
        </div>
        <div className="mb-3">
          {isLoading && (
            <StatusMessage
              type={"loading"}
              message={"Loading please wait..."}
            />
          )}
          {isSuccess && (
            <StatusMessage type={"success"} message={"Payment Successful"} />
          )}
          {isError && (
            <StatusMessage
              type={"error"}
              message={"Payment Failed, Try Again"}
            />
          )}
        </div>
        <form>
          <PaymentElement />
          <button
            className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-600 hover:to-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
            onClick={handleSubmit}
          >
            Confirm Payment
          </button>
        </form>
        <button className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Link to="/plans">Choose Different Plan</Link>
        </button>
        <span>Card Number: 4242-4242-4242-4242</span>
        <div>Expiry Date: Future Date</div>
        <div>CVC Number: Any Number of your choice</div>
      </div>
    </div>
  );
};

const CheckOut = () => {
  const location = useLocation();
  const clientSecret = location.state;
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckOutForm />
    </Elements>
  );
};

export default CheckOut;
