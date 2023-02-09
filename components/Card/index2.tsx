import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../../index.css";
import { Card } from "antd";
import {
  LineChartOutlined,
  AreaChartOutlined,
  DotChartOutlined,
  StockOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};
interface CardxxProps {
  title: any;
  data: any;
}

const Cardx: React.FC<CardxxProps> = ({ title, data }) => {
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };
  return (
    <Card>
      <Card.Grid style={{ borderRadius: "5px", width: "20%" }}>
        <p>Số phòng có khách</p>{" "}
        <LineChartOutlined style={{ fontSize: "5vmin", textAlign: "center" }} />
      </Card.Grid>
      <Card.Grid style={{ borderRadius: "5px", width: "20%" }}>
        <p>Số phòng trống </p>{" "}
        <AreaChartOutlined style={{ fontSize: "5vmin", textAlign: "center" }} />
      </Card.Grid>
      <Card.Grid style={{ borderRadius: "5px", width: "20%" }}>
        <p>Số phòng khách trả</p>{" "}
        <DotChartOutlined style={{ fontSize: "5vmin", textAlign: "center" }} />
      </Card.Grid>
      <Card.Grid style={{ borderRadius: "5px", width: "20%" }}>
        <p>Số phòng đặt trước</p>
        <StockOutlined style={{ fontSize: "5vmin", textAlign: "center" }} />
      </Card.Grid>
      <Card.Grid style={{ borderRadius: "5px", width: "20%" }}>
        <p>Số phòng hư</p>{" "}
        <PieChartOutlined style={{ fontSize: "5vmin", textAlign: "center" }} />{" "}
      </Card.Grid>
    </Card>
  );
};
export default Cardx;
