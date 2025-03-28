import axios from "axios";
import { axiosJWT } from "./UserService";
export const getAllGame = async (searchGame) => {
  let res = {};

  if (searchGame) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/game/get-all?filter=name&filter=${searchGame}`
    );
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/game/get-all`);
  }

  return res.data;
};
export const getAllTypeGame = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/game/get-all-type`
  );
  return res.data;
};

export const createGame = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/game/create`,
    data
  );
  return res.data;
};
export const getDetailsGame = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/game/details/${id}`
  );
  return res.data;
};
export const updateGame = async (id, access_token, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/game/update/${id}`,
    data,
    {
      // gui/luu access_token vao headers
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const deleteGame = async (id, access_token) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/game/delete/${id}`,
    {
      // gui/luu access_token vao headers
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const deleteManyGame = async (data, access_token) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/game/delete-many`,
    data,
    {
      // gui/luu access_token vao headers
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
