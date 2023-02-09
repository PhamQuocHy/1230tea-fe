import {
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Divider,
  Button,
  Checkbox,
} from "antd";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import "./style.scss";
import { PlusOutlined } from "@ant-design/icons";

const ModalForm = (props) => {
  const {
    isOpen,
    closedModal,
    form,
    loading,
    submited,
    id,
    formItems,
    onValuesChange,
    onOpenSelectAdd,
  } = props;

  const dateFormat = "DD/MM/YYYY";
  const dateTimeFormat = "DD/MM/YYYY HH:mm:ss";

  const onModalAdd = (type) => {
    onOpenSelectAdd(type);
  };
  const getFields = () => {
    let xhtml = null;

    xhtml = formItems.map((formItem) => {
      return (
        <Col span={24} key={formItem.key}>
          {formItem.type === "input" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
            >
              <Input disabled={formItem.disabled} />
            </Form.Item>
          )}
          {formItem.type === "number" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
            >
              <NumberFormat
                customInput={Input}
                thousandSeparator
                disabled={formItem.disabled}
              />
            </Form.Item>
          )}
          {formItem.type === "password" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
              dependencies={formItem.dependencies}
            >
              <Input.Password disabled={formItem.disabled} />
            </Form.Item>
          )}
          {formItem.type === "select" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
              initialValue={formItem.defaultValue}
            >
              <Select
                options={formItem.data}
                allowClear
                disabled={formItem.disabled}
              />
            </Form.Item>
          )}
          {formItem.type === "select-add" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
            >
              <Select
                disabled={formItem.disabled}
                allowClear
                options={formItem.data}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider className="my-1" />
                    <div className="select-add__wrapper">
                      <Button
                        type="link"
                        className="select-add__btn"
                        onClick={() => onModalAdd(formItem.key)}
                      >
                        <PlusOutlined /> Thêm mới
                      </Button>
                    </div>
                  </div>
                )}
              ></Select>
            </Form.Item>
          )}
          {formItem.type === "select-multi" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
            >
              <Select
                options={formItem.data}
                allowClear
                mode="multiple"
                disabled={formItem.disabled}
              />
            </Form.Item>
          )}
          {formItem.type === "date" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
            >
              <DatePicker
                className="w-100"
                format={dateFormat}
                disabled={formItem.disabled}
              />
            </Form.Item>
          )}
          {formItem.type === "date-range" && (
            <Form.Item
              name={formItem.key}
              label={formItem.label}
              rules={formItem.rules}
            >
              <DatePicker.RangePicker
                className="w-100"
                format={formItem.showTime ? dateTimeFormat : dateFormat}
                showTime={formItem.showTime}
                disabled={formItem.disabled}
              />
            </Form.Item>
          )}
          {formItem.type === "checkbox" && (
            <Form.Item
              name={formItem.key}
              rules={formItem.rules}
              valuePropName="checked"
            >
              <Checkbox disabled={formItem.disabled}>{formItem.label}</Checkbox>
            </Form.Item>
          )}
        </Col>
      );
    });
    return xhtml;
  };

  return (
    <Modal
      maskClosable={false}
      visible={isOpen}
      title={id ? "Chi tiết" : "Tạo mới"}
      okText={id ? "Xác nhận" : "Tạo mới"}
      cancelText="Đóng"
      confirmLoading={loading}
      centered
      onCancel={closedModal}
      onOk={(arr) => {
        form
          .validateFields()
          .then((values) => {
            if (id) {
              values.id = id;
              submited(values, arr);
            } else {
              submited(values, arr);
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        layout="vertical"
        form={form}
        name="actionForm"
        onValuesChange={onValuesChange}
      >
        <Row gutter={24}>{getFields()}</Row>
      </Form>
    </Modal>
  );
};

ModalForm.propTypes = {
  formItems: PropTypes.array,
};

ModalForm.defaultProps = {
  formItems: [],
};

export default ModalForm;
