import { PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Interface } from "readline";
// import tailwindConfig from "../../../../tailwind.config";
// import resolveConfig from "tailwindcss/resolveConfig";

interface props {
  handleForgotPassword: (phone: String) => void;
}

const ForgotPasswordForm: React.FC<props> = ({ handleForgotPassword }) => {
  const navigate = useNavigate();
  // const [resolveConfig, setResolveConfig]: any = useState<any>();

  useState(() => {
    // setResolveConfig((prev: any) => resolveConfig(tailwindConfig));
  });

  return (
    <Form
      size="large"
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        handleForgotPassword(values.phone);
      }}
      layout={"horizontal"}
      className="flex flex-col px-1 md:px-12"
    >
      <Form.Item
        className="text-2xl"
        colon={false}
        required={false}
        name="phone"
        rules={[
          {
            required: true,

            whitespace: true,
            message: (
              <div className="text-ErrorLight text-md">
                Vui lòng nhập số điện thoại
              </div>
            ),
          },
        ]}
      >
        <Input
          size={"large"}
          prefix={
            <PhoneOutlined
              className={"text-gray-400 focus:text-PrimaryLight"}
            />
          }
          placeholder={"Số điện thoại"}
          maxLength={10}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className=" bg-gradient-to-br from-primary60 to-primary20 border-0 border-primary60 text-OnTertiaryLight"
          block
        >
          Tiếp theo
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          onClick={() => navigate("/login")}
          className="text-PrimaryLight border-PrimaryContainerLight border-2 bg-BackgroundLight"
          block
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
