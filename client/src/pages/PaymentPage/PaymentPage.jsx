import { Form, message, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as UserService from "../../services/UserService.js";
import * as OrderService from "../../services/OrderService.js";
import * as PaymentService from "../../services/PaymentService";
import { updateUser } from "../../redux/slides/userSlide";
import { Navigate, useNavigate } from "react-router-dom";
import { removeAllOrderGame } from "../../redux/slides/orderSlide";
// import { PayPalButton } from "react-paypal-button-v2";
const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const navigate = useNavigate();
  const [payment, setPayment] = useState("paypal");
  const [stateUserDetails, setStateUserDetails] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  const mutationUpdate = useMutationHooks(async (data) => {
    const { id, token, ...rests } = data;
    const res = await UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;

  const mutationOrder = useMutationHooks(async (data) => {
    const { token, ...rests } = data;
    const res = await OrderService.createOrder(token, { ...rests });
    return res;
  });

  const { isSuccess, isError, data: dataOrder } = mutationOrder;

  useEffect(() => {
    if (isSuccess && dataOrder?.status === "OK") {
      const arrOrdered = [];
      order?.orderItemsSelected?.forEach((element) => {
        arrOrdered.push(element.game);
      });
      dispatch(removeAllOrderGame({ listChecked: arrOrdered }));
      message.success("Order success");
      navigate("/orderSuccess", {
        state: {
          orderItems: order?.orderItemsSelected,
          paymentMethod: payment,
          totalPrice: total,
        },
      });
    } else if (isError) {
      message.error("Error");
    }
  }, [isSuccess, isError]);

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const price = () => {
    var result = 0;

    order?.orderItemsSelected?.map((item) => {
      result = result + Number(item?.price);
      return null;
    });

    return result;
  };

  const totalPrice = () => {
    var result = 0;

    order?.orderItemsSelected?.map((item) => {
      result = result + Number(item?.totalPrice);
      return null;
    });

    return result;
  };

  const saving = () => {
    var result = price() - totalPrice();
    return result.toFixed(2);
  };

  const total = totalPrice();

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.email &&
      user?.phone &&
      user?.userName &&
      user?.id
    ) {
      mutationOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        paymentMethod: payment,
        totalPrice: total,
        // isPaid: order?.isPaid,
        user: user?.id,
        orderDate: order?.orderDate,
      });
    }
  };

  console.log("order", order, user);
  const handleCancelUpdate = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateInforUser = () => {
    const userName = stateUserDetails.userName;
    const phone = stateUserDetails.phone;
    const email = stateUserDetails.email;
    if (userName && phone && email) {
      mutationUpdate.mutate(
        {
          id: user?.id,
          token: user?.access_token,
          ...stateUserDetails,
        },
        {
          onSuccess: () => {
            dispatch(
              updateUser({ ...stateUserDetails, access_token: user?.id })
            );
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPaypal = (details, data) => {
    mutationOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItemsSelected,
      paymentMethod: payment,
      totalPrice: total,
      // isPaid: order?.isPaid,
      user: user?.id,
      orderDate: order?.orderDate,
      isPaid: true,
      paidAt: details.update_time,
    });
    // console.log('details, data',details, data)
  };
  return (
    <div style={{ with: "100%", height: "100vh" }}>
      <div
        style={{
          height: "100%",
          width: "1270px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="paypal"> Paypal</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>

          <WrapperRight>
            <h1 style={{ color: "#FFF" }}>Cart Summary</h1>

            <div style={{ width: "100%" }}>
              <WrapperInfo
                style={{ background: "#696969", padding: "10px 20px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>Full Price</span>
                  <span
                    style={{
                      color: "#D3D3D3",
                      textDecoration: "line-through",
                      lineHeight: "40px",
                      fontSize: "20px",
                    }}
                  >
                    ${price()}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "20px" }}>Your Saving</span>
                  <span
                    style={{
                      color: "#00FF00",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    ${saving()}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal style={{ background: "#696969" }}>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Total
                </span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "#FFD700",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ${totalPrice()}
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddOrder()}
              size={40}
              styleButton={{
                backgroundColor: "#ff0000",
                padding: "10px 20px",
                borderRadius: "5px",
                marginTop: "20px",
              }}
              textButton={"Order"}
              styleTextButton={{ color: "#fff" }}
            ></ButtonComponent>

          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Update information to buy game"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          // onFinish={onUpdateUser}
          // autoComplete="on"
          form={form}
        >
          <Form.Item
            label="UserName"
            name="userName"
            rules={[{ required: true, message: "Please input userName!" }]}
          >
            <InputComponent
              value={stateUserDetails.userName}
              onChange={handleOnchangeDetails}
              name="userName"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <InputComponent
              value={stateUserDetails.email}
              onChange={handleOnchangeDetails}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please input phone!" }]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnchangeDetails}
              name="phone"
            />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};
export default PaymentPage;
