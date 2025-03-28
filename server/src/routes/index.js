const UserRouter = require("./UserRouter");
const GameRouter = require("./GameRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require('./PaymentRouter')
const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/game", GameRouter);
  app.use("/api/order", OrderRouter);
  app.use('/api/payment', PaymentRouter)
};
module.exports = routes;