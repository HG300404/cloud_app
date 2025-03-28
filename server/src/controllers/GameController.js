const GameService = require("../services/GameService");
const createGame = async (req, res) => {
  try {
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
    } = req.body;

    if (
      !name ||
      // !image ||
      !type ||
      !price ||
      !platform ||
      !description
      //   !releasedDate
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required1",
      });
    }

    const response = await GameService.createGame(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const data = req.body;
    if (!gameId) {
      return res.status(200).json({
        status: "ERR",
        message: "The gameId is required",
      });
    }
    const response = await GameService.updateGame(gameId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    if (!gameId) {
      return res.status(200).json({
        status: "ERR",
        message: "The gameId is required",
      });
    }
    const response = await GameService.deleteGame(gameId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const getAllGame = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await GameService.getAllGame(

      Number(limit),

      Number(page) || 0,
      sort,
      filter
    );

    return res.status(200).json(response);
  } catch (e) {
    console.log("loi", e);
    return res.status(404).json({ message: e });
  }
};
const getDetailsGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    if (!gameId) {
      return res.status(200).json({
        status: "ERR",
        message: "The gameId is required",
      });
    }
    const response = await GameService.getDetailsGame(gameId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const deleteManyProduct = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await GameService.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};
const getAllType = async (req, res) => {
  try {
    const response = await GameService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = {
  createGame,
  updateGame,
  deleteGame,
  getAllGame,
  getAllType,
  getDetailsGame,
  deleteManyProduct,
};
