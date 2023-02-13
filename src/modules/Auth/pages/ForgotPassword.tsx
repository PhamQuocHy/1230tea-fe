import { AsyncThunk } from "@reduxjs/toolkit";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NoticationView } from "../../../utils/NotificationView";
import { ForgotPasswordApi } from "../AuthApi";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    if (response.message) {
      NoticationView(response.result, "Thông báo", response.message);
    }
  }, [response]);

  const handleForgotPassword = async (phone: String) => {
    const data = {
      phone: phone,
    };

    const dispatchResponse: any = await dispatch(ForgotPasswordApi(data));
    const payload = dispatchResponse.payload;
    setResponse((prev: Object) => dispatchResponse.payload);
    if (payload.result) {
      navigate("/forgot-password/otp", {
        state: { phone: phone, register: false },
      });
    }
  };

  return (
    <Card
      style={{ borderRadius: 15 }}
      className="w-10/12 md:w-1/2 xl:w-2/5 2xl:w-4/12 inset-0 self-center mt-24 md:mt-40 object-center Fg-pass"
    >
      <div className={"text-center mb-5"}>
        <img
          alt="Logo công ty"
          src="../../image/logo-form.png"
          className="w-1/3 md:w-1/4"
        />
      </div>

      <div className={"flex flex-row flex-wrap justify-center mb-7"}>
        <div className="1xl:text-3xl text-xl text-center font-bold w-96">
          Vui lòng nhập số điện thoại của bạn để xác lập lại mật khẩu
        </div>
      </div>
      <ForgotPasswordForm handleForgotPassword={handleForgotPassword} />
    </Card>
  );
};

export default ForgotPassword;
