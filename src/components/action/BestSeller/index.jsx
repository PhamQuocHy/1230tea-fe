import React, { Component } from "react";
import Slider from "react-slick";
import "./styles.scss";

import { GiJusticeStar } from "react-icons/gi";

const Banner = () => {
  // style = {};
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div className="w-full py-6 transition-all duration-300 ease-linear">
      <div>
        <div className="w-width-layout mx-auto my-0 pb-3">
          <div className="text-center">
            <h1 className="font-bold text-[30px] my-2 text-color-yelow uppercase">
              best seller
            </h1>
          </div>
          <div className="text-center flex items-center justify-center">
            <span className="w-[200px] border border-solid border-[#666]"></span>
            <GiJusticeStar color="#666" className="mx-[6px]" size={"1.2rem"} />
            <span className="w-[200px] border border-solid border-[#666]"></span>
          </div>
        </div>
      </div>
      <div className="w-width-layout mx-auto my-0 py-4">
        <Slider {...settings}>
          <div className="slide-item">
            <div
              className="bg-background-blue-dark py-4 rounded-lg"
              style={{ boxShadow: "0px 2px 6px 2px rgb(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-[80%] h-[160px] object-contain"
                  src="https://1230tea.vn/wp-content/uploads/2022/12/Tra-sua-1230tea-1.png"
                  alt=""
                />
              </div>
              <div className="">
                <div className="text-center capitalize">
                  <p className="text-[22px] font-bold text-color-yelow py-1 m-0">
                    Trà Sữa 1230 Tea
                  </p>
                  <span className="text-white text-[14px] hidden ">
                    ( Special Bubbles Tea 1230 )
                  </span>
                </div>
                <div className="text-center py-1">
                  <p className="text-[20px]  text-white m-0 pb-2">28.000 VNĐ</p>
                  <button className="bg-background-yelow text-white border-2 mt-1 border-yelow border-solid py-2 px-4 rounded font-bold cursor-pointer hover:bg-background-blue-dark transition-all  duration-200 ease-linear">
                    THÊM MÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <div
              className="bg-background-blue-dark py-4 rounded-lg"
              style={{ boxShadow: "0px 2px 6px 2px rgb(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-[80%] h-[160px] object-contain"
                  src="https://1230tea.vn/wp-content/uploads/2022/12/Tra-sua-1230tea-1.png"
                  alt=""
                />
              </div>
              <div className="">
                <div className="text-center capitalize">
                  <p className="text-[22px] font-bold text-color-yelow py-1 m-0">
                    Trà Sữa 1230 Tea
                  </p>
                  <span className="text-white text-[14px] hidden ">
                    ( Special Bubbles Tea 1230 )
                  </span>
                </div>
                <div className="text-center py-1">
                  <p className="text-[20px]  text-white m-0 pb-2">28.000 VNĐ</p>
                  <button className="bg-background-yelow text-white border-2 mt-1 border-yelow border-solid py-2 px-4 rounded font-bold cursor-pointer hover:bg-background-blue-dark transition-all  duration-200 ease-linear">
                    THÊM MÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <div
              className="bg-background-blue-dark py-4 rounded-lg"
              style={{ boxShadow: "0px 2px 6px 2px rgb(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-[80%] h-[160px] object-contain"
                  src="https://1230tea.vn/wp-content/uploads/2022/12/Tra-sua-1230tea-1.png"
                  alt=""
                />
              </div>
              <div className="">
                <div className="text-center capitalize">
                  <p className="text-[22px] font-bold text-color-yelow py-1 m-0">
                    Trà Sữa 1230 Tea
                  </p>
                  <span className="text-white text-[14px] hidden ">
                    ( Special Bubbles Tea 1230 )
                  </span>
                </div>
                <div className="text-center py-1">
                  <p className="text-[20px]  text-white m-0 pb-2">28.000 VNĐ</p>
                  <button className="bg-background-yelow text-white border-2 mt-1 border-yelow border-solid py-2 px-4 rounded font-bold cursor-pointer hover:bg-background-blue-dark transition-all  duration-200 ease-linear">
                    THÊM MÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <div
              className="bg-background-blue-dark py-4 rounded-lg"
              style={{ boxShadow: "0px 2px 6px 2px rgb(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-[80%] h-[160px] object-contain"
                  src="https://1230tea.vn/wp-content/uploads/2022/12/Tra-sua-1230tea-1.png"
                  alt=""
                />
              </div>
              <div className="">
                <div className="text-center capitalize">
                  <p className="text-[22px] font-bold text-color-yelow py-1 m-0">
                    Trà Sữa 1230 Tea
                  </p>
                  <span className="text-white text-[14px] hidden ">
                    ( Special Bubbles Tea 1230 )
                  </span>
                </div>
                <div className="text-center py-1">
                  <p className="text-[20px]  text-white m-0 pb-2">28.000 VNĐ</p>
                  <button className="bg-background-yelow text-white border-2 mt-1 border-yelow border-solid py-2 px-4 rounded font-bold cursor-pointer hover:bg-background-blue-dark transition-all  duration-200 ease-linear">
                    THÊM MÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <div
              className="bg-background-blue-dark py-4 rounded-lg"
              style={{ boxShadow: "0px 2px 6px 2px rgb(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-[80%] h-[160px] object-contain"
                  src="https://1230tea.vn/wp-content/uploads/2022/12/Tra-sua-1230tea-1.png"
                  alt=""
                />
              </div>
              <div className="">
                <div className="text-center capitalize">
                  <p className="text-[22px] font-bold text-color-yelow py-1 m-0">
                    Trà Sữa 1230 Tea
                  </p>
                  <span className="text-white text-[14px] hidden ">
                    ( Special Bubbles Tea 1230 )
                  </span>
                </div>
                <div className="text-center py-1">
                  <p className="text-[20px]  text-white m-0 pb-2">28.000 VNĐ</p>
                  <button className="bg-background-yelow text-white border-2 mt-1 border-yelow border-solid py-2 px-4 rounded font-bold cursor-pointer hover:bg-background-blue-dark transition-all  duration-200 ease-linear">
                    THÊM MÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <div
              className="bg-background-blue-dark py-4 rounded-lg"
              style={{ boxShadow: "0px 2px 6px 2px rgb(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-[80%] h-[160px] object-contain"
                  src="https://1230tea.vn/wp-content/uploads/2022/12/Tra-sua-1230tea-1.png"
                  alt=""
                />
              </div>
              <div className="">
                <div className="text-center capitalize">
                  <p className="text-[22px] font-bold text-color-yelow py-1 m-0">
                    Trà Sữa 1230 Tea
                  </p>
                  <span className="text-white text-[14px] hidden ">
                    ( Special Bubbles Tea 1230 )
                  </span>
                </div>
                <div className="text-center py-1">
                  <p className="text-[20px]  text-white m-0 pb-2">28.000 VNĐ</p>
                  <button className="bg-background-yelow text-white border-2 mt-1 border-yelow border-solid py-2 px-4 rounded font-bold cursor-pointer hover:bg-background-blue-dark transition-all  duration-200 ease-linear">
                    THÊM MÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="slide-item">
            <div
              className="bg-background-blue-dark py-4 rounded-lg"
              style={{ boxShadow: "0px 2px 6px 2px rgb(0,0,0,0.5)" }}
            >
              <div className="flex items-center justify-center">
                <img
                  className="w-[80%] h-[160px] object-contain"
                  src="https://1230tea.vn/wp-content/uploads/2022/12/Tra-sua-1230tea-1.png"
                  alt=""
                />
              </div>
              <div className="">
                <div className="text-center capitalize">
                  <p className="text-[22px] font-bold text-color-yelow py-1 m-0">
                    Trà Sữa 1230 Tea
                  </p>
                  <span className="text-white text-[14px] hidden ">
                    ( Special Bubbles Tea 1230 )
                  </span>
                </div>
                <div className="text-center py-1">
                  <p className="text-[20px]  text-white m-0 pb-2">28.000 VNĐ</p>
                  <button className="bg-background-yelow text-white border-2 mt-1 border-yelow border-solid py-2 px-4 rounded font-bold cursor-pointer hover:bg-background-blue-dark transition-all  duration-200 ease-linear">
                    THÊM MÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
