import { Layout, Typography, Descriptions, Row, Col } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  YoutubeFilled,
} from "@ant-design/icons";
const { Text } = Typography;

const Footer = ({ collapsed }) => {
  return (
    <Layout.Footer
      style={{
        bottom: 0,
        zIndex: 3,

        padding: 20,
        backgroundColor: "#ffffff",
        width: "100%",
        borderRadius: 4,
        fontSize: 12,
        color: "#494949",
      }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Descriptions title="LIÊN HỆ" column={2}>
            <Descriptions.Item>
              <MailOutlined
                style={{
                  marginRight: 7,
                  fontSize: 17,
                  color: "#1890FF",
                }}
              />
              <Text>info@mhotel9.asia</Text>
            </Descriptions.Item>
            <Descriptions.Item>
              <PhoneOutlined
                style={{
                  marginRight: 7,
                  fontSize: 17,
                  color: "#1890FF",
                }}
              />
              <Text>0896 169 069</Text>
            </Descriptions.Item>
            <Descriptions.Item>
              <EnvironmentOutlined
                style={{
                  marginRight: 7,
                  fontSize: 17,
                  color: "#1890FF",
                }}
              />
              <Text>
                {" "}
                Block 1 - Tầng Trệt Tòa Nhà Thanh Niên, 41 Cách Mạng Tháng 8, An
                Hòa, Ninh Kiều, Cần Thơ.
              </Text>
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={2}></Col>

        <Col span={10}>
          <Descriptions title="SOCIAL MEDIA" column={1}>
            <Descriptions.Item>
              <FacebookFilled
                style={{
                  marginRight: 7,
                  fontSize: 17,
                  color: "#1890FF",
                }}
              />
              <a
                style={{ color: "rgba(0, 0, 0, 0.85)" }}
                rel="noopener noreferrer"
                href="https://www.facebook.com/alphapms.asia"
                target="_blank"
              >
                MHotel9
              </a>
            </Descriptions.Item>
            <Descriptions.Item>
              <YoutubeFilled
                style={{
                  marginRight: 7,
                  fontSize: 17,
                  color: "#FF0100",
                }}
              />
              <a
                style={{ color: "rgba(0, 0, 0, 0.85)" }}
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCKu_LTZfxhVCy9nd_m83WgA"
                target="_blank"
              >
                MHotel9
              </a>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <div style={{ textAlign: "center", marginTop: 15 }}>
        <Text>Copyright © 2021. Powered by MHotel9</Text>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
