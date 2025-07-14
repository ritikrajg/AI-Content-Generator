import axios from "axios";
const server = process.env.REACT_APP_SERVER_URL;

export const freeSubscriptionApi = async () => {
  const res = await axios.post(
    `${server}/api/v1/payment/freeplan`,
    {},
    { withCredentials: true }
  );
  return res?.data;
};

export const upgradeSubscriptionApi = async (details) => {
  const res = await axios.post(
    `${server}/api/v1/payment/upgrade`,
    {
      amount: details.amount,
      subscriptionPlan: details.subscriptionPlan,
      monthlyRequestCount: details.monthlyRequestCount,
    },
    { withCredentials: true }
  );
  return res?.data;
};

export const verifyPaymentApi = async (paymentId) => {
  const res = await axios.post(
    `${server}/api/v1/payment/verify/${paymentId}`,
    {},
    { withCredentials: true }
  );
  return res?.data;
};
