import { Col, Layout, Row, Table } from "antd";
import moment from "moment";
import "moment/locale/vi";
import React from "react";
import NumberFormat from "react-number-format";
import { v4 as uuid4 } from "uuid";
import { STATIC_HOST } from "../../constants";
import "./style.css";

const columnsService = [
  {
    title: "Tên",
    dataIndex: "type_of_banquet",
    key: "type_of_banquet",
    render: (_, record) => (
      <p>
        <b>{record.menu_item?.name}</b>
      </p>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    align: "right",
    render: (_, record) => {
      return moment(record?.created_at, "DD-MM-YYYY").format("DD/MM/YYYY");
    },
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "unit_price",
    key: "unit_price",
    align: "right",
    render: (_, record) => (
      <NumberFormat
        value={record?.unit_price || 0}
        displayType={"text"}
        thousandSeparator={true}
      />
    ),
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    align: "right",
  },

  {
    title: "Thành tiền (VNĐ)",
    dataIndex: "total",
    key: "total",
    align: "right",
    render: (_, record) => (
      <b>
        <NumberFormat
          value={record?.unit_price * record?.quantity || 0}
          displayType={"text"}
          thousandSeparator={true}
        />
      </b>
    ),
  },
];

const roomService = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (_, record) => {
      return record.name;
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    align: "right",
    render: (_, record) => {
      return moment(record?.pivot?.created_at).format("DD/MM/YYYY");
    },
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "unit_price",
    key: "unit_price",
    align: "right",
    render: (_, record) => (
      <NumberFormat
        value={record?.pivot?.price || 0}
        displayType={"text"}
        thousandSeparator={true}
      />
    ),
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    align: "right",
    render: (_, record) => {
      return record?.pivot?.quantity;
    },
  },

  {
    title: "Thành tiền (VNĐ)",
    dataIndex: "total",
    key: "total",
    align: "right",
    render: (_, record) => (
      <b>
        <NumberFormat
          value={record?.pivot?.total || 0}
          displayType={"text"}
          thousandSeparator={true}
        />
      </b>
    ),
  },
];
const tourColumn = [
  {
    title: "Tên tour",
    dataIndex: "tourName",
    key: "tourName",
    render: (_, record) => <p>{record?.name}</p>,
  },
  {
    title: "Người đặt",
    dataIndex: "customer",
    key: "customer",
    render: (_, record) => <p>{record.customer?.name}</p>,
  },
  {
    title: "SĐT",
    dataIndex: "customerPhone",
    key: "customerPhone",
    render: (_, record) => <p>{record.customer?.phone}</p>,
  },
  {
    title: "Giờ khởi hành",
    dataIndex: "departureTime",
    key: "departureTime",
    align: "right",
    render: (_, record) => <p>{record?.time}</p>,
  },
  {
    title: "Số người",
    dataIndex: "customerNumber",
    key: "customerNumber",
    align: "right",
    render: (_, record) => <p>{record?.total_customer}</p>,
  },
  {
    title: "Nhân viên đặt",
    dataIndex: "customer",
    key: "customer",
    render: (_, record) => <p>{record?.employee.name}</p>,
  },
  {
    title: "Giá tour (VNĐ)",
    dataIndex: "totalMoney",
    key: "totalMoney",
    render: (_, record) => (
      <NumberFormat
        value={record?.total || 0}
        displayType={"text"}
        thousandSeparator={true}
      />
    ),
  },
];

class HotelInvoice extends React.PureComponent {
  render() {
    const {
      order,
      customer,
      company,
      orderRoomData,
      invoice,
      numberOfDaysIn,
      getProvisionalAmount,
      finalCost = 0,
      additionMoney = 0,
      discount = 0,
      user,
      roomServices,
      deposit,
      getRemainingAmountToBePaid,
    } = this.props;

    const columnsRoom = [
      {
        title: "Số phòng",
        dataIndex: "name",
        key: "name",
        render: (_, record) => (
          <strong>
            {record?.orderroom_room?.name || "(Đổi phòng) " + record?.name}
          </strong>
        ),
      },
      {
        title: "Ngày nhận phòng",
        dataIndex: "check_in",
        key: "check_in",
        align: "right",
      },
      {
        title: "Ngày trả phòng",
        dataIndex: "check_out",
        key: "check_out",
        editable: true,
        align: "right",
      },
      {
        title: "Số ngày",
        dataIndex: "day_num",
        key: "day_num",
        align: "right",
        render: (text, record) => numberOfDaysIn(),
      },
      {
        title: "Đơn giá (VNĐ)",
        dataIndex: "room_price",
        key: "room_price",
        align: "right",
        render: (_, record) =>
          record && (
            <NumberFormat
              value={record?.room_price || 0}
              displayType={"text"}
              thousandSeparator={true}
            />
          ),
      },
      {
        title: "Thành tiền (VNĐ)",
        dataIndex: "total",
        key: "total",
        align: "right",
        render: (_, record) =>
          record && (
            <b>
              <NumberFormat
                value={numberOfDaysIn() * record?.room_price || 0}
                displayType={"text"}
                thousandSeparator={true}
              />
            </b>
          ),
      },
    ];

    const date = moment().format("LL").toString();

    return (
      <Layout
        ref={(el) => (this.componentRef = el)}
        style={{
          background: "#ffffff",
        }}
        className="invoice"
      >
        <Row gutter={24}>
          <Col span={5}>
            <span className="logo" style={{ color: "black", float: "left" }}>
              <img
                style={{
                  width: 110,
                  height: 55,
                }}
                src={`${STATIC_HOST}logo.png`}
                alt="logo"
              />
            </span>
          </Col>
          <Col span={19}>
            <b style={{ marginBottom: 0, fontSize: 13 }}>
              CTY CP NHKS ANH ĐÀO MEKONG
            </b>
            <p style={{ marginBottom: 0, fontSize: 12 }}>ANH ĐÀO MEKONG 2</p>
            <b style={{ marginBotom: 0, fontSize: 11 }}>
              08 Xuân Thuỷ, KDC Hồng Phát, đường Nguyễn Văn Cừ, P.An Bình,
              Q.Ninh Kiều, TPCT
            </b>
          </Col>
        </Row>
        <Row gutter={24} style={{ textAlign: "center", marginTop: 10 }}>
          <Col span={24}>
            <b style={{ fontSize: 18 }}>HÓA ĐƠN THANH TOÁN</b>
            <p style={{ fontSize: 12 }}>Ngày: {date}</p>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <p style={{ fontSize: 12, marginBottom: 0 }}>
              Mã hoá đơn: <b>{invoice?.code}</b>
            </p>
            <p style={{ fontSize: 12, marginBottom: 0 }}>
              Khách hàng: <b>{customer?.name}</b>
            </p>
            {company && (
              <p style={{ fontSize: 12, marginBottom: 0 }}>
                Công ty: <b>{company}</b>
              </p>
            )}
            <p style={{ fontSize: 12, marginBottom: 0 }}>
              Thu ngân: <b>{user?.name}</b>
            </p>
          </Col>
        </Row>

        {orderRoomData && orderRoomData.length > 0 && (
          <div>
            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>Tiền phòng:</b>
            </p>
            <Table
              className="mb-16"
              pagination={false}
              columns={columnsRoom}
              dataSource={orderRoomData}
              bordered
              rowKey={() => uuid4()}
              size="small"
            />
          </div>
        )}

        {roomServices && roomServices.length > 0 && (
          <div>
            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>Dịch vụ phòng:</b>
            </p>
            <Table
              className="mb-16"
              pagination={false}
              columns={roomService}
              dataSource={roomServices}
              bordered
              rowKey={() => uuid4()}
              size="small"
            />
          </div>
        )}

        {order && (
          <>
            {order.bars && order.bars.length > 0 && (
              <div>
                <p style={{ fontSize: 12, marginBottom: 5 }}>
                  <b>Dịch vụ bar:</b>
                </p>
                <Table
                  className="mb-16"
                  pagination={false}
                  columns={columnsService}
                  dataSource={order.bar_item}
                  bordered
                  rowKey={() => uuid4()}
                  size="small"
                />
              </div>
            )}
            {order.restaurants && order.restaurants.length > 0 && (
              <div>
                <p style={{ fontSize: 12, marginBottom: 5 }}>
                  <b>Dịch vụ nhà hàng:</b>
                </p>
                <Table
                  className="mb-16"
                  pagination={false}
                  columns={columnsService}
                  dataSource={order.restaurant_item}
                  bordered
                  rowKey={() => uuid4()}
                  size="small"
                />
              </div>
            )}
            {order.massages && order.massages.length > 0 && (
              <div>
                <p style={{ fontSize: 12, marginBottom: 5 }}>
                  <b>Dịch vụ massage:</b>
                </p>
                <Table
                  className="mb-16"
                  pagination={false}
                  columns={columnsService}
                  dataSource={order.massage_item}
                  bordered
                  rowKey={() => uuid4()}
                  size="small"
                />
              </div>
            )}
            {order.tours && order.tours.length > 0 && (
              <div>
                <p style={{ fontSize: 12, marginBottom: 5 }}>
                  <b>Dịch vụ tour:</b>
                </p>
                <Table
                  className="mb-16"
                  pagination={false}
                  columns={tourColumn}
                  dataSource={order.tours}
                  bordered
                  rowKey={() => uuid4()}
                  size="small"
                />
              </div>
            )}
          </>
        )}

        <Row span={24}>
          <Col span={8}>
            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>
                Tạm tính:{" "}
                <NumberFormat
                  value={getProvisionalAmount() || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VNĐ"}
                />
              </b>
            </p>
            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>
                Phụ thu:{" "}
                <NumberFormat
                  value={additionMoney || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VNĐ"}
                />
              </b>
            </p>
            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>
                Giảm giá:{" "}
                <NumberFormat
                  value={discount || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VNĐ"}
                />
              </b>
            </p>
          </Col>
          <Col span={8}>
            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>
                Đã trả:{" "}
                <NumberFormat
                  value={deposit || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VNĐ"}
                />
              </b>
            </p>

            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>
                Còn lại:{" "}
                <NumberFormat
                  value={getRemainingAmountToBePaid() || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VNĐ"}
                />
              </b>
            </p>

            <p style={{ fontSize: 12, marginBottom: 5 }}>
              <b>
                Tiền khách đưa:{" "}
                <NumberFormat
                  value={finalCost || 0}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VNĐ"}
                />
              </b>
            </p>
          </Col>
        </Row>

        <p style={{ fontSize: 12, marginBottom: 5 }}>
          <b>
            Tiền thừa:{" "}
            <NumberFormat
              value={
                (finalCost - getRemainingAmountToBePaid() >= 0
                  ? finalCost - getRemainingAmountToBePaid()
                  : 0) || 0
              }
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VNĐ"}
            />
          </b>
        </p>

        <Row span={24} style={{ marginBottom: 30 }}>
          <Col span={8}>
            <p style={{ fontSize: 13 }}>
              <b>Nhân viên</b>
            </p>
          </Col>
          <Col span={8}>
            <p style={{ fontSize: 13 }}>
              <b>Khách hàng</b>
            </p>
          </Col>
        </Row>
        <p style={{ fontSize: 12 }}>Cảm ơn quý khách</p>
      </Layout>
    );
  }
}
export default HotelInvoice;
