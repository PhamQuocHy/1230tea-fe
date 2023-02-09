import React, { useEffect, useRef, useState } from "react";
import Text from "antd/lib/typography/Text";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Outlet, Link } from "react-router-dom";

const TopSellView: React.FC = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };
  return (
    <>
      <h1
        className="text-slate-500 font-bold text-4xl font-poppins text-center
      "
      >
        -SẢN PHẨM BÁN CHẠY TUẦN NÀY-
      </h1>
      <Slider {...settings} className="slider">
        <div className="slider-card">
          <p className="slider-card-number">1</p>
          <div className="slider-img">
            <img
              src="../../../image/seller1.jpg"
              alt=""
              width="105px"
              height="100px"
            />
            <img
              src="../../../image/seller1.jpg"
              className="verify"
              alt=""
              width="105px"
              height="100px"
            />
          </div>
          <Link to={`/profile/Rian`}>
            <p className="slider-card-name">Trà sữa truyền thống</p>
          </Link>
          <p className="slider-card-price">
            20.000 <span>VNĐ</span>
          </p>
        </div>
        <div className="slider-card">
          <p className="slider-card-number">2</p>
          <div className="slider-img">
            <img
              src="../../../image/seller2.jpg"
              alt=""
              width="105px"
              height="100px"
            />
            <img
              src="../../../image/seller2.jpg"
              className="verify"
              alt=""
              width="105px"
              height="100px"
            />
          </div>
          <Link to={`/profile/Rian`}>
            <p className="slider-card-name">Sữa tươi đường đen</p>
          </Link>
          <p className="slider-card-price">
            25.000 <span>VNĐ</span>
          </p>
        </div>
        <div className="slider-card">
          <p className="slider-card-number">3</p>
          <div className="slider-img">
            <img
              src="../../../image/seller3.jpg"
              alt=""
              width="105px"
              height="100px"
            />
            <img
              src="../../../image/seller3.jpg"
              className="verify"
              alt=""
              width="105px"
              height="100px"
            />
          </div>
          <Link to={`/profile/Rian`}>
            <p className="slider-card-name">Trà sen Machiato</p>
          </Link>
          <p className="slider-card-price">
            45.620 <span>VNĐ</span>
          </p>
        </div>
        <div className="slider-card">
          <p className="slider-card-number">4</p>
          <div className="slider-img">
            <img
              src="../../../image/seller4.jpg"
              alt=""
              width="105px"
              height="100px"
            />
            <img
              src="../../../image/seller4.jpg"
              className="verify"
              alt=""
              width="105px"
              height="100px"
            />
          </div>
          <Link to={`/profile/Rian`}>
            <p className="slider-card-name">Trà vải kem Cheese</p>
          </Link>
          <p className="slider-card-price">
            42.125 <span>VNĐ</span>
          </p>
        </div>
        <div className="slider-card">
          <p className="slider-card-number">5</p>
          <div className="slider-img">
            <img
              src="../../../image/seller5.jpg"
              alt=""
              width="105px"
              height="100px"
            />
            <img
              src="../../../image/seller5.jpg"
              className="verify"
              alt=""
              width="105px"
              height="100px"
            />
          </div>
          <Link to={`/profile/Rian`}>
            <p className="slider-card-name">Trà vải</p>
          </Link>
          <p className="slider-card-price">
            31.921 <span>VNĐ</span>
          </p>
        </div>
        <div className="slider-card">
          <p className="slider-card-number">6</p>
          <div className="slider-img">
            <img
              src="../../../image/seller6.jpg"
              alt=""
              width="105px"
              height="100px"
            />
            <img
              src="../../../image/seller6.jpg"
              className="verify"
              alt=""
              width="105px"
              height="100px"
            />
          </div>
          <Link to={`/profile/Rian`}>
            <p className="slider-card-name">Trà đào cam sả</p>
          </Link>
          <p className="slider-card-price">
            3.548 <span>VNĐ</span>
          </p>
        </div>
      </Slider>
    </>
  );
};

export default TopSellView;
