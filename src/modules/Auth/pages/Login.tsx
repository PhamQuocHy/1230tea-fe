import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Card, Layout as div, Typography } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { HomeOutlined } from "@ant-design/icons";
import LoginForm from "../components/LoginForm";
import { userLogin } from "../LoginApi";
import "./style.scss";
import logo from "../../../image/logo.png";

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const token = useAppSelector((state) => state.login.token);

  const loading = useAppSelector((state) => state.loading.loading);

  async function handleSubmit(values: any) {
    const result = await dispatch(
      userLogin({
        phone: values.phone ?? null,
        password: values.password ? values.password : null,
        type_account: 1,
      })
    );
    if (result.payload) {
      navigation("/index");
    }
  }

  return (
    <div
      className={
        "container min-w-full static bg-no-repeat bg-cover min-h-full bg-gradient-to-br from-Tertiary10 via-primary10 to-primary0 flex flex-col "
      }
    >
      <Card
        style={{ borderRadius: 15 }}
        className="w-11/12 md:w-1/2 xl:w-2/5 2xl:w-4/12 h-1/5 inset-0 self-center mt-24 md:mt-40 object-center"
      >
        <div className={"flex flex-row w-full mb-5 h-16"}>
          <div className="w-1/3 flex justify-start items-center">
            <Link to="/" className="pl-7">
              <HomeOutlined className="text-xl text-OnBackgroundLight" />
            </Link>
          </div>
          <div className="w-1/3 flex justify-center items-center">
            <img
              alt="Logo công ty"
              src="../../image/logo-form.png"
              className="h-full"
            />
          </div>
          <div className="w-1/3"></div>
        </div>

        <LoginForm handleSubmit={handleSubmit} loading={loading} />
      </Card>
    </div>
  );
};

export default Login;
