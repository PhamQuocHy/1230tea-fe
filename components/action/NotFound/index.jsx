import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = ({ onMenuClick, onSidebarChange }) => {
  const onClick = () => {
    onMenuClick({ name: "Trang chủ", path: "/" });
    onSidebarChange({
      key: "0",
      keyPath: ["0"],
    });
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn vừa tìm hiện không có."
      extra={
        <Button type="primary">
          <Link to="/" onClick={onClick}>
            Về trang chủ
          </Link>
        </Button>
      }
    />
  );
};

export default NotFound;
