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

  const [cartCollapsed, setCartCollapsed] = React.useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = useAppSelector((state) => state.rootReducer.auth.user);

  //
  // useEffect(() => {
  //   const header: any = document.querySelector("#header");
  //   // const main: any = document.querySelector("#main");
  //   const asideMenuWidth: string = "15%";
  //   const contentWidth = `calc(100% - ${asideMenuWidth})`;
  //   header.style.width = contentWidth;
  // }, []);

  useEffect(() => {
    const header: any = document.querySelector("#header");
    const main: any = document.querySelector("#mainContent");
    const asideMenuWidth: string = "15%";
    const contentWidth = `calc(100% - ${asideMenuWidth})`;
    header.style.width = contentWidth;
    main.style.width = contentWidth;
    if (cartCollapsed === false) {
      const headerResize = () => {
        if (window.innerWidth <= 1500) {
          header.style.width = `calc(${contentWidth} - 30%)`;
          main.style.width = `calc(${contentWidth} - 30%)`;
          // main.style.width = "calc(100% - 30%)";
          // main.style.marginLeft = "0";
        } else {
          header.style.width = `calc(${contentWidth} - 20%)`;
          main.style.width = `calc(${contentWidth} - 20%)`;
          // main.style.marginLeft = "0";
        }
      };
      headerResize();
    } else {
      header.style.width = contentWidth;
      main.style.marginLeft = asideMenuWidth;
      // main.style.width = "100%";
      // main.style.marginLeft = "auto";
      // main.style.marginRight = "auto";
    }
    // console.log("cartCollapsed", cartCollapsed);
  }, [cartCollapsed]);
  //

  const mouseHoverEfect = (e: any) => {
    e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_first} `;
    e.target.style.color = user.get_customer?.zodiac.color_web_second;

    const textContent = e.target.querySelector(".js-text-content");
    if (textContent) {
      textContent.style.color = user.get_customer?.zodiac.color_web_second;
    }
    console.log(e.target.style.backgroundColor);

    // // e.target.style.border = `2px solid ${user.get_customer?.zodiac.color_web_second}`;
    // const line = e.target.querySelector(".line-cart");
    // if (line) {
    //   line.style.border = `1px solid ${user.get_customer?.zodiac.color_web_second}`;
    // }
  };

  const mouseOutEfect = (e: any, tsp: boolean) => {
    if (tsp == false) {
      e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_second} `;
    } else {
      e.target.style.backgroundColor = "transparent";
    }
    e.target.style.color = user.get_customer?.zodiac.color_web_first;
    const textContent = e.target.querySelector(".js-text-content");
    if (textContent) {
      textContent.style.color = user.get_customer?.zodiac.color_web_first;
    }
    console.log("Ra");

    // // e.target.style.border = `2px solid ${user.get_customer?.zodiac.color_web_first} `;
    // const line = e.target.querySelector(".line-cart");
    // if (line) {
    //   line.style.border = `1px solid ${user.get_customer?.zodiac.color_web_first}`;
    // }
  };

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
            "md:block hidden z-20 shadow-xl shadow-OnBackgroundLight/20 fixed w-[15%] top-0 left-0 max-w-[15%] min-w-[15%] bottom-0"
          }
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={0}
        >
          <Menu
            className=""
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{
              backgroundColor: user.get_customer?.zodiac.color_web_first,
            }}
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

        <Layout className="site-layout">
          <div className="hidden sm:block z-20">
            <div
              id="header"
              className="overflow-hidden ml-[15%] transition-all fixed top-0 duration-200 ease-linear text-OnPrimaryLight header-content rounded-b-xl shadow-xl shadow-OnBackgroundLight/20 z-20 flex h-header-height"
              style={{
                background: `linear-gradient(323deg, ${user.get_customer?.zodiac.color_web_first}
                 0%, ${user.get_customer?.zodiac.color_web_second} 99%)`,
              }}
            >
              <div className="w-width-layout">
                {/* <div className="md:col-span-4 md:inline-grid hidden row-span-2 justify-start text-md md:text-2xl font-semibold h-full">
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
              </div> */}
                {/* <div className="row-span-2 col-span-2 h-full">
                <button
                  onClick={() => {
                    setCartCollapsed(!cartCollapsed);
                  }}
                  className=" cart-item text-md flex items-center h-10 justify-center font-semibold cursor-pointer text-OnPrimaryLight
                  bg-transparent border-2 border-solid border-yelow px-5 py-2 rounded-lg transition-all
                  duration-200 ease-linear hover:bg-background-yelow"
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
              </div> */}
                <div className="h-full">
                  <div
                    style={{
                      backgroundColor: `${user.get_customer?.zodiac.color_web_second}`,
                      border: `2px solid ${user.get_customer?.zodiac.color_web_second}`,
                      color: `${user.get_customer?.zodiac.color_web_first}`,
                    }}
                    onMouseEnter={(e) => mouseHoverEfect(e)}
                    onMouseLeave={(e) => mouseOutEfect(e, false)}
                    className={`
                    cart-item text-md flex items-center h-10 justify-center font-semibold cursor-pointer
                   px-5 py-2 rounded-lg transition-all
                   duration-200 ease-linear 
                    `}
                  >
                    <div
                      style={{ color: "unset" }}
                      className="js-text-content inline text-md mr-1 bg-transparent border-none"
                    >
                      Điểm tích lũy
                      <span
                        style={{
                          border: `1px solid ${user.get_customer?.zodiac.color_web_first}`,
                        }}
                        className="line-cart ml-2 mr-1.5 relative top-px"
                      ></span>
                      150
                    </div>
                  </div>
                </div>
                <div className="h-full">
                  <div
                    className="cart-item text-md flex items-center h-10 justify-center font-semibold cursor-pointer text-OnPrimaryLight
                   bg-transparent border-2 border-solid border-yelow px-5 py-2 rounded-lg transition-all
                   duration-200 ease-linear"
                    onClick={() => {
                      setCartCollapsed(!cartCollapsed);
                    }}
                    onMouseEnter={(e) => mouseHoverEfect(e)}
                    onMouseLeave={(e) => mouseOutEfect(e, true)}
                  >
                    <ShoppingCartOutlined className="text-OnPrimaryLight pr-1 text-lg relative top-[3px]" />{" "}
                    <div className="inline text-md mr-1">
                      Giỏ hàng
                      <span className="line-cart border border-solid border-yelow ml-2 mr-1.5 relative top-px"></span>
                      {/* {cart.length > 0 && ( */}
                      {cart.length}
                    </div>
                    {/* {cart.length > 0 && (
                        <div
                          className={
                            "inline rounded-full p-1 h-1 w-2 mx-1 text-md text-OnPrimaryLight"
                          }
                        >
                          {cart.length}
                        </div>
                      )} */}
                  </div>
                </div>
                {/* <div className="col-span-2 h-full text-xl font-bold items-start">
                {user.get_customer?.zodiac.name}
              </div>
              <div className="col-span-2 h-full text-xl font-bold items-start">
                {user.get_customer?.numberology}
              </div>
              <div className="col-span-2 h-full text-xl font-bold items-start">
                {user?.get_customer?.point}
              </div> */}
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
          <div
            id="mainContent"
            className="transition-all duration-200 ease-linear"
          >
            <Content style={{ margin: "0 16px" }} className="h-full">
              <Breadcrumb style={{ margin: "10px 0" }}>
                <Breadcrumb.Item></Breadcrumb.Item>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              <div className="grid place-items-center pt-3">
                <Outlet />
              </div>
              <Footer style={{ textAlign: "center" }}>
                Copyright &#169; 2023 - Bản quyền thuộc về 1230Tea 
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
