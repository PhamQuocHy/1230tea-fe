import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { NoticationView } from "../../../utils/NotificationView";
import { VerifyOtpApi } from "../AuthApi";
import OTPField from "../components/OTPField";

type Props = {};

const OtpVerify = (props: Props) => {
  const dispatch = useDispatch();
  const locationState = useLocation().state;
  const navigate = useNavigate();

  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    if (response.message) {
      NoticationView(response.result, "Thông báo", response.message);
    }
  }, [response]);

  const _handleVerifyOtp = async (otp: String) => {
    const data = {
      otp: otp,
      phone: locationState.phone,
    };

    const dispatchResponse: any = await dispatch(VerifyOtpApi(data));
    const payload = dispatchResponse.payload;
    setResponse((prev: Object) => dispatchResponse.payload);
    if (payload.result) {
      locationState.register
        ? navigate("/", {
            state: { phone: locationState.phone },
          })
        : navigate("/forgot-password/reset", {
            state: { phone: locationState.phone },
          });
    }
  };

  return (
    <Card
      style={{ borderRadius: 15 }}
      className="w-10/12 md:w-1/2 xl:w-2/5 2xl:w-4/12 inset-0 self-center mt-24 md:mt-40 object-center otp"
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
          Vui lòng nhập mã otp đã được gửi vào điện thoại của bạn
        </div>
      </div>
      <OTPField handleVerifyOtp={_handleVerifyOtp} />
    </Card>
  );
};

export default OtpVerify;
