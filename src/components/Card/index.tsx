import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

interface CardxProps {
  title: any;
}

const Cardx: React.FC<CardxProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Card title={title} style={{ marginTop: 20 }}>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card
              bordered={false}
              onClick={() => {
                navigate("/manager_restaurent");
              }}
              style={{ backgroundColor: "#d1bebc", borderRadius: "14px" }}
            >
              <p>Dịch vụ nhà hàng</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              onClick={() => {
                navigate("/manager_massage");
              }}
              bordered={false}
              style={{ backgroundColor: "#7fb6f3", borderRadius: "14px" }}
            >
              <p>Dịch vụ Massage</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              onClick={() => {
                navigate("/manager_tour");
              }}
              bordered={false}
              style={{ backgroundColor: "#d5f1b6", borderRadius: "14px" }}
            >
              <p>Dịch vụ Tour</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              onClick={() => {
                navigate("/manager_pool");
              }}
              bordered={false}
              style={{ backgroundColor: "#d9c0cd", borderRadius: "14px" }}
            >
              <p>Dịch vụ Hồ Bơi</p>
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  );
};
export default Cardx;
