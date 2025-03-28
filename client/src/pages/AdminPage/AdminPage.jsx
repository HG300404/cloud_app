import React, { useEffect, useState } from "react";
import { getItem } from "../../utils";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminGame from "../../components/AdminGame/AdminGame";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminOrder from "../../components/AdminOrder/AdminOrder";

const AdminPage = () => {
  const items = [
    getItem("User", "users", <UserOutlined />),
    getItem("Game", "games", <AppstoreOutlined />),
    getItem("Order", "orders", <FileTextOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "users":
        return <AdminUser />;
      case "games":
        return <AdminGame />;
        case "orders":
        return <AdminOrder />;
      default:
        return <></>;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  console.log("keySelected", keySelected);

  return (
    <>
      <HeaderComponent isHiddenCart isHiddenSearch isZoom />

      <div style={{ display: "flex", overflowX: "hidden" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: "20px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};
export default AdminPage;
