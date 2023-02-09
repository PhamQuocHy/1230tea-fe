import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Banner: React.FC = () => (
  <Carousel autoplay>
    <div className="transition-all duration-200 ease-linear">
      {/* <h3 style={contentStyle}>1</h3> */}
      <div className="">
        <img
          src="../../image/banner-1.png"
          alt=""
          className="w-full h-[500px]"
        />
      </div>
    </div>
    <div>
      {/* <h3 style={contentStyle}>1</h3> */}
      <div className="">
        <img
          src="../../image/banner-2.png"
          alt=""
          className="w-full h-[500px]"
        />
      </div>
    </div>
  </Carousel>
);

export default Banner;
