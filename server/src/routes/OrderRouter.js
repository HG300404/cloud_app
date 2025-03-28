const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const {
  authUserMiddleware,
  authMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", orderController.createOrder);
router.get("/get-order-details/:id", orderController.getDetailsOrder);
router.get("/getAllOrder", orderController.getAllOrder);

module.exports = router;
