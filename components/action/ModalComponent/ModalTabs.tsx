import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Tabs } from "antd";
import InputView from "../InputView/InputView";
const { TabPane } = Tabs;
interface ModalComponentProps {
  title: string;
  openModal: boolean;
  closeModal: () => void;
  data: any;
  submitModal: (action: any, floor: any, name: string) => void;
  action: string;
}

const ModalTabs: React.FC<ModalComponentProps> = ({
  title,
  openModal,
  closeModal,
  data,
  submitModal,
  action,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(
      "🚀 ~ file: ModalComponentFloor.tsx ~ line 29 ~ onFinish ~ values",
      values
    );
    console.log("Success:", values);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: data.name,
    });
  });

  return (
    <Modal
      title={title}
      visible={openModal}
      onOk={() => submitModal(action, data, form.getFieldValue("name"))}
      onCancel={() => closeModal()}
      okText="Đồng ý"
      cancelText="Hủy"
    >
      <Form form={form} name={"basic"} onFinish={onFinish} initialValues={data}>
        <Form.Item
          label={"*Loại khách hàng:"}
          labelAlign={"left"}
          colon={false}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên khách",
            },
          ]}
        >
          <p></p>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Khách lẻ" key="1">
              {" "}
              <Input />{" "}
            </TabPane>
            <TabPane tab="Khách công ty" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalTabs;
