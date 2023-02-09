import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography, Row, Spin } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Proptypes from "prop-types";

import "./style.scss";

const { Text } = Typography;

interface LoginFormProps {
  handleSubmit: (values: any) => void;
  loading: any;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, loading }) => {
  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    handleSubmit(values);
  };

  return (
    <Spin spinning={loading}>
      <Form
        size="large"
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        layout={"vertical"}
        className="flex flex-col px-1 md:px-12"
      >
        <Form.Item
          className=""
          label={
            <div className="text-OnBackgroundLight text-md">Số điện thoại</div>
          }
          colon={false}
          required={false}
          name="phone"
          initialValue={"0389606380"}
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
          <Input prefix={<UserOutlined />} placeholder={"Số điện thoại"} />
        </Form.Item>

        <Form.Item
          className="mt-1"
          name="password"
          required={false}
          label={<div className="text-OnBackgroundLight text-md">Mật khẩu</div>}
          rules={[
            {
              required: true,
              whitespace: true,
              message: (
                <div className="text-ErrorLight text-md">
                  Vui lòng nhập mật khẩu
                </div>
              ),
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={"Mật khẩu"} />
        </Form.Item>

        <div className={"flex flex-row justify-end mb-7 mt-1"}>
          <Link to={"/forgot-password"} className={"mr-2"}>
            Quên mật khẩu?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="bg-gradient-to-br from-primary60 to-primary20 border-0 border-primary60 text-OnTertiaryLight"
            block
          >
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => navigate("/register")}
            className="text-PrimaryLight border-PrimaryContainerLight border-2 bg-BackgroundLight"
            block
          >
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

LoginForm.propTypes = {
  loading: Proptypes.bool,
};

export default LoginForm;
