import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Select, InputNumber } from "antd";

import { useAppSelector } from "../../../redux/hook";

interface ModalComponentProps {
  title: string;
  openModal: boolean;
  closeModal: () => void;
  data: any;
  submitModal: (action: any, employee: any, addUnit: string) => void;
  action: string;
}

const { Option } = Select;
const ModalComponentPool: React.FC<ModalComponentProps> = ({
  title,
  openModal,
  closeModal,
  data,
  submitModal,
  action,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: data.name,
      describe: data.describe,
      price: data.price,
      status_id: data.status_id,
    });
  });

  function _handFinish() {
    try {
      form.validateFields().then((value) => {
        if (value) {
          submitModal(action, data, value);
        }
      });
    } catch (e: any) {
      console.log("values", e);
    }
  }
  return (
    <Modal
      title={title}
      visible={openModal}
      onOk={_handFinish}
      onCancel={() => closeModal()}
      okText={action === "add" ? "Thêm" : "Cập nhật"}
      cancelText="Hủy"
    >
      <Form
        form={form}
        name={"basic"}
        onFinish={onFinish}
        initialValues={data}
        layout={"vertical"}
      >
        <Form.Item
          label="Tên vé"
          name="name"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên loại",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá",
            },
          ]}
        >
          <InputNumber
            min={0}
            max={1000000}
            style={{ width: "100%" }}
            step={1000}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="status_id"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập trạng thái",
            },
          ]}
        >
          <Select
            placeholder="Chọn trạng thái"
            style={{ width: "100%" }}
            options={[
              { label: "Họat động", value: 1 },
              { label: "Ngừng hoạt động", value: 2 },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="describe"
          rules={[
            {
              required: false,
              message: "Vui lòng nhập mô tả",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponentPool;
