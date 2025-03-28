import { message } from "antd";
import React, { useEffect, useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperStyleHeader,
  WrapperValue,
} from "./style";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const location = useLocation();
  const { state } = location;
  console.log("location", location);

  return (
    <div style={{ with: "100%", height: "100vh" }}>
      <div
        style={{
          height: "100%",
          width: "1270px",
          margin: "0 auto",
        }}
      >
        <h3>Order success</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>
                <WrapperValue>
                  <span>{orderContant.payment[state?.paymentMethod]}</span>
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperStyleHeader
              style={{
                background: "#483D8B",
                fontSize: "30px",
                color: "#FFF",
                fontFamily: "Helvetica",
              }}
            >
              <span style={{ display: "inline-block", width: "390px" }}>
                <span
                  style={{
                    color: "#FFFF00",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Have ({state?.orderItems.length} games)
                </span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: "#FFFF00",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Price
                </span>
                <span
                  style={{
                    color: "#FFFF00",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Discount
                </span>
                <span
                  style={{
                    color: "#FFFF00",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Total Price
                </span>
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {state?.orderItems.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <img
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                        alt="game"
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontSize: "18px",
                          color: "#4B0082",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "18px", color: "#4B0082" }}>
                          {order?.price}
                        </span>
                      </span>

                      <span>
                        <span style={{ fontSize: "18px", color: "#4B0082" }}>
                          {order?.discount} %
                        </span>
                      </span>

                      <span>
                        <span style={{ fontSize: "18px", color: "#4B0082" }}>
                          {order?.totalPrice}
                        </span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
            <WrapperStyleHeader
              style={{
                background: "#483D8B",
                fontSize: "30px",
                color: "#FFF",
                fontFamily: "Helvetica",
              }}
            >
              <span style={{ display: "inline-block", width: "390px" }}>
                <span
                  style={{
                    color: "#FFFF00",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Total Price: {state?.totalPrice}
                </span>
              </span>
            </WrapperStyleHeader>
          </WrapperLeft>
        </div>
      </div>
    </div>
  );
};
export default OrderSuccess;
