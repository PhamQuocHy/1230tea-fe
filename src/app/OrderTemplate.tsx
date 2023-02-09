import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ShoppingCartOutlined, HistoryOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import React, { useEffect } from "react";
import { LoginOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import CartSider from "./CartSider";
import CartModal from "./CartModal";
import HistoryView from "../modules/history/View/HistoryView";
import Banner from "../components/action/Banner";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok, FaFacebookF } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

type Props = {};

const OrderTemplate = (props: Props) => {
  const token = useAppSelector(
    (state: RootState) => state.rootReducer.auth.token
  );

  const cart = useAppSelector(
    (state: RootState) => state.rootReducer.order.cart
  );

  const [collapsed, setCollapsed] = React.useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState<any>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleReSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleReSize);
    handleReSize();
    return () => window.removeEventListener("resize", handleReSize);
  }, []);

  useEffect(() => {
    const header: any = document.querySelector("#header");
    const main: any = document.querySelector("#main");
    if (collapsed === false) {
      const headerResize = () => {
        if (window.innerWidth <= 1500) {
          header.style.width = "calc(100% - 30%)";
          main.style.width = "calc(100% - 30%)";
        } else {
          header.style.width = "calc(100% - 20%)";
          main.style.width = "calc(100% - 20%)";
        }
      };

      headerResize();
    } else {
      header.style.width = "100%";
      main.style.width = "100%";
    }
  }, [collapsed]);

  return (
    <Layout className="h-full bg-white">
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
      <Layout className="bg-white">
        <div className="w-full">
          <div
            id="header"
            style={{
              boxShadow: "2px 2px 10px 2px rgb(0,0,0,0.45)",
            }}
            className=" bg-background-blue-dark fixed top-0 left-0 right-0 z-[99999] transition-all duration-200 ease-linear"
          >
            <Header
              // style={{ height: "74px" }}
              className={
                "h-header-height bg-transparent my-0 mx-auto leading-header-lineHeight w-width-layout flex items-center justify-between p-0 pl-3"
              }
            >
              <div className="col-span-1 grid place-items-center">
                <img
                  className=" h-header-height shake-vertical"
                  src="../../image/text_logo.png"
                  alt=""
                />
              </div>
              {/* <div className="2xl:col-span-6 md:col-span-3 lg:col-span-3 col-span-2"></div> */}

              <div className="flex items-center">
                <div className="justify-center min-w-[100px] mx-3">
                  <div>
                    <Link
                      to="/login"
                      className="flex items-center justify-center h-10 text-md font-semibold text-OnPrimaryLight rounded-lg border-2 border-solid border-yelow bg-background-yelow py-2 px-5"
                    >
                      Đăng Nhập
                    </Link>
                  </div>
                </div>

                <div
                  className="justify-center min-w-[100px] mx-3"
                  onClick={() => {
                    setIsHistoryVisible(true);
                  }}
                >
                  <div className="">
                    <div className="text-md border-2 border-solid border-yelow flex items-center h-10 justify-center font-semibold cursor-pointer text-OnPrimaryLight bg-background-yelow px-5 py-2 rounded-lg">
                      {/* <HistoryOutlined className="text-OnPrimaryLight" />{" "} */}
                      <div className="inline text-md">Lịch sử</div>
                    </div>
                  </div>
                </div>

                <div
                  className="justify-center min-w-[100px] mx-3"
                  onClick={() => {
                    setCollapsed((prev) => !prev);
                  }}
                >
                  <div className="">
                    <div
                      className="cart-item text-md flex items-center h-10 justify-center font-semibold cursor-pointer text-OnPrimaryLight
                   bg-transparent border-2 border-solid border-yelow px-5 py-2 rounded-lg transition-all
                   duration-200 ease-linear hover:bg-background-yelow"
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
                </div>
              </div>
            </Header>
          </div>
          <div className="mt-[74px]">
            <Banner />
          </div>
        </div>
        {/* <Content className="h-full grid place-items-center pt-7 pb-5 transition-all duration-200 ease-linear">
          <Outlet />
        </Content> */}

        {/* Start Content */}
        <div
          id="main"
          className="flex my-0 mx-auto place-items-center transition-all duration-200 ease-linear"
        >
          <Outlet />
        </div>
        {/* End Content */}

        <Footer
          style={{ textAlign: "center" }}
          className="bg-background-blue-dark"
        >
          <div className="pb-2 border-x-0 border-t-0 border-b border-solid border-[#fff]">
            <div className="flex items-center justify-center">
              <div>
                <a href="" className="block px-2">
                  <FaFacebookF
                    size={"24px"}
                    className="text-[#fff] hover:text-color-yelow transition-all duration-200 ease-linear"
                  />
                </a>
              </div>
              <div>
                <a href="" className="block px-2">
                  <FaTiktok
                    size={"24px"}
                    className="text-[#fff] hover:text-color-yelow transition-all duration-200 ease-linear"
                  />
                </a>
              </div>
              <div>
                <a href="" className="block px-2">
                  <AiFillInstagram
                    size={"24px"}
                    className="text-[#fff] hover:text-color-yelow transition-all duration-200 ease-linear"
                  />
                </a>
              </div>
              <div>
                <a href="" className="block px-2">
                  <IoLogoYoutube
                    size={"24px"}
                    className="text-[#fff] hover:text-color-yelow transition-all duration-200 ease-linear"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-2 text-[#fff]">
            &#169; 2023 <strong>1230 Tea</strong>. All rights reserved
          </div>
        </Footer>
      </Layout>
      <CartSider collapsed={collapsed} cart={cart} />
      {window.innerWidth <= 760 && (
        <CartModal
          collapsed={collapsed}
          handleClose={() => setCollapsed(false)}
          cart={cart}
        />
      )}
      <Menu
        theme="light"
        className="fixed z-30 w-full sm:hidden block bottom-0 left-0"
        defaultSelectedKeys={["1"]}
        mode="horizontal"
      >
        <Menu.Item key="1">
          <Link to="/login" className="text-sm">
            <LoginOutlined /> Đăng nhập
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <a
            onClick={() => {
              setIsHistoryVisible(true);
            }}
            className="text-sm border-none bg-transparent"
          >
            <HistoryOutlined /> Lịch sử
          </a>
        </Menu.Item>
      </Menu>
      <HistoryView
        key="history"
        isOpen={isHistoryVisible}
        handleClose={() => {
          setIsHistoryVisible(false);
        }}
      />
    </Layout>
  );
};

export default OrderTemplate;
