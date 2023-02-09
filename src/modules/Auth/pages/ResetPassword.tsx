import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { NoticationView } from "../../../utils/NotificationView";
import { NewPasswordApi } from "../AuthApi";
import ResetPasswordForm from "../components/ResetPasswordForm";

type Props = {};

const ResetPassword = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    if (response.message) {
      NoticationView(response.result, "Thông báo", response.message);
    }
  }, [response]);

  const handleResetPassword = async (password: String) => {
    const data = {
      phone: locationState.phone,
      password_new: password,
      password_new_again: password,
    };

    console.log(data);
    const dispatchResponse: any = await dispatch(NewPasswordApi(data));
    const payload = dispatchResponse.payload;
    setResponse((prev: Object) => dispatchResponse.payload);
    if (payload.result) {
      navigate("/");
    }
  };

  return (
    <Card
      style={{ borderRadius: 15 }}
      className="w-10/12 md:w-1/2 xl:w-2/5 2xl:w-4/12 inset-0 self-center mt-24 md:mt-40 object-center"
    >
      <div className={"text-center mb-5"}>
        <img
          alt="Logo công ty"
          src="../../image/text_logo.png"
          className="w-1/3 md:w-1/4"
        />
      </div>

      <div className={"flex flex-row flex-wrap justify-center mb-7"}>
        <div className="2xl:text-3xl text-xl text-center font-bold">
          Vui lòng nhập mật khẩu mới
        </div>
      </div>
      <ResetPasswordForm handleResetPassword={handleResetPassword} />
    </Card>
  );
};

export default ResetPassword;
