/* eslint-disable jsx-a11y/alt-text */
import { Space, Card, Typography } from "antd";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import { useForm } from "antd/lib/form/Form";
import "../../../app/style.scss";
import { getListPredict } from "../PredictApi";

const ZodiacViewManager: React.FC = () => {
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
      className="container relative mx-auto items-center "
      style={{
        backgroundColor: user.get_customer?.zodiac.color_web_first,
      }}
    >
      <div className="w-full h-full absolute grid place-items-center auto-cols-fr auto-rows-fr">
        <img
          // className="w-1/2 invert blur-[0px] opacity-[15%]"
          className="w-full blur-[0px] opacity-[15%]"
          alt="hero"
          src={`../../../image/zodiac/${listPredict.data?.zodiac_id}.png`}
        />
      </div>
      <div
        className="z-10 w-width-layout max-w-full my-0 mx-auto flex flex-col md:items-start md:text-left items-center text-center  shadow-2xl p-4 bg-opacity-10
      "
      >
        {" "}
        <div
          style={{
            color: "#fff",
            textShadow: `0px 0px 10px ${user.get_customer?.zodiac.color_web_second}`,
          }}
          className="w-full flex items-center justify-center flex-col"
        >
          <h1
            style={{ color: user.get_customer?.zodiac.color_web_second }}
            className="title-font sm:text-4xl text-xl lg:mb-4 mb-0 font-bold uppercase"
          >
            Cung {listPredict.data?.zodiac.name}
          </h1>
          <p className="text-lg my-2 capitalize">
            {listPredict.data?.zodiac.name_second} -{" "}
            {listPredict.data?.zodiac.codeName}
          </p>
        </div>
        {/* Content */}
        <div>
          <div className="pt-4 flex justify-between flex-col lg:flex-row">
            {/*  */}
            <div className="bg-before-white flex-1 py-2 px-6 text-left lg:text-center rounded-xl overflow-hidden">
              <p className="leading-relaxed text-white">
                Màu sắc: {listPredict.data?.zodiac.favColorName}
              </p>
              <p className="leading-relaxed text-white">
                Biểu tượng: {listPredict.data?.zodiac.icon}
              </p>
              <p className="leading-relaxed text-white">
                Hành tinh: {listPredict.data?.zodiac.star_of_destiny}
              </p>
            </div>

            {/*  */}
            <div className="bg-before-white flex-1 py-2 px-6 text-left lg:text-center ml-0 lg:ml-10 rounded-xl overflow-hidden">
              <p className=" leading-relaxed text-white">
                Màu may mắn: {listPredict.data?.zodiac.color_lucky}
              </p>
              <p className=" leading-relaxed text-white">
                Đá quí: {listPredict.data?.zodiac.gemVN}
              </p>
              <p className=" leading-relaxed text-white">
                Thần bảo hộ: {listPredict.data?.zodiac.protector}
              </p>
            </div>

            {/*  */}
            <div className="bg-before-white flex-1 py-2 text-left lg:text-center px-6 ml-0 lg:ml-10 rounded-xl overflow-hidden">
              <div>
                <p className=" leading-relaxed text-white">
                  Hợp mệnh nam: {listPredict.data?.zodiac.suitableMale}
                </p>
                <p className=" leading-relaxed text-white">
                  Hợp mệnh nữ: {listPredict.data?.zodiac.suitableFemale}
                </p>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="">
            <div className="bg-before-white w-full">
              <p className="leading-relaxed text-white whitespace-pre-wrap text-justify">
                <div
                  className=" self-center text-[18px] uppercase font-bold lg:text-left text-center mb-2"
                  style={{
                    color: `${user.get_customer?.zodiac.color_web_second}`,
                  }}
                >
                  Tổng quan
                </div>
                <span className="inline-block">
                  {listPredict.data?.zodiac.general_features}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-between flex-col lg:flex-row">
            <div className="bg-before-white lg:w-1/2 w-full ml-0">
              <p className="lg:mb-8 leading-relaxed text-white whitespace-pre-wrap text-justify">
                <div
                  className="self-center text-[18px] uppercase font-bold lg:text-left text-center mb-2"
                  style={{
                    color: `${user.get_customer?.zodiac.color_web_second}`,
                  }}
                >
                  Điểm mạnh
                </div>
                <span className="inline-block">
                  {listPredict.data?.zodiac.strengths_in_character}
                </span>
              </p>
            </div>
            <div className="bg-before-white lg:w-1/2 w-full ml-0 lg:ml-10">
              <p className="lg:mb-8 leading-relaxed text-white whitespace-pre-wrap text-justify">
                <div
                  className="self-center text-[18px] uppercase font-bold lg:text-left text-center mb-2"
                  style={{
                    color: `${user.get_customer?.zodiac.color_web_second}`,
                  }}
                >
                  Điểm yếu
                </div>
                <span className="inline-block">
                  {listPredict.data?.zodiac.weakness_in_character}
                </span>
              </p>
            </div>
          </div>

          <div>
            <div className="bg-before-white w-full">
              <p className="lg:mb-8 leading-relaxed text-white whitespace-pre-wrap leading-6 text-justify">
                <div
                  className="self-center text-[18px] uppercase font-bold lg:text-left text-center mb-2"
                  style={{
                    color: `${user.get_customer?.zodiac.color_web_second}`,
                  }}
                >
                  Cá tính
                </div>
                <span className="inline-block">
                  Cá tính nam : {listPredict.data?.zodiac.personalityMale}{" "}
                  <br />
                  Cá tính nữ : {listPredict.data?.zodiac.personalityFemale}
                </span>
              </p>
            </div>
          </div>

          <div>
            <div className="bg-before-white w-full">
              <p className="lg:mb-8 leading-relaxed text-white whitespace-pre-wrap text-justify">
                <div
                  className="self-center text-[18px] uppercase font-bold lg:text-left text-center mb-2"
                  style={{
                    color: `${user.get_customer?.zodiac.color_web_second}`,
                  }}
                >
                  Công việc
                </div>
                <span className="inline-block">
                  {listPredict.data?.zodiac.career}
                </span>
              </p>
            </div>
          </div>
          <div>
            <div className="bg-before-white w-full">
              <p className="lg:mb-8 leading-relaxed text-white whitespace-pre-wrap text-justify">
                <div
                  className="self-center text-[18px] uppercase font-bold lg:text-left text-center mb-2"
                  style={{
                    color: `${user.get_customer?.zodiac.color_web_second}`,
                  }}
                >
                  Sức khỏe
                </div>
                <span className="inline-block">
                  {listPredict.data?.zodiac.health}
                </span>
              </p>
            </div>
          </div>

          <div>
            <div className="bg-before-white w-full">
              <p className="lg:mb-8 leading-relaxed text-white whitespace-pre-wrap text-justify">
                <div
                  className="self-center text-[18px] uppercase font-bold lg:text-left text-center mb-2"
                  style={{
                    color: `${user.get_customer?.zodiac.color_web_second}`,
                  }}
                >
                  Sự đồng cảm
                </div>
                <span className="inline-block">
                  {listPredict.data?.zodiac.affection}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};
export default ZodiacViewManager;
