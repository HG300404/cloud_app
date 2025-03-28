import { Button, Checkbox, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
  WrapperInputNumber,
} from "./style";
import { DeleteOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllOrderGame,
  removeOrderGame,
  selectedOrder,
} from "../../redux/slides/orderSlide.js";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as UserService from "../../services/UserService.js";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [stateUserDetails, setStateUserDetails] = useState({
    userName: "",
    email: "",
    phone: "",
  });

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const mutationUpdate = useMutationHooks(async (data) => {
    const { id, token, ...rests } = data;
    const res = await UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;
  console.log("data", data);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleDeleteOrder = (idGame) => {
    dispatch(removeOrderGame({ idGame }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.game);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderGame({ listChecked }));
    }
  };

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

  const handleAddCard = () => {
    if (!order.orderItemsSelected?.length) {
      message.error("Choose games you need buy");
    } else if (!user?.phone || !user?.userName || !user?.email) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

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

  return (
    <div style={{ with: "100%", height: "100vh" }}>
      <div
        style={{
          height: "100%",
          width: "1270px",
          margin: "0 auto",
        }}
      >
        <h3>Cart</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader
              style={{
                background: "#483D8B",
                fontSize: "30px",
                color: "#FFF",
                fontFamily: "Helvetica",
              }}
            >
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></Checkbox>
                <span
                  style={{
                    color: "#FFFF00",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Have ({order?.orderItems?.length} games)
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
                <DeleteOutlined
                  style={{
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#FFFF00",
                  }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
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
                      <Checkbox
                        onChange={onChange}
                        value={order?.game}
                        checked={listChecked.includes(order?.game)}
                      ></Checkbox>
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
                      <DeleteOutlined
                        style={{ cursor: "pointer", fontSize: "15px" }}
                        onClick={() => handleDeleteOrder(order?.game)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>

          <WrapperRight>
            <h1 style={{ color: "#FFF", fontSize: "30px" }}>Cart Summary</h1>

            <div style={{ width: "100%" }}>
              <WrapperInfo style={{ background: "#808080" }}>
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
              <WrapperTotal style={{ background: "#808080" }}>
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
              onClick={() => handleAddCard()}
              size={60}
              styleButton={{
                backgroundColor: "#ff0000",
                borderRadius: "5px",
                marginTop: "20px",
              }}
              textButton={"PROCEED TO CHECKOUT"}
              styleTextButton={{ color: "#fff", fontWeight: "bold" }}
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
export default OrderPage;
