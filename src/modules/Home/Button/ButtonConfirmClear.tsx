import React, { useState } from "react";
import { Popconfirm, Button } from "antd";

import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../redux/hook";
 
import { NoticationView } from "../../../utils/NotificationView";

interface ButtonConfirmClearProp {
  room: any;
  onConfirm: () => void;
  visible: boolean;
  closeProps: () => void;
  handleClearRoom: (idRoom: any) => void
}

const ButtonConfirmClear: React.FC<ButtonConfirmClearProp> = ({
  room,
  onConfirm,
  closeProps,
  visible,
  handleClearRoom
}) => {

  return (
    <Popconfirm
      title="Bạn có chắc chuyển trạng thái phòng này thành phòng trống?"
      onConfirm={() => handleClearRoom(room.id)}
      onCancel={() => closeProps()}
      visible={visible}
      okText="Đồng ý"
      cancelText="Không"
    >
      <Button type="link" onClick={onConfirm}>
        Chuyển thành phòng trống
      </Button>
    </Popconfirm>
  );
};

export default ButtonConfirmClear;
