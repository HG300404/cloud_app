const Order = require("../models/OrderGame");
const User = require("../models/UserModel");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      totalPrice,
      user,
      isPaid,
      paidAt,
      orderDate,
    } = newOrder;
    console.log("newOrder", newOrder);
    try {
      const createOrder = await Order.create({
        orderItems,
        paymentMethod,
        totalPrice,
        user,
        isPaid,
        paidAt,
        orderDate,
      });
      if (createOrder) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findOne({ user: id });
      if (order === null) {
        resolve({
          status: "OK",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: order,
      });
    } catch (e) {
      console.log("e", e);
      reject(e);
    }
  });
};
const getAllOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();
      const userPromises = allOrder.map(async (order) => {
        if (order?.user) {
          const user = await User.findOne({ _id: order?.user });
          return {
            ...order.toObject(), // Convert Mongoose document to plain JavaScript object
            userName: user?.userName,
            phone: user?.phone,
            email: user?.email,
          };
        }
        return order;
      });

      const ordersWithUserDetails = await Promise.all(userPromises);

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: ordersWithUserDetails,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createOrder,
  getDetailsOrder,
  getAllOrder,
};
