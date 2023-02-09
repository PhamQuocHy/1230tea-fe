import {
  CheckCircleTwoTone,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Skeleton,
  Table,
  Modal,
  Typography,
  List,
} from "antd";
import React, { Fragment, useMemo, useState } from "react";
import NumberFormat from "react-number-format";
import { v4 as uuid } from "uuid";
import CustomEmpty from "../CustomEmpty";

const { Search } = Input;
const { Text } = Typography;

function ServiceBooking({ innerProps }) {
  const {
    isOpen,
    title,
    data,
    orderHandler,
    dataLoading,
    submitLoading,
    closedModal,
  } = innerProps;

  const [dataSource, setDataSource] = useState(() => {
    const initialState = data;
    return initialState;
  });

  const [textSearch, setTextSearch] = useState("");

  const onSearch = (e) => {
    const textSearch = e.target.value;
    setTextSearch(textSearch);
  };

  const onChangeCount = (type, data) => {
    let clonedData = [];
    if (type === "minus") {
      clonedData = dataSource.map((item) => {
        if (item.id === data.id && item.quantity > 1) {
          item.quantity -= 1;
        }
        return item;
      });
    } else {
      clonedData = dataSource.map((item) => {
        if (item.id === data.id) {
          item.quantity += 1;
        }
        return item;
      });
    }
    setDataSource(clonedData);
  };

  const onDelete = (data) => {
    let clonedData = [];
    clonedData = dataSource.map((item) => {
      if (item.id === data.id) {
        item.quantity = 1;
        item.selected = false;
      }
      return item;
    });
    setDataSource(clonedData);
  };

  const footer = (
    <Row justify="space-between" style={{ paddingTop: 5, paddingBottom: 5 }}>
      <Text strong style={{ fontSize: 16 }}>
        Tổng cộng:
      </Text>
      <Text strong style={{ fontSize: 16 }}>
        <NumberFormat
          value={dataSource
            .filter((item) => item.selected)
            .reduce((accumulator, currentValue) => {
              return (
                accumulator +
                parseInt(currentValue.quantity) * parseInt(currentValue.price)
              );
            }, 0)}
          displayType="text"
          thousandSeparator
          suffix=" VNĐ"
        />
      </Text>
    </Row>
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "right",
      render: (_, record) => (
        <NumberFormat
          value={record.quantity}
          thousandSeparator
          displayType="text"
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      align: "right",
      render: (_, record) => (
        <NumberFormat
          value={parseInt(record.price) * parseInt(record.quantity)}
          thousandSeparator
          displayType="text"
        />
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => onChangeCount("minus", record)}>
            -
          </Button>
          <Button
            type="primary"
            onClick={() => onChangeCount("plus", record)}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            +
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record)}
          />
        </>
      ),
    },
  ];

  const itemHanlder = (data) => {
    let clonedData = [];
    clonedData = dataSource.map((item) => {
      if (item.id === data.id) {
        item.quantity = 1;
        item.selected = !item.selected;
      }
      return item;
    });
    setDataSource(clonedData);
  };

  const filterData = useMemo(
    () =>
      dataSource.filter((e) => {
        if (!textSearch) return true;
        return e.name.toUpperCase().search(textSearch.toUpperCase()) > -1;
      }),
    [textSearch, dataSource]
  );

  const seletedData = dataSource.filter((item) => item.selected);

  function confirm() {
    Modal.confirm({
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Lưu hóa đơn vào bill phòng ?",
      okText: "Lưu",
      cancelText: "Hủy",
      onOk: () => orderHandler(seletedData),
    });
  }

  return (
    <Modal
      maskClosable={false}
      visible={isOpen}
      title={title}
      okText="Xác nhận"
      cancelText="Hủy"
      centered
      confirmLoading={submitLoading}
      onCancel={closedModal}
      onOk={() => confirm()}
      okButtonProps={{ disabled: seletedData.length === 0 }}
      width="90%"
    >
      <div
        style={{
          overflowY: "scroll",
          height: "calc(100vh - 250px)",
          paddingRight: 20,
        }}
      >
        <Row gutter={[24]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card
              title="Danh mục dịch vụ"
              headStyle={{
                backgroundColor: "#60707c",
                color: "#fff",
                paddingLeft: 15,
              }}
              bodyStyle={{ padding: 15 }}
            >
              <Search
                placeholder="Tìm theo tên"
                onChange={onSearch}
                allowClear
                value={textSearch}
              />
              {dataLoading ? (
                <Skeleton active />
              ) : filterData?.length > 0 ? (
                <Fragment>
                  <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text style={{ color: "#7c7c7c" }}>
                      <Text strong style={{ color: "#7c7c7c" }}>
                        {filterData.length}
                      </Text>{" "}
                      dịch vụ,{" "}
                      <Text strong style={{ color: "#7c7c7c" }}>
                        {seletedData.length}
                      </Text>{" "}
                      đang được chọn
                    </Text>
                  </div>

                  <List
                    dataSource={filterData}
                    renderItem={(item) => (
                      <List.Item onClick={() => itemHanlder(item)}>
                        <Row justify="space-between" style={{ width: "100%" }}>
                          <Col span={17}>
                            <Row>
                              <div style={{ paddingRight: 10 }}>
                                {item.selected ? (
                                  <CheckCircleTwoTone twoToneColor="#2ecc71" />
                                ) : (
                                  <CheckCircleTwoTone twoToneColor="#fff" />
                                )}
                              </div>
                              <Text strong>{item.name}</Text>
                            </Row>
                          </Col>
                          <Col span={6} align="right">
                            <b>
                              <NumberFormat
                                value={item.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" VNĐ"}
                                style={{ color: "purple" }}
                              />
                            </b>
                          </Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Fragment>
              ) : (
                <CustomEmpty title="Không có dịch vụ" />
              )}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Card
              title="Đang đặt hàng"
              headStyle={{
                backgroundColor: "#60707c",
                color: "#fff",
                paddingLeft: 15,
              }}
              bodyStyle={{ padding: 0 }}
            >
              <Table
                rowKey={() => uuid()}
                columns={columns}
                dataSource={seletedData}
                footer={() => footer}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default ServiceBooking;
