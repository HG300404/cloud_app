const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      console.log("err", err);

      return res.status(404).json({
        message: "The authentication2",
        status: "ERROR",
      });
    }

    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication3",
        status: "ERROR",
      });
    }
  });
};
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authentication1",
        status: "ERROR",
      });
    }

    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authentication5",
        status: "ERROR",
      });
    }
  });
};
module.exports = {
  authMiddleware,
  authUserMiddleware,
};
