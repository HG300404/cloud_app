import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, message } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/userMutationHook";
import * as OrderService from "../../services/OrderService.js";
import * as UserService from "../../services/UserService.js";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";

const AdminUser = () => {
  const user = useSelector((state) => state?.user);

  const getAllOrders = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    console.log("res", res);
    return res;
  };

  const queryOrders = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const { data: orders } = queryOrders;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />

        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "UserName",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Paided",
      dataIndex: "paided",
      sorter: (a, b) => a.paided - b.paided,
      ...getColumnSearchProps("paided"),
    },
    {
      title: "Total price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      ...getColumnSearchProps("price"),
    },
  ];

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        paided: order.isPaid ? "TRUE" : "FALSE",
        price: order?.totalPrice,
        userName: order.userName,
        phone: order.phone,
        email: order.email,
        key: order._id,
      };
    });

  return (
    <div style={{ marginTop: "10px" }}>
      <WrapperHeader>Manager Users</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent columns={columns} data={dataTable} />
      </div>
    </div>
  );
};

export default AdminUser;
