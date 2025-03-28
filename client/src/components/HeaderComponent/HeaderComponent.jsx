import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Popover } from "antd";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import logo from "../../assets/images/logo.png";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService.js";
import { resetUser } from "../../redux/slides/userSlide.js";
import Loading from "../LoadingComponent/Loading";
import { searchGame } from "../../redux/slides/gameSlide";

// const sizeLi = {
//   size: "larger",
// };
// const styleButtonLi = {
//   background: "hsla(240, 63%, 13%, 1)",
//   marginRight: "20px",
//   marginTop: "5px",
// };
// const styleTextLi = {
//   color: "red",
// };

const HeaderComponent = ({
  isHiddenSearch = false,
  isHiddenCart = false,
  isZoom = true,
}) => {
  const styleLi = {
    background: "hsla(240, 63%, 13%, 1)",
    marginRight: "20px",
    marginTop: "5px",
    size: "larger",
    color: "#fff",
    listStyleType: "none",
    fontWeight: "bold",
  };

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");

  const order = useSelector((state) => state.order);
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.userName);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.userName, user?.avatar]);
  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Infor user
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Manager System
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => navigate("/myOrder")}>
        My Order
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>Logout</WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchGame(e.target.value));
  };
  return (
    <div
      style={{
        width: "100%",
        background: "hsla(240, 63%, 13%, 1)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={3} onClick={() => navigate("/")}>
          <img
            src={logo}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          ></img>
        </Col>
        {!isHiddenSearch && (
          <Col span={10} style={{ marginLeft: "320px" }}>
            <ButtonInputSearch
              size="large"
              textButton="Search"
              placeholder="Input search text"
              onChange={onSearch}
            />
          </Col>
        )}

        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "7px",
                    marginLeft: "10px",
                    transform: isZoom ? "scale(1.8)" : "none",
                  }}
                  alt="avatar"
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div
                      style={{
                        cursor: "pointer",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Login/Register
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>

          {!isHiddenCart && (
            <div
              onClick={() => navigate(`/order/${user?.id}`)}
              style={{ cursor: "pointer" }}
            >
              <Badge count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
