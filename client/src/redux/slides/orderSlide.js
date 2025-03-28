import { createSlice } from "@reduxjs/toolkit";
import { addOrderRedux } from "../../utils";

const initialState = {
  orderItems: [],
  paymentMethod: "",
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  orderDate: "",
  orderItemsSelected: [],
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderGame: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.game === orderItem.game
      );
      if (!itemOrder) {
        state.orderItems.push(orderItem);
      }
    },
    removeOrderGame: (state, action) => {
      const { idGame } = action.payload;

      const itemOrder = state?.orderItems?.filter(
        (item) => item?.game !== idGame
      );
      const orderItemsSelected = state?.orderItemsSelected?.filter(
        (item) => item?.game !== idGame
      );
      state.orderItems = itemOrder;
      state.orderItemsSelected = orderItemsSelected;
    },
    removeAllOrderGame: (state, action) => {
      const { listChecked } = action.payload;

      const itemOrders = state?.orderItems?.filter(
        (item) => !listChecked.includes(item.game)
      );
      const orderItemsSelected = state?.orderItemsSelected?.filter(
        (item) => !listChecked.includes(item.game)
      );
      state.orderItems = itemOrders;
      state.orderItemsSelected = orderItemsSelected;
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order?.game)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSelected = orderSelected;
      console.log("selected", state, action);
    },
  },
});

export const {
  addOrderGame,
  removeOrderGame,
  removeAllOrderGame,
  selectedOrder,
} = orderSlide.actions;

export const orderReducer = orderSlide.reducer;
