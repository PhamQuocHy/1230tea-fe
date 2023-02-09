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
      className="container relative mx-auto flex md:flex-row flex-col items-center rounded-2xl"
      style={{
        background: `linear-gradient(323deg,  ${listPredict.data?.zodiac.color_web_first}
        0%, ${listPredict.data?.zodiac.color_web_second} 99%)`,
      }}
    >
      <div className="w-full h-full absolute grid place-items-center auto-cols-fr auto-rows-fr">
        <img
          className="w-1/4 invert blur-[0px] opacity-[20%]"
          alt="hero"
          src="https://nhansohocvn.com/images/moon-inverse1.webp"
        />
      </div>

      <div
        className="lg:flex-grow z-10 w-full h-full lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-center items-center text-center shadow-2xl rounded-2xl p-10
      bg-white bg-opacity-10
      "
      >
        <Text
          style={{
            color: "#fff",
            textShadow: "0px 0px 10px #fcba03",
          }}
        >
          <h1
            className="title-font mb-2 font-medium text-Libra
        text-8xl text-center text-shadow-2xl
        "
          >
            SỐ {listPredict.data?.numberology}
          </h1>
        </Text>

        <p className="mb-8 leading-relaxed text-white">
          Tổng quan : {listPredict.data?.twelve_numerology.summary}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Nổi bật : {listPredict.data?.twelve_numerology.salient_features}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Cần thay đổi- cố gắng :{" "}
          {listPredict.data?.twelve_numerology.need_to_change}
        </p>
        <p className="mb-8 leading-relaxed text-white">
          Hướng phát triển : {listPredict.data?.twelve_numerology.development}
        </p>
      </div>
    </div>
  );
};
export default NumerologyViewManager;
