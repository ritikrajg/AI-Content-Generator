import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { freeSubscriptionApi } from "../apis/paymentApi";
import StatusMessage from "../components/StatusMessage.component";

const FreePlan = () => {
  const mutation = useMutation({ mutationFn: freeSubscriptionApi });
  const navigate = useNavigate();
  const planDetails = {
    name: "Free",
    price: "₹0.00/month",
    features: ["50 Credits", "1 User", "Basic Support"],
  };
  const handleClick = () => {
    mutation.mutate();
  };
  useEffect(() => {
    let timeOut;
    if (mutation.isSuccess) {
      timeOut = setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
    return () => clearTimeout(timeOut);
  }, [mutation, navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Confirm Your {planDetails.name} Plan
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Enjoy our free plan with no costs involved. Get started now and
          upgrade anytime to access more features.
        </p>
        <ul className="list-disc list-inside mb-6 text-gray-600">
          {planDetails.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <div className="text-center text-green-600 font-bold mb-6">
          {planDetails.price} - No Payment Required
        </div>
        <div className="flex flex-col gap-2 mb-2 text-center">
          {mutation?.isError && (
            <StatusMessage
              type={"error"}
              message={mutation?.error?.response?.data?.message}
            />
          )}
          {mutation?.isPending && (
            <StatusMessage type={"loading"} message={"Loading.."} />
          )}
          {mutation?.isSuccess && (
            <StatusMessage type={"success"} message={mutation?.data?.message} />
          )}
        </div>
        <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-lime-500 hover:from-lime-600 hover:to-lime-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
          onClick={handleClick}
          disabled={mutation?.isError}
        >
          Confirm Free Plan
        </button>
        <Link to="/plans">
          <button className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Choose Different Plan
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FreePlan;
