import { Col, Form, Input, Modal, Row, Select } from "antd";
import React from "react";
import Rules from "../../../constants/rules";
import { convertOptions } from "../../../utils";
import SelectCustomerType from "../SelectCustomerType";

const ModalForm = (props) => {
  const { form, isOpen, loading, genders, submited, countries, closedModal } =
    props;

  return (
    <Modal
      maskClosable={false}
      visible={isOpen}
      title="Tạo mới"
      okText="Tạo mới"
      cancelText="Đóng"
      confirmLoading={loading}
      onCancel={closedModal}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            submited(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form layout="vertical" form={form} name="customerForm">
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Form.Item
              label="Loại khách hàng"
              name="customer_type_id"
              rules={[Rules[0]]}
            >
              <SelectCustomerType innerProps={{ formOuter: form }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Form.Item name="name" label="Họ và tên" rules={[Rules[0]]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Form.Item
              name="identity"
              label="CMND/ Số căn cước"
              rules={[Rules[0]]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Form.Item label="Điện thoại" name="phone" rules={[Rules[0]]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Form.Item label="Giới tính" name="gender" rules={[Rules[0]]}>
              <Select options={convertOptions(genders)} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Form.Item label="Quốc tịch" name="nationality" rules={[Rules[0]]}>
              <Select options={convertOptions(countries)} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalForm;
