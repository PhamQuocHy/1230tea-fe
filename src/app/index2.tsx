import React, { useState, useEffect } from "react";
import {
  MonitorOutlined,
  LogoutOutlined,
  MehOutlined,
  HistoryOutlined,
  HomeOutlined,
  StarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Input, Typography } from "antd";
import { Outlet, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { reset } from "../modules/Auth/LoginState";
import "./style.scss";
import { getListPredict } from "../modules/Predict/PredictApi";
import CartSider from "./CartSider";
import { RootState } from "../redux/store";
import CartModal from "./CartModal";
import HistoryView from "../modules/history/View/HistoryView";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const SiderDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(
    (state: RootState) => state.rootReducer.order.cart
  );

  const { Search } = Input;

  const [collapsed, setCollapsed] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = React.useState(false);

  const [cartCollapsed, setCartCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = useAppSelector((state) => state.rootReducer.auth.user);

  return (
    <div className="flex flex-col h-full">
      <Layout className="h-5/6" hasSider={true}>
        <div className="md:hidden fixed bottom-24 right-9">
          <button
            onClick={() => {
              setCollapsed((prev) => !prev);
            }}
            className=" leading-[0] bg-PrimaryContainerLight rounded-xl px-3 pt-2 pb-1 border-none shadow-xl text-center"
          >
            <ShoppingCartOutlined className="text-OnPrimaryContainerLight text-4xl" />
          </button>
        </div>
        <Sider
          className={
            "md:block hidden z-20 shadow-xl shadow-OnBackgroundLight/20 bg-BackgroundLight"
          }
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={0}
        >
          <Menu
            theme="light"
            className=""
            defaultSelectedKeys={["1"]}
            mode="inline"
          >
            <div className="col-span-2 text-center my-4 row-span-2 h-full">
              <img
                className=" w-1/2 shake-vertical"
                src="../../image/text_logo.png"
                alt=""
              />
            </div>
            <Menu.Item key="1">
              {" "}
              <Link to="">
                <MonitorOutlined /> Trang chủ
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              {" "}
              <Link to="predict">
                <MonitorOutlined /> Dự đoán
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              {" "}
              <Link to="zodiac">
                <MonitorOutlined /> Cung {user.get_customer?.zodiac.name}
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              {" "}
              <Link to="numerology">
                <MonitorOutlined /> Số chủ đạo {user.get_customer?.numberology}
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/customer-info">
                <MehOutlined /> Thông tin khách hàng
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <a
                onClick={() => {
                  setIsHistoryVisible(true);
                }}
                className="text-sm border-none bg-transparent"
              >
                <HistoryOutlined /> Lịch sử
              </a>
            </Menu.Item>
            <Menu.Item key="5">
              {" "}
              <Link to="/bill-history">
                {" "}
                <HistoryOutlined /> Lịch sử thanh toán{" "}
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              {" "}
              <Link
                to="/"
                onClick={async () => {
                  await dispatch(reset());
                }}
              >
                <LogoutOutlined /> Đăng xuất
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout h-full">
          <div className="hidden sm:block z-20">
            <div
              className="overflow-hidden text-OnPrimaryLight header-content rounded-b-xl shadow-xl shadow-OnBackgroundLight/20 z-20 grid grid-cols-12 grid-rows-2 auto-rows-auto grid-flow-row-dense h-24"
              style={{
                background: `linear-gradient(323deg, ${user.get_customer?.zodiac.color_web_first}
                 0%, ${user.get_customer?.zodiac.color_web_second} 99%)`,
              }}
            >
              <div className="md:col-span-4 md:inline-grid hidden row-span-2 justify-start text-md md:text-2xl font-semibold h-full">
                Xin chào, {user?.first_name}!
              </div>
              <div className="col-span-2 h-full text-sm md:text-lg">
                Cung hoàng đạo
              </div>
              <div className="col-span-2 h-full text-sm md:text-lg">
                Thần số học
              </div>
              <div className="col-span-2 h-full text-sm md:text-lg">
                Điểm tích lũy
              </div>
              <div className="row-span-2 col-span-2 h-full">
                <button
                  onClick={() => {
                    setCartCollapsed(!cartCollapsed);
                  }}
                  className=" border-TertiaryContainerLight/50 rounded-md text-md font-semibold px-4 py-2 bg-TertiaryContainerLight text-OnTertiaryDark"
                >
                  <ShoppingCartOutlined className="text-OnTertiaryDark pr-2" />{" "}
                  Giỏ hàng
                  {cart.length > 0 && (
                    <div
                      className={
                        "inline rounded-full p-1 h-1 w-2 mx-1 text-md text-OnTertiaryDark"
                      }
                    >
                      {cart.length}
                    </div>
                  )}
                </button>
              </div>
              <div className="col-span-2 h-full text-xl font-bold items-start">
                {user.get_customer?.zodiac.name}
              </div>
              <div className="col-span-2 h-full text-xl font-bold items-start">
                {user.get_customer?.numberology}
              </div>
              <div className="col-span-2 h-full text-xl font-bold items-start">
                {user?.get_customer?.point}
              </div>
            </div>
          </div>

          {/* <Header style={{ padding: 0, background: colorBgContainer }}>
            <Search
              placeholder="Tìm kiếm"
              enterButton
              style={{ width: "20%", margin: 10, float: "right" }}
            />
          </Header> */}
          <div className="overflow-y-scroll h-full scrollbar-hide">
            <Content style={{ margin: "0 16px" }} className="h-full">
              <Breadcrumb style={{ margin: "10px 0" }}>
                <Breadcrumb.Item></Breadcrumb.Item>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              <div className="h-full grid place-items-center pt-3">
                <Outlet />
              </div>
              <Footer style={{ textAlign: "center" }}>
                Copyright &#169; 2022 - Bản quyền thuộc về AlphaGroup
              </Footer>
            </Content>
          </div>
        </Layout>
        <CartSider collapsed={cartCollapsed} cart={cart} />
        <Menu
          theme="light"
          className="fixed z-30 w-full sm:hidden block bottom-0 left-0"
          defaultSelectedKeys={["1"]}
          mode="horizontal"
        >
          <Menu.Item key="1">
            <Link to="" className="py-2 text-sm flex flex-col">
              <HomeOutlined /> Trang chủ
            </Link>
          </Menu.Item>

          <Menu.SubMenu
            className="z-30"
            title={
              <div className="py-2 text-sm flex flex-col">
                <StarOutlined /> Tra cứu hoàng đạo
              </div>
            }
          >
            <Menu.Item key="7">
              {" "}
              <Link to="predict">
                <MonitorOutlined /> Dự đoán
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="zodiac" className="py-2 text-sm">
                <MonitorOutlined /> Cung {user.get_customer?.zodiac.name}
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="numerology" className="py-2 text-sm">
                <MonitorOutlined /> Số chủ đạo {user.get_customer?.numberology}
              </Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu
            className="z-30"
            title={
              <div className="py-2 text-sm flex flex-col">
                <UserOutlined /> Tài khoản
              </div>
            }
          >
            <Menu.Item key="4">
              <Link to="/customer-info" className="text-sm">
                <MehOutlined /> Thông tin khách hàng
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <a
                onClick={() => {
                  setIsHistoryVisible(true);
                }}
                className="text-sm border-none bg-transparent"
              >
                <HistoryOutlined /> Lịch sử
              </a>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/bill-history" className="text-sm">
                <HistoryOutlined /> Lịch sử thanh toán
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link
                to="/"
                className="text-sm"
                onClick={async () => {
                  await dispatch(reset());
                }}
              >
                <LogoutOutlined /> Đăng xuất
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        {window.innerWidth <= 760 && (
          <CartModal
            collapsed={collapsed}
            handleClose={() => setCollapsed(false)}
            cart={cart}
          />
        )}
        <HistoryView
          key="history"
          isOpen={isHistoryVisible}
          handleClose={() => {
            setIsHistoryVisible(false);
          }}
        />
      </Layout>
    </div>
  );
};

export default SiderDemo;
