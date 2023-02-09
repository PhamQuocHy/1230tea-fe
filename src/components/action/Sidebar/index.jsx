import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import menus from "./../../constants/menu";
import { QuestionCircleOutlined } from "@ant-design/icons";
// import "./style.scss";

const Sidebar = (props) => {
  const {
    permissions,
    collapsed,
    menuKey,
    menuKeyPath,
    onClick,
    onMenuItemClick,
    onCollapse,
    onMenuOpen,
  } = props;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const onClickUrl = (url) => {
    return () => openInNewTab(url);
  };

  const menu = menus.map((menu) => {
    if (menu.children.length === 0) {
      if (menu.has_permission) {
        return (
          <Menu.Item key={menu.key} icon={menu.icon}>
            <Link to={menu.path} onClick={() => onMenuItemClick(menu)}>
              {menu.name}
            </Link>
          </Menu.Item>
        );
      } else return null;
    } else {
      if (menu.has_permission) {
        return (
          <Menu.SubMenu key={menu.key} icon={menu.icon} title={menu.name}>
            {menu.children.map((sub_menu) => {
              if (
                !sub_menu.has_permission ||
                (sub_menu.has_permission &&
                  permissions.hasOwnProperty(sub_menu.permission_name))
              ) {
                return (
                  <Menu.Item key={sub_menu.key} icon={sub_menu.icon}>
                    <Link
                      to={sub_menu.path}
                      onClick={() => onMenuItemClick(menu, sub_menu)}
                    >
                      {sub_menu.name}
                    </Link>
                  </Menu.Item>
                );
              } else return null;
            })}
          </Menu.SubMenu>
        );
      }
    }
  });

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={collapsed ? 80 : 240}
      style={{
        left: 0,
        zIndex: 4,
        backgroundColor: "#ffffff",
        marginTop: 60,
        position: "fixed",
        height: "calc(100vh - 110px)",
        overflow: "auto",
      }}
    >
      <Menu
        onClick={onClick}
        onOpenChange={onMenuOpen}
        mode="inline"
        defaultSelectedKeys={[menuKey]}
        defaultOpenKeys={menuKeyPath}
        selectedKeys={[menuKey]}
        openKeys={menuKeyPath}
      >
        {menu}
        <Menu.Item key={43} icon={<QuestionCircleOutlined />}>
          <Link onClick={onClickUrl("http://help.mhotel9.asia/")}>
            Hướng dẫn sử dụng
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
