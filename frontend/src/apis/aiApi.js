import axios from "axios";
const server = process.env.REACT_APP_SERVER_URL;

export const generateContentApi = async ({ prompt }) => {
  const res = await axios.post(
    `${server}/api/v1/ai/generate`,
    { prompt },
    { withCredentials: true }
  );
  return res?.data;
};
