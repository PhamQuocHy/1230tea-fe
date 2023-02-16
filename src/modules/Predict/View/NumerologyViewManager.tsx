/* eslint-disable jsx-a11y/alt-text */
import { Space, Card, Typography } from "antd";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import { useForm } from "antd/lib/form/Form";
import "../../../app/style.scss";
import { getListPredict } from "../PredictApi";

const NumerologyViewManager: React.FC = () => {
  const dispatch = useAppDispatch();
  //useAppSelect
  const user = useAppSelector((state) => state.rootReducer.auth.user);
  const listPredict = useAppSelector((state) => state.predict.listPredict);

  //state view

  //Open Modal
  const { Text } = Typography;
  //Search
  async function loadData() {
    try {
      const paramsGet = {
        phone: user?.phone || "0389606380",
      };
      const resultPredict: any = await dispatch(getListPredict(paramsGet));
    } catch (e: any) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      className="container relative mx-auto flex md:flex-row flex-col items-center "
      style={{
        backgroundColor: listPredict.data?.zodiac.color_web_first,
      }}
    >
      <div className="w-full h-full absolute grid place-items-center auto-cols-fr auto-rows-fr">
        <img
          className="w-full blur-[0px] opacity-[20%] animate-spin"
          style={{
            position: "relative",
            zIndex: 5,
          }}
          alt="hero"
          src={`../../../image/tsh.png`}
        />
      </div>

      <div
        className="lg:flex-grow z-10 w-full h-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-center items-center text-center shadow-2xl p-10 bg-opacity-10"
        // style={{
        //   backgroundImage: `url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80")`,
        //   backgroundSize: "cover",
        //   position: "relative",
        //   overflow: "hidden",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {/* <div
          style={{
            position: "absolute",
            background: `${user.get_customer?.zodiac.color_web_first}`,
            opacity: 0.85,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div> */}
        <div>
          {/* <Text
            style={{
              color: "#fff",
              // textShadow: "0px 0px 10px #fcba03",
            }}
          >
            <h1
              className="title-font number-glory font-semibold 
        text-5xl text-center
        "
              style={{
                color: `${user.get_customer?.zodiac.color_web_second}`,
              }}
            >
              SỐ CHỦ ĐẠO <br />
            </h1>
            <p
              className="title-font number-glory font-bold text-white
        text-7xl text-center "
            >
              {listPredict.data?.numberology}
            </p>
          </Text> */}

          <div
            style={{
              color: "#fff",
              textShadow: `0px 0px 10px ${user.get_customer?.zodiac.color_web_second}`,
            }}
            className="w-full flex items-center justify-center flex-col"
          >
            <h1
              style={{ color: user.get_customer?.zodiac.color_web_second }}
              className="title-font sm:text-4xl text-3xl mb-4 font-bold uppercase"
            >
              Số chủ đạo
            </h1>
            <p className="text-5xl my-2 capitalize font-bold">
              {listPredict.data?.numberology}
            </p>
          </div>

          <div>
            <div className="bg-before-white rounded-2xl col-span-6 h-full w-full text-white text-left">
              <div
                className="py-3  self-center text-[18px] uppercase  font-bold"
                style={{
                  color: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              >
                Tổng quan
              </div>
              <p className="whitespace-pre-wrap text-[16px] my-2 leading-relaxed text-white">
                {listPredict.data?.twelve_numerology.summary}
              </p>
            </div>
          </div>
          {/* ===================== */}
          <div>
            <div className="bg-before-white rounded-2xl h-full w-full grid border-slate-400  bg-opacity-10 text-white text-left">
              <div
                className="py-3  self-center text-[18px] uppercase  font-bold"
                style={{
                  color: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              >
                Nổi bật
              </div>

              <p className=" whitespace-pre-wrap text-[16px] my-2 text-justify w-[1115px] leading-relaxed text-white">
                {listPredict.data?.twelve_numerology.salient_features}
              </p>
            </div>
          </div>
          {/* ===================== */}
          <div>
            <div className="bg-before-white rounded-2xl h-full w-full grid  text-white text-left">
              <div
                className="py-3  self-center text-[18px] uppercase  font-bold"
                style={{
                  color: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              >
                Cần thay đổi - cố gắng
              </div>
              <p className="whitespace-pre-wrap text-[16px] my-2 text-justify w-[1115px] leading-relaxed text-white">
                {listPredict.data?.twelve_numerology.need_to_change}
              </p>
            </div>
          </div>
          {/* ===================== */}
          <div>
            <div className="bg-before-white rounded-2xl h-full w-full grid  text-white text-left">
              <div
                className="py-3  self-center text-[18px] uppercase  font-bold"
                style={{
                  color: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              >
                Hướng phát triển
              </div>
              <p className="leading-relaxed text-white text-left ml-6 text-justify pr-[28px] whitespace-pre-wrap text-[16px] my-2 ">
                {listPredict.data?.twelve_numerology.development}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NumerologyViewManager;
