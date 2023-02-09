import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

type Props = {
  handleRegister: (values: Object) => void;
  phone: String;
};

const RegisterForm = (props: Props) => {
  const onSubmit = (values: any) => {
    console.log(values);
    props.handleRegister(values);
  };

  return (
    <Form
      size="large"
      name="register-form"
      initialValues={{ phone: props.phone }}
      onFinish={onSubmit}
      layout={"vertical"}
      className="flex flex-col px-0 md:px-12"
    >
      {" "}
      <div className={"flex flex-row flex-wrap justify-start mb-5"}>
        <div className="text-2xl text-left font-bold">Thông tin tài khoản</div>
      </div>
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
        <Input
          disabled={true}
          prefix={<UserOutlined />}
          placeholder={"Số điện thoại"}
        />
      </Form.Item>
      <Form.Item
        className=""
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
      <Form.Item
        className=""
        name="confirm-password"
        required={false}
        hasFeedback
        dependencies={["confirm_password"]}
        label={
          <div className="text-OnBackgroundLight text-md">
            Nhập lại mật khẩu
          </div>
        }
        rules={[
          {
            required: true,
            message: (
              <div className="text-ErrorLight text-md">
                Vui lòng nhập lại mật khẩu
              </div>
            ),
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Mật khẩu chưa khớp, vui lòng nhập lại");
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder={"Nhập lại mật khẩu"}
        />
      </Form.Item>
      <div className={"flex flex-row flex-wrap justify-start mt-3 mb-5"}>
        <div className="text-2xl text-left font-bold">Thông tin cá nhân</div>
      </div>
      <Form.Item
        name={"name"}
        required={false}
        label={<div className="text-OnBackgroundLight text-md">Họ và tên</div>}
        rules={[
          {
            required: true,
            message: (
              <div className="text-ErrorLight text-md">
                Vui lòng nhập họ và tên
              </div>
            ),
          },
        ]}
      >
        <Input placeholder="Họ và tên" />
      </Form.Item>
      <Form.Item
        className=""
        name="birthday"
        required={false}
        label={<div className="text-OnBackgroundLight text-md">Sinh nhật</div>}
        rules={[
          {
            required: true,
            message: (
              <div className="text-ErrorLight text-md">
                Vui lòng nhập sinh nhật
              </div>
            ),
          },
        ]}
      >
        <DatePicker
          className="w-full"
          locale={locale}
          format="DD/MM/YYYY"
          placeholder={"Sinh nhật"}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-gradient-to-br from-primary60 to-primary20 border-0 border-primary60 text-OnTertiaryLight "
          block
        >
          Đăng kí
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
