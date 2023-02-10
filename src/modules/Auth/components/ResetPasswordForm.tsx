import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  handleResetPassword: (password: string) => void;
};

const ResetPasswordForm = (props: Props) => {
  return (
    <Form
      size="large"
      initialValues={{ remember: true }}
      onFinish={(value) => {
        console.log(value);
        props.handleResetPassword(value.password);
      }}
      layout={"vertical"}
      className="flex flex-col px-1 md:px-12  "
    >
      <Form.Item
        label={<div className="text-OnBackgroundLight text-md">Mật khẩu</div>}
        required={false}
        colon={false}
        name={"password"}
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Nhâp mật khẩu"
          // iconRender={(visible) =>
          //   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          // }
          visibilityToggle={true}
        />
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
            message: "Vui lòng xác nhận mật khẩu!",
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

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="bg-color1230  text-OnTertiaryLight mt-5"
          block
        >
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
