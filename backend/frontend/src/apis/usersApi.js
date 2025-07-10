import axios from "axios";

const server = process.env.REACT_APP_SERVER_URL;

export const registerUserApi = async (userData) => {
  const res = await axios.post(
    `${server}/api/v1/user/register`,
    {
      username: userData?.username,
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const loginUserApi = async (userData) => {
  const res = await axios.post(
    `${server}/api/v1/user/login`,
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const checkUserAuthentication = async () => {
  const res = await axios.get(`${server}/api/v1/user/auth`, {
    withCredentials: true,
  });
  return res?.data;
};

export const logoutApi = async () => {
  const res = await axios.post(
    `${server}/api/v1/user/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const profileApi = async () => {
  const res = await axios.get(`${server}/api/v1/user`, {
    withCredentials: true,
  });
  return res?.data;
};

export const updateUserApi = async (userData) => {
  const res = await axios.put(
    `${server}/api/v1/user`,
    {
      username: userData?.username,
    },
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const deleteUserApi = async () => {
  const res = await axios.delete(`${server}/api/v1/user`, {
    withCredentials: true,
  });
  return res?.data;
};

export const deleteHistoryApi = async (ids) => {
  const res = await axios.post(
    `${server}/api/v1/user/delete-content/${ids.contentId}?userId=${ids.userId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return res?.data;
};
