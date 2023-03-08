import {
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  MehOutlined,
  MonitorOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { Input, Layout, Menu, theme, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { reset } from "../modules/Auth/LoginState";
import HistoryView from "../modules/history/View/HistoryView";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { RootState } from "../redux/store";
import CartModal from "./CartModal";
import CartSider from "./CartSider";
import "./style.scss";

import {
  AiFillInstagram,
  AiOutlineNumber,
  AiOutlineHistory,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaFacebookF, FaTiktok, FaGalacticRepublic } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { GiCompass, GiBackwardTime } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { BiUserPin, BiUser } from "react-icons/bi";
import { ImHistory } from "react-icons/im";
import { RiHome4Line } from "react-icons/ri";

//
// import { NoticationView } from "../../utils/NotificationView";
import PoupWellcome from "../utils/PoupWellcome";
//

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

  const [elementActive, setElementActive] = useState("");
  const [elementActiveMB, setElementActiveMB] = useState("");
  const [wellcome, setWellcome] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = React.useState(false);

  const [cartCollapsed, setCartCollapsed] = React.useState(true);
  const [info, setInfo] = React.useState({});
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
    if (window.innerWidth >= 1024) {
      const asideMenuWidth: string = "15%";
      const contentWidth = `calc(100% - ${asideMenuWidth})`;
      header.style.width = contentWidth;
      main.style.width = contentWidth;

      if (cartCollapsed === false) {
        const headerResize = () => {
          if (window.innerWidth <= 1500) {
            header.style.width = `calc(${contentWidth} - 30%)`;
            main.style.width = `calc(${contentWidth} - 30%)`;
          } else {
            header.style.width = `calc(${contentWidth} - 20%)`;
            main.style.width = `calc(${contentWidth} - 20%)`;
          }
        };
        headerResize();
      } else {
        header.style.width = contentWidth;
        main.style.marginLeft = asideMenuWidth;
        console.log("Width", header);
      }
    }
  }, [cartCollapsed]);
  //

  const mouseHoverEfect = (e: any, tsp: boolean) => {
    const textContent = e.target.querySelectorAll(".js-text-content");
    if (tsp === false) {
      e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_first} `;
      e.target.style.color = user.get_customer?.zodiac.color_web_second;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_second;
        }
      }
    } else {
      e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_second} `;
      e.target.style.color = user.get_customer?.zodiac.color_web_first;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_first;
        }
      }
    }
  };

  const mouseOutEfect = (e: any, tsp: boolean) => {
    const textContent = e.target.querySelectorAll(".js-text-content");

    if (tsp == false) {
      e.target.style.backgroundColor = `${user.get_customer?.zodiac.color_web_second} `;
      e.target.style.color = user.get_customer?.zodiac.color_web_first;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_first;
        }
      }
    } else {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = user.get_customer?.zodiac.color_web_second;
      if (textContent) {
        for (let i = 0; i < textContent.length; i++) {
          textContent[i].style.color =
            user.get_customer?.zodiac.color_web_second;
          textContent[i].style.backgroundColor = "transparent";
        }
      }
    }

    // // e.target.style.border = `2px solid ${user.get_customer?.zodiac.color_web_first} `;
    // const line = e.target.querySelector(".line-cart");
    // if (line) {
    //   line.style.border = `1px solid ${user.get_customer?.zodiac.color_web_first}`;
    // }
  };

  const setShowPopUp = () => {
    setWellcome(!wellcome);
  };

  const handleActiveMenu = (e: any) => {
    setElementActive(e.domEvent.target);
  };

  useEffect(() => {
    activeNavBar();
  }, [elementActive]);

  const activeNavBar = () => {
    const listMenuItem = document.querySelectorAll(".menu-item__lg");

    for (let y = 0; y < listMenuItem.length; y++) {
      if (listMenuItem[y].querySelector(".active") != null) {
        const menuItem = listMenuItem[y] as HTMLElement;
        menuItem.style.backgroundColor =
          user.get_customer?.zodiac.color_web_second;
        menuItem.style.color = user.get_customer?.zodiac.color_web_first;
      } else {
        const menuItem = listMenuItem[y] as HTMLElement;
        menuItem.style.backgroundColor = "transparent";
        menuItem.style.color = "#fff";
      }
    }
  };

  const menuZodiac = (
    <Menu>
      <Menu.Item key={1}>
        <NavLink
          to={"/predict"}
          onClick={(e) => handleActiveMenuMB(e)}
          className="flex items-center js-menu-mb-zodiac"
        >
          <span className="relative top-[2px] mr-[6px]">
            <GiCompass />
          </span>
          <span>Dự đoán</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key={2}>
        <NavLink
          to={"zodiac"}
          onClick={(e) => handleActiveMenuMB(e)}
          className="flex items-center js-menu-mb-zodiac"
        >
          <span className="relative top-[2px] mr-[6px]">
            <FaGalacticRepublic />
          </span>
          <span>Cung {user.get_customer?.zodiac.name}</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key={3}>
        <NavLink
          to={"/numerology"}
          onClick={(e) => handleActiveMenuMB(e)}
          className="flex items-center js-menu-mb-zodiac"
        >
          <span className="relative top-[2px] mr-[6px]">
            <AiOutlineNumber />
          </span>
          <span>Số chủ đạo {user.get_customer?.numberology}</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const menuUser = (
    <Menu>
      <Menu.Item key={1}>
        <NavLink
          to={"/customer-info"}
          onClick={(e) => handleActiveMenuMB(e)}
          className="flex items-center js-menu-mb-account"
        >
          <span className="relative top-[2px] mr-[6px]">
            <BiUserPin />
          </span>
          <span>Thông tin tài khoản</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key={2}>
        <NavLink
          to={""}
          onClick={async () => {
            await dispatch(reset());
          }}
          className="flex items-center"
        >
          <span className="relative top-[2px] mr-[6px]">
            <FaGalacticRepublic />
          </span>
          <span>Đăng Xuất</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const activeMenuMB = () => {
    const homeMbMenu = document.querySelector(".js-menu-mb-home");
    const zodiacMbMenu = document.querySelectorAll(".js-menu-mb-zodiac");
    const linkZodiacParent = document.querySelector(".js-menu-prmb-zodiac");
    const accountMbMenu = document.querySelector(".js-menu-mb-account");
    const linkAccountParent = document.querySelector(".js-menu-prmb-account");

    const menuItemMB = homeMbMenu as HTMLElement;
    const linkZodiacParentItem = linkZodiacParent as HTMLElement;
    const linkAccountParentItem = linkAccountParent as HTMLElement;

    if (menuItemMB.classList.contains("active")) {
      menuItemMB.style.color = user.get_customer?.zodiac.color_web_second;
      linkZodiacParentItem.style.color = "#fff";
      linkAccountParentItem.style.color = "#fff";
    } else {
      menuItemMB.style.color = "#fff";
    }

    if (accountMbMenu) {
      const accountMenu = accountMbMenu as HTMLElement;
      const parentAccountMB = accountMenu.parentElement?.parentElement;
      if (parentAccountMB) {
        if (accountMenu.classList.contains("active")) {
          accountMenu.style.color = user.get_customer?.zodiac.color_web_second;
          linkAccountParentItem.style.color =
            user.get_customer?.zodiac.color_web_second;
          parentAccountMB.style.backgroundColor =
            user.get_customer?.zodiac.color_web_first;
          linkZodiacParentItem.style.color = "#fff";
        } else {
          accountMenu.style.color = "#333";
        }
      }
    }

    if (zodiacMbMenu) {
      for (let i = 0; i < zodiacMbMenu.length; i++) {
        const zodiacItemMB = zodiacMbMenu[i] as HTMLElement;
        const parentZodiacMB = zodiacItemMB.parentElement?.parentElement;

        if (parentZodiacMB) {
          if (zodiacItemMB.classList.contains("active")) {
            linkZodiacParentItem.style.color =
              user.get_customer?.zodiac.color_web_second;
            linkAccountParentItem.style.color = "#fff";
            parentZodiacMB.style.color =
              user.get_customer?.zodiac.color_web_second;
            parentZodiacMB.style.backgroundColor =
              user.get_customer?.zodiac.color_web_first;
          } else {
            parentZodiacMB.style.color = "#333";
            parentZodiacMB.style.backgroundColor = "transparent";
          }
        }
      }
    }

    // for (let i = 0; i < zodiacMbMenu.length; i++) {}
  };

  const handleActiveMenuMB = (e: any) => {
    setElementActiveMB(e.target);
  };

  useEffect(() => {
    activeMenuMB();
  }, [elementActiveMB]);

  return (
    <div className="flex flex-col h-full overflow-auto">
      <Layout className="h-full" hasSider={true}>
        {/*  */}
        {<PoupWellcome user={user} handle={setShowPopUp} status={wellcome} />}
        {/*  */}

        {/* Header PC */}
        <Sider
          className={
            "md:block hidden z-20 shadow-xl shadow-OnBackgroundLight/20 fixed w-[15%] top-0 left-0 max-w-[15%] min-w-[15%] bottom-0"
          }
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={0}
          style={{
            backgroundColor: user.get_customer?.zodiac.color_web_first,
          }}
        >
          <Menu
            className="text-base"
            style={{
              backgroundColor: user.get_customer?.zodiac.color_web_first,
              color: "#fff",
            }}
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
            <Menu.Item
              className={
                "rounded-none menu-item__lg my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="1"
            >
              {" "}
              <NavLink to="">
                <SiHomeassistantcommunitystore className="relative top-[2px] mr-1" />{" "}
                Trang chủ
              </NavLink>
            </Menu.Item>
            <Menu.Item
              className={
                "menu-item__lg rounded-none my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="7"
            >
              {" "}
              <NavLink to="predict">
                <GiCompass className="relative top-[2px] mr-1" /> Dự đoán
              </NavLink>
            </Menu.Item>
            <Menu.Item
              className={
                "menu-item__lg rounded-none my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="2"
            >
              {" "}
              <NavLink to="zodiac">
                <BsStars className="relative top-[2px] mr-1" /> Cung{" "}
                {user.get_customer?.zodiac.name}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              className={
                "menu-item__lg rounded-none my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="3"
            >
              {" "}
              <NavLink to="numerology">
                <AiOutlineNumber className="relative top-[2px] mr-1" /> Số chủ
                đạo {user.get_customer?.numberology}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              className={
                "menu-item__lg rounded-none my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="4"
            >
              <NavLink to="/customer-info">
                <BiUserPin className="relative top-[2px] mr-1" /> Thông tin
                khách hàng
              </NavLink>
            </Menu.Item>
            <Menu.Item
              className={
                "menu-item__lg rounded-none my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="8"
            >
              <a
                onClick={() => {
                  setIsHistoryVisible(true);
                }}
                className="text-sm border-none bg-transparent"
              >
                <ImHistory className="relative top-[2px] mr-1" /> Lịch sử đặt
                hàng
              </a>
            </Menu.Item>
            <Menu.Item
              className={
                "menu-item__lg rounded-none my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="5"
            >
              {" "}
              <NavLink to="/bill-history">
                {" "}
                <AiOutlineHistory className="relative top-[2px] mr-1" /> Lịch sử
                thanh toán{" "}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              className={
                "menu-item__lg rounded-none my-2 mx-0 w-full h-[50px] leading-[50px] font-medium"
              }
              onClick={(e) => handleActiveMenu(e)}
              key="6"
            >
              {" "}
              <div
                // to="/"
                onClick={async () => {
                  await dispatch(reset());
                }}
              >
                <AiOutlineLogin className="relative top-[2px] mr-1 font-medium" />{" "}
                Đăng xuất
              </div>
            </Menu.Item>
          </Menu>
          {/*  */}

          {/*  */}
        </Sider>
        {/* End Header PC */}

        {/* Start Header Mobile */}
        <div
          // id="header"
          style={{
            boxShadow: "2px 2px 10px 2px rgb(0,0,0,0.45)",
            backgroundColor: user.get_customer?.zodiac.color_web_first,
          }}
          className="fixed lg:hidden bottom-0 left-0 right-0 z-[99999] transition-all duration-200 ease-linear"
        >
          <Header
            // style={{ height: "74px" }}
            className={
              "h-mb-header-height  bg-transparent my-0 mx-auto flex items-center justify-between p-0"
            }
          >
            <div className="flex items-center w-full px-4 justify-between mt-[-4px]">
              <div className="justify-center ">
                <div>
                  <NavLink
                    to="/"
                    onClick={(e) => handleActiveMenuMB(e)}
                    style={{ color: "white" }}
                    className="flex p-2 js-menu-mb-home items-center leading-none justify-center flex-col text-md"
                  >
                    <span className="mb-1">
                      <RiHome4Line size={"16px"} />
                    </span>
                    <span className="text-xs">Trang chủ</span>
                  </NavLink>
                </div>
              </div>

              <div className="justify-center">
                <div>
                  <div className="flex p-2 items-center leading-none justify-center flex-col text-md  text-OnPrimaryLight">
                    <Dropdown
                      // menu={{ items }}
                      // placement="topRight"
                      overlay={menuZodiac}
                      placement="topCenter"
                      arrow={{ pointAtCenter: true }}
                    >
                      <Button
                        style={{ color: "white" }}
                        className="text-xs js-menu-prmb-zodiac bg-transparent border-none flex flex-col justify-center items-center p-0"
                      >
                        <span className="mb-1">
                          <BsStars size={"16px"} />
                        </span>
                        <span className="text-xs">C H Đ</span>
                      </Button>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="justify-center">
                <div>
                  <Dropdown
                    // menu={{ items }}
                    // placement="topRight"
                    overlay={menuUser}
                    placement="topCenter"
                    arrow={{ pointAtCenter: true }}
                  >
                    <Button
                      style={{ color: "white" }}
                      className="text-xs bg-transparent js-menu-prmb-account border-none flex flex-col justify-center items-center p-0"
                    >
                      <span className="mb-1">
                        <BiUser size={"16px"} />
                      </span>
                      <span className="text-xs">Tôi</span>
                    </Button>
                  </Dropdown>
                </div>
              </div>

              <div
                className="justify-center"
                onClick={() => {
                  setIsHistoryVisible(!isHistoryVisible);
                }}
              >
                <div className="">
                  <div className="text-md  flex items-center h-10 justify-center  cursor-pointer text-OnPrimaryLight">
                    {/* <HistoryOutlined className="text-OnPrimaryLight" />{" "} */}
                    <div
                      style={
                        !isHistoryVisible
                          ? {}
                          : {
                              color: user.get_customer?.zodiac.color_web_second,
                            }
                      }
                      className="text-md leading-none flex flex-col px-2 text-center"
                    >
                      <span className="mb-1">
                        <GiBackwardTime size={"14px"} />
                      </span>
                      <span className="text-xs">Lịch sử</span>
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
                  <div className="text-md  flex items-center h-10 justify-center  cursor-pointer text-OnPrimaryLight">
                    {/* <HistoryOutlined className="text-OnPrimaryLight" />{" "} */}
                    <div
                      style={
                        collapsed
                          ? {}
                          : {
                              color: user.get_customer?.zodiac.color_web_second,
                            }
                      }
                      className="text-md leading-none flex flex-col px-2 text-center"
                    >
                      <span className="mb-1">
                        <AiOutlineShoppingCart size={"14px"} />
                      </span>
                      <span className="text-xs">Giỏ hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Header>
        </div>
        {/* End Header Mobile */}

        <Layout className="site-layout">
          <div className="hidden sm:block z-20">
            <div
              id="header"
              className="overflow-hidden ml-[15%] transition-all fixed top-0 duration-200 ease-linear text-OnPrimaryLight header-content shadow-xl shadow-OnBackgroundLight/20 z-20 flex h-header-height"
              // style={{
              //   background: `linear-gradient(323deg, ${user.get_customer?.zodiac.color_web_first}
              //    0%, ${user.get_customer?.zodiac.color_web_second} 99%)`,
              // }}
              style={{
                background: `${user.get_customer?.zodiac.color_web_first}`,
              }}
            >
              <div className="w-width-layout my-0 mx-auto flex items-center justify-end">
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
                <div className="h-full px-4">
                  <div
                    style={{
                      backgroundColor: `${user.get_customer?.zodiac.color_web_second}`,
                      border: `2px solid ${user.get_customer?.zodiac.color_web_second}`,
                      color: `${user.get_customer?.zodiac.color_web_first}`,
                    }}
                    onMouseEnter={(e) => mouseHoverEfect(e, false)}
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
                      {user.get_customer?.point}
                    </div>
                  </div>
                </div>
                <div className="h-full px-4">
                  <div
                    style={{
                      backgroundColor: "transparent",
                      color: `${user.get_customer?.zodiac.color_web_second}`,
                      border: `2px solid ${user.get_customer?.zodiac.color_web_second}`,
                    }}
                    className="cart-item text-md flex items-center h-10 justify-center font-semibold cursor-pointer px-5 py-2 rounded-lg transition-all
                   duration-200 ease-linear"
                    onClick={() => {
                      setCartCollapsed(!cartCollapsed);
                    }}
                    // onMouseEnter={(e) => mouseHoverEfect(e, true)}
                    // onMouseLeave={(e) => mouseOutEfect(e, true)}
                  >
                    <ShoppingCartOutlined className="js-text-content pr-1 text-lg relative top-[3px]" />{" "}
                    <div className="js-text-content inline text-md mr-1">
                      Giỏ hàng
                      <span
                        style={{
                          border: `1px solid ${user.get_customer?.zodiac.color_web_second}`,
                        }}
                        className="js-text-content line-cart ml-2 mr-1.5 relative top-px"
                      ></span>
                      {/* {cart.length > 0 && ( */}
                      {cart.length}
                    </div>
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
            className="transition-all lg:mt-header-height duration-200 ease-linear"
          >
            <Content className="h-full">
              {/* <Breadcrumb style={{ margin: "10px 0" }}>
                <Breadcrumb.Item></Breadcrumb.Item>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb> */}
              <div className="place-items-center">
                <Outlet />
              </div>
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
            </Content>
          </div>
        </Layout>

        <CartSider collapsed={cartCollapsed} cart={cart} />
        <Menu
          theme="light"
          className="fixed z-30 w-full hidden sm:hidden block bottom-0 left-0"
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

        {/*  */}
        {window.innerWidth <= 760 && (
          <CartModal
            collapsed={collapsed}
            handleClose={() => setCollapsed(true)}
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
