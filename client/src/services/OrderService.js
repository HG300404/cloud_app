import axios from "axios";
import { axiosJWT } from "./UserService";

export const createOrder = async (access_token, data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getOrderbyUserId = async (id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/get-order-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/getAllOrder`,
    {
      // gui/luu access_token vao headers
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
