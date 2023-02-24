import { ShoppingCartOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { AiFillInstagram, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { GiBackwardTime } from "react-icons/gi";
import { IoLogoYoutube } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import Banner from "../components/action/Banner";
import HistoryView from "../modules/history/View/HistoryView";
import { useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import CartModal from "./CartModal";
import CartSider from "./CartSider";

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
    if (window.innerWidth >= 1024) {
      if (collapsed === false) {
        const headerResize = () => {
          if (window.innerWidth <= 1500) {
            header.style.width = "calc(100% - 30%)";
            main.style.width = "calc(100% - 30%)";
            // main.style.marginLeft = "0";
            // main.style.marginRight = "0";
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
    }
  }, [collapsed]);

  const handleCloseCart = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="h-full bg-white overflow-x-hidden">
      {/* <div className="md:hidden fixed bottom-24 right-9">
        <button
          onClick={() => {
            setCollapsed((prev) => !prev);
          }}
          className=" leading-[0] bg-PrimaryContainerLight rounded-xl px-3 pt-2 pb-1 border-none shadow-xl text-center"
        >
          <ShoppingCartOutlined className="text-OnPrimaryContainerLight text-4xl" />
        </button>
      </div> */}
      <Layout className="bg-white">
        <div className="w-full">
          {/* Header PC */}
          <div
            id="header"
            style={{
              boxShadow: "2px 2px 10px 2px rgb(0,0,0,0.45)",
            }}
            className=" bg-background-blue-dark fixed hidden lg:block lg:top-0 left-0 right-0 z-[99999] transition-all duration-200 ease-linear"
          >
            <Header
              // style={{ height: "74px" }}
              className={
                "h-header-height  bg-transparent my-0 mx-auto leading-header-lineHeight lg:w-width-layout flex items-center justify-between p-0 lg:pl-3"
              }
            >
              <div className="h-full hidden lg:block">
                <img
                  className=" h-header-height shake-vertical"
                  src="../../image/text_logo.png"
                  alt=""
                />
              </div>
              {/* <div className="2xl:col-span-6 md:col-span-3 lg:col-span-3 col-span-2"></div> */}

              <div className="flex items-center w-full px-4 justify-between lg:justify-end">
                <div className="justify-center lg:min-w-[100px] lg:mx-3">
                  <div>
                    <Link
                      to="/login"
                      className="flex items-center justify-center h-10 text-md font-semibold text-OnPrimaryLight rounded-lg border-2 border-solid border-yelow bg-background-yelow py-2 px-5"
                    >
                      Đăng nhập
                    </Link>
                  </div>
                </div>

                <div
                  className="justify-center lg:min-w-[100px] lg:mx-3"
                  onClick={() => {
                    setIsHistoryVisible(!isHistoryVisible);
                    // console.log("Click 123");
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
                  className="justify-center lg:min-w-[100px] lg:mx-3"
                  onClick={() => {
                    setCollapsed((prev) => !prev);
                  }}
                >
                  <div className="">
                    <div
                      className="cart-item text-md flex items-center h-10 justify-center font-semibold cursor-pointer text-OnPrimaryLight
                   bg-transparent border-2 border-solid border-yelow px-5 py-2 rounded-lg transition-all
                   duration-200 ease-linear lg:hover:bg-background-yelow"
                    >
                      <ShoppingCartOutlined className="text-OnPrimaryLight hidden sm:block pr-1 text-lg relative top-[3px]" />{" "}
                      <div className="inline text-md mr-1">
                        Giỏ hàng
                        <span className="line-cart border border-solid border-yelow ml-2 mr-1.5 relative top-px"></span>
                        {cart.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Header>
          </div>
          {/* End Header PC */}

          {/* Header Mobile */}
          <div
            id="header"
            style={{
              boxShadow: "2px 2px 10px 2px rgb(0,0,0,0.45)",
            }}
            className="bg-background-blue-dark fixed lg:hidden bottom-0 left-0 right-0 z-[99999] transition-all duration-200 ease-linear"
          >
            <Header
              // style={{ height: "74px" }}
              className={
                "h-mb-header-height  bg-transparent my-0 mx-auto flex items-center justify-between p-0"
              }
            >
              <div className="flex items-center w-full px-4 justify-between mt-[-4px]">
                <div className="justify-center">
                  <div>
                    <Link
                      to="/login"
                      className="flex p-2 items-center leading-none justify-center flex-col text-md font-semibold text-OnPrimaryLight"
                    >
                      <span className="mb-1">
                        <BiUser size={"20px"} />
                      </span>
                      <span>Đăng nhập</span>
                    </Link>
                  </div>
                </div>

                <div
                  className="justify-center"
                  onClick={() => {
                    setIsHistoryVisible(!isHistoryVisible);
                  }}
                >
                  <div className="">
                    <div className="text-md  flex items-center h-10 justify-center font-semibold cursor-pointer text-OnPrimaryLight">
                      {/* <HistoryOutlined className="text-OnPrimaryLight" />{" "} */}
                      <div
                        style={!isHistoryVisible ? {} : { color: "#FAA31B" }}
                        className="text-md leading-none flex flex-col px-2 text-center"
                      >
                        <span className="mb-1">
                          <GiBackwardTime size={"20px"} />
                        </span>
                        <span>Lịch sử</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="justify-center"
                  onClick={() => {
                    setCollapsed((prev) => !prev);
                  }}
                >
                  <div className="">
                    <div className="text-md  flex items-center h-10 justify-center font-semibold cursor-pointer text-OnPrimaryLight">
                      {/* <HistoryOutlined className="text-OnPrimaryLight" />{" "} */}
                      <div
                        style={collapsed ? {} : { color: "#FAA31B" }}
                        className="text-md leading-none flex flex-col px-2 text-center"
                      >
                        <span className="mb-1">
                          <AiOutlineShoppingCart size={"20px"} />
                        </span>
                        <span>Giỏ hàng</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Header>
          </div>
          {/* End Header Mobile */}

          <div className="lg:mt-[74px] hidden lg:block">
            <Banner />
          </div>
        </div>
        {/* <Content className="h-full grid place-items-center pt-7 pb-5 transition-all duration-200 ease-linear">
          <Outlet />
        </Content> */}

        {/* Start Content */}
        <div>
          <div
            id="main"
            className="flex my-0 mx-0 place-items-center transition-all duration-300 ease-linear"
          >
            <Outlet />
          </div>
        </div>
        {/* End Content */}

        <Footer
          style={{ textAlign: "center" }}
          className="bg-background-blue-dark"
        >
          <div className="mb-mb-header-height lg:mb-0">
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
          </div>
        </Footer>
      </Layout>
      {/* {window.innerWidth >= 1024 && (
        <CartSider collapsed={collapsed} cart={cart} />
      )} */}
      {window.innerWidth < 1024 ? (
        <CartModal
          collapsed={collapsed}
          handleClose={handleCloseCart}
          cart={cart}
        />
      ) : (
        <CartSider collapsed={collapsed} cart={cart} />
      )}

      {/* <Menu
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
      </Menu> */}
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
