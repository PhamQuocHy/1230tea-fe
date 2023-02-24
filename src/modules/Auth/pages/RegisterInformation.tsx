import { Card } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { NoticationView } from "../../../utils/NotificationView";
import { RegisterWebApi } from "../AuthApi";
import RegisterForm from "../components/RegisterForm";

type Props = {};

type RegisterData = {
  phone: String;
  password: String;
  name: String;
  birthday: String;
};

const RegisterInformation = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    if (response.message) {
      NoticationView(response.result, "Thông báo", response.message);
    }
  }, [response]);

  const handleRegister = async (values: any) => {
    const data: RegisterData = {
      phone: values.phone,
      password: values.password,
      name: values.name,
      birthday: moment(values.birthday).format("yyyy-MM-DD"),
    };

    const dispatchResponse: any = await dispatch(RegisterWebApi(data));
    const payload = dispatchResponse.payload;
    setResponse((prev: Object) => dispatchResponse.payload);
    if (payload.result) {
      navigate("/register/otp", {
        state: { phone: values.phone, register: true },
      });
    }
  };

  return (
    <Card
      style={{ borderRadius: 15 }}
      className="w-11/12 md:w-1/2 my-10 xl:w-2/5 2xl:w-4/12 inset-0 self-center object-center"
    >
      <div className={"text-center mb-5"}>
        <img
          alt="Logo công ty"
          src="../../image/logo-form.png"
          className="w-1/3 md:w-1/4"
        />
      </div>

      <RegisterForm
        handleRegister={handleRegister}
        phone={locationState.phone}
      />
    </Card>
  );
};

export default RegisterInformation;
