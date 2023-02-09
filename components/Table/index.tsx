import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import { Table, Form, Space, Input, Divider, Modal } from "antd";
import { Button } from "antd";

import TableAction from "../../components/action/TableAction";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import { removeVietnameseTones } from "../../utils/string";
import { v4 as uuid4 } from "uuid";

const { Search } = Input;
interface TabblessProps {
  btn: string;
  Tablename: string;
  Navname: string;
  data: any;
  chooseData: (data: any, action: string) => void;
}
const Tables: React.FC<TabblessProps> = ({
  btn,
  Tablename,
  Navname,
  data,
  chooseData,
}) => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    total: 10,
    page: 1,
  });

  const loading = useAppSelector((state) => state.loading.loading);

  const [textSearch, setTextSearch] = useState("");

  const onSearch = (value) => setTextSearch(value);

  const searchFloor = data.filter((e: any) => {
    if (textSearch === "") {
      return true;
    }

    return (
      removeVietnameseTones(e.name)
        .toUpperCase()
        .search(textSearch.toUpperCase()) > -1
    );
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "idx",
      key: "idx",
      width: 70,
      render: (_, __, index) =>
        index + 1,
    },
    {
      title: "Tầng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      width: 155,
      render: (_, record) => (
        <TableAction
          record={record}
          data={data}
          onEdit={chooseData}
          isRead={true}
          isDeleted={true}
          onDelete={() => chooseData(record, "delete")}
        />
      ),
    },
  ];

  return (
    <>
      <Space direction="vertical">
        <p style={{ fontSize: "20px", fontWeight: "bold" }}> {Navname} </p>
        <Search
          style={{ width: 500 }}
          placeholder="Tìm kiếm"
          onSearch={onSearch}
          enterButton
        />
      </Space>
      <Divider />
      <Button
        type="primary"
        style={{ borderRadius: "5px", width: "100px" }}
        onClick={() => chooseData({}, "add")}
      >
        <span> {btn}</span>
      </Button>
      <Divider />
      <p style={{ fontSize: "15px", fontWeight: "bold" }}> {Tablename} </p>
      <Table
        bordered
        dataSource={searchFloor}
        loading={loading}
        columns={columns}
        rowKey={() => uuid4()}
        scroll={{ x: 575 }}
      />
      {/* <ModalComponentFloor
        openModal={isOpen}
        closeModal={() => setIsOpen(false)}
        data={floorName}
        title={name}
        submitModal={submitModal}
      /> */}
    </>
  );
};
export default Tables;
