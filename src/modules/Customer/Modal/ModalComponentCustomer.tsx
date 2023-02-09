import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Select } from "antd";

import { statusCoSo, stringAlways } from "../../../utils/contanst";

interface ModalComponentProps {
  title: string;
  openModal: boolean;
  closeModal: () => void;
  data: any;
  submitModal: (action: any, Customer: any, name: string) => void;
  action: string;
}

const ModalComponentCustomer: React.FC<ModalComponentProps> = ({
  title,
  openModal,
  closeModal,
  data,
  submitModal,
  action,
}) => {
  //form set get value
  const [form] = Form.useForm();

  //value
  const init = {
    name: action === stringAlways.add ? "" : data.name,
    describe: action === stringAlways.add ? "" : data.describe,
    status: action === stringAlways.add ? 1 : data.status,
  };

  useEffect(() => {
    form.setFieldsValue(init);
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
      onOk={() => _handFinish()}
      onCancel={() => closeModal()}
      okText={action === stringAlways.add ? stringAlways.edit : "Cập nhật"}
      cancelText={stringAlways.cancel}
    >
      <Form form={form} name={"basic"} initialValues={data} layout={"vertical"}>
        <Form.Item
          label={"Tầng"}
          labelAlign={"left"}
          colon={false}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tầng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Mô tả"}
          labelAlign={"left"}
          colon={false}
          name={"describe"}
        >
          <Input.TextArea rows={4} placeholder={"Mô tả"} />
        </Form.Item>

        <Form.Item
          label={"Trạng thái"}
          labelAlign={"left"}
          colon={false}
          name={"status"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn trạng thái cho tầng",
            },
          ]}
        >
          <Select
            allowClear
            disabled={action === stringAlways.add ? true : false}
          >
            {statusCoSo.map((item) => {
              return (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponentCustomer;
