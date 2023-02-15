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
  console.log("user", user);

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
      console.log("resultPredict", resultPredict);
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
        background: `linear-gradient(323deg,  ${listPredict.data?.zodiac.color_web_first}
        0%, ${listPredict.data?.zodiac.color_web_second} 99%)`,
      }}
    >
      <div className="w-full h-full absolute grid place-items-center auto-cols-fr auto-rows-fr">
        <img
          className="w-1/2 invert blur-[0px] opacity-[15%]"
          alt="hero"
          src={`../../../image/zodiac/${listPredict.data?.zodiac_id}.png`}
        />
      </div>
      <div
        className="z-10 w-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center  shadow-2xl  p-10
      bg-white bg-opacity-10
      "
      >
        {" "}
        <Text
          style={{
            color: "#fff",
            textShadow: "0px 0px 10px #fcba03",
          }}
        >
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-Libra">
            {listPredict.data?.zodiac.name} /{" "}
            {listPredict.data?.zodiac.name_second} /
            {listPredict.data?.zodiac.codeName}
          </h1>
        </Text>
        <p className="mb-8 leading-relaxed text-white">
          Màu sắc: {listPredict.data?.zodiac.favColorName}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Biểu tượng: {listPredict.data?.zodiac.icon}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Hành tinh: {listPredict.data?.zodiac.star_of_destiny}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Màu may mắn: {listPredict.data?.zodiac.color_lucky}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Đá quí: {listPredict.data?.zodiac.gemVN}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Thần bảo hộ: {listPredict.data?.zodiac.protector}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Hợp mệnh nam: {listPredict.data?.zodiac.suitableMale}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Hợp mệnh nữ: {listPredict.data?.zodiac.suitableFemale}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Tổng quan: {listPredict.data?.zodiac.general_features}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Điểm mạnh: {listPredict.data?.zodiac.strengths_in_character}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Điểm yếu: {listPredict.data?.zodiac.weakness_in_character}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Cá tính nam : {listPredict.data?.zodiac.personalityMale}, Cá tính nữ :{" "}
          {listPredict.data?.zodiac.personalityFemale}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Công việc : {listPredict.data?.zodiac.career}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Sức khỏe : {listPredict.data?.zodiac.health}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Sự đồng cảm : {listPredict.data?.zodiac.affection}
        </p>
      </div>
    </div>
  );
};
export default ZodiacViewManager;
