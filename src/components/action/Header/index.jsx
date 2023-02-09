import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { STATIC_HOST } from "../../constants/common";
// import "./style.scss";

const { SubMenu } = Menu;

const Header = ({ handleLogout }) => {
  const menu = (
    <Menu onClick={handleLogout}>
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header
      style={{
        backgroundColor: "#ffffff",
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Link to="/" style={{ color: "#ffffff", float: "left" }}>
        <img
          alt="Logo công ty"
          src={`${STATIC_HOST}logo.png`}
          style={{
            width: 140,
            height: 40,
          }}
        />
      </Link>
      <Menu style={{ float: "right" }} theme="light" mode="horizontal">
        <SubMenu
          key="sub2"
          icon={<UserOutlined />}
          title="Cá nhân"
          className="header__submenu"
        >
          {menu}
        </SubMenu>
      </Menu>
    </Layout.Header>
  );
};

export default Header;
