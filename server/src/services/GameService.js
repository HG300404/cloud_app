const Game = require("../models/GameModel");

const createGame = (newGame) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      price,
      platform,
      rating,
      description,
      discount,
      selled,
      releasedDate,
    } = newGame;
    try {
      const checkGame = await Game.findOne({
        name: name,
      });
      if (checkGame != null) {
        resolve({
          status: "OK",
          message: "The name of game is ready",
        });
      }

      const createGame = await Game.create({
        name,
        image,
        type,
        price,
        platform,
        rating,
        description,
        discount,
        selled,
        releasedDate,
      });
      if (createGame) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createGame,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateGame = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkGame = await Game.findOne({ _id: id });
      if (checkGame === null) {
        resolve({
          status: "ERR",
          message: "The game is not defined",
        });
      }
      console.log("dataOld", data);
      const updatedGame = await Game.findByIdAndUpdate(id, data, {
        new: true,
      });
      console.log("updatedGame", updatedGame);
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedGame,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteGame = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkGame = await Game.findOne({ _id: id });
      if (checkGame === null) {
        resolve({
          status: "ERR",
          message: "The game is not defined",
        });
      }
      await Game.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete game success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("ids", "ids");
      await Game.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete many game success",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllGame = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalGame = await Game.countDocuments();

      if (filter) {
        const label = filter[0];
        const allGameFilter = await Game.find({
          [label]: { $regex: filter[1], $options: "i" },
        })
          .limit(limit)
          .skip(page * limit);

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allGameFilter,
          total: totalGame,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalGame / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];

        const allGameSort = await Game.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: allGameSort,
          total: totalGame,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalGame / limit),
        });
      }
      const allGame = await Game.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ name: 1 });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allGame,
        total: totalGame,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalGame / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Game.distinct("type");
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailsGame = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const game = await Game.findOne({ _id: id });
      if (game === null) {
        resolve({
          status: "OK",
          message: "The game is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: game,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createGame,
  updateGame,
  deleteGame,
  deleteManyProduct,
  getAllGame,
  getAllType,
  getDetailsGame,
};
