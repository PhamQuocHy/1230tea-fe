import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { NoticationView } from "../../../utils/NotificationView";
import {
  CheckPhoneApi,
  ForgotPasswordApi,
  NewOtpApi,
  NewPasswordApi,
} from "../AuthApi";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

type Props = {};

const RegisterPhone = (props: Props) => {
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

    const dispatchResponse: any = await dispatch(CheckPhoneApi(data));
    const payload = dispatchResponse.payload;
    setResponse((prev: Object) => dispatchResponse.payload);
    if (payload.result && payload.status === 1) {
      navigate("/register/information", {
        state: { phone: phone, register: true },
      });
    } else if (payload.result && payload.status === 2) {
      // navigate("/register/otp", { state: { phone: phone, register: true } });
    }
  };

  return (
    <Card
      style={{ borderRadius: 10}}
      className="w-10/12 md:w-1/2 xl:w-2/5 2xl:w-4/12 inset-0 self-center mt-24 md:mt-40 object-center quochy"
    >
      <div className={"text-center mb-5"}>
        <img
          alt="Logo công ty"
          src="../../image/logo-form.png"
          className="w-1/3 md:w-1/4"
        />
      </div>

      <div className={"flex flex-row flex-wrap justify-center mb-7"}>
        <div className=" 1xl:text-3xl text-xl text-center w-96 font-semibold">
          Vui lòng nhập số điện thoại của bạn để đăng kí
        </div>
      </div>
      <ForgotPasswordForm handleForgotPassword={handleForgotPassword} />
    </Card>
  );
};

export default RegisterPhone;
