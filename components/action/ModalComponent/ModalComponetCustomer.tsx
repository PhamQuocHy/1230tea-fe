import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Select, InputNumber, DatePicker } from "antd";
import InputView from "../InputView/InputView";
import { useAppSelector } from "../../../redux/hook";
import moment from "moment";

interface ModalComponentProps {
  title: string;
  openModal: boolean;
  closeModal: () => void;
  data: any;
  submitModal: (action: any, brand: any, addBrand: any) => void;
  action: string;
}

const { Option } = Select;
const { TextArea } = Input;
const RangePicker: any = DatePicker.RangePicker;

const ModalComponetCustomer: React.FC<ModalComponentProps> = ({
  title,
  openModal,
  closeModal,
  data,
  submitModal,
  action,
}) => {
  const listCustomer = useAppSelector((state) => state.customer.listCustomer);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: data.name,
      type: data.type,
      company: data.company,
      phone: data.phone,
    });
  });

  return (
    <Modal
      title={title}
      visible={openModal}
      onOk={() => submitModal(action, data, form.getFieldsValue())}
      onCancel={() => closeModal()}
      okText={action === "add" ? "Thêm" : "Cập nhật"}
      cancelText="Hủy"
    >
      <Form form={form} name={"basic"} initialValues={data} layout={"vertical"}>
        <Form.Item
          label={"Tên khách"}
          labelAlign={"left"}
          colon={false}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên khách hàng",
            },
          ]}
        >
          {/* <Select allowClear labelInValue={true}>
            {listOrderService.map((itemOrderService: any) => {
              return (
                <Option value={itemOrderService.name} key={itemOrderService.id}>
                  {itemOrderService.name}
                </Option>
              );
            })}
          </Select> */}
        </Form.Item>
        <Form.Item
          label={"Loại khách hàng"}
          labelAlign={"left"}
          colon={false}
          name={"type"}
          rules={[
            {
              required: true,
              message: "Vui lòng loại khách hàng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Giá trị (VNĐ)"}
          labelAlign={"left"}
          colon={false}
          name={"company"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn công ty",
            },
          ]}
        >
          {/* <InputNumber
            style={{
              width: "100%",
            }}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          /> */}
        </Form.Item>

        <Form.Item
          label={"Số lượng"}
          labelAlign={"left"}
          colon={false}
          name={"quantity"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhập số lượng giảm giá",
            },
          ]}
        >
          <Input type={"number"} />
        </Form.Item>

        <Form.Item
          label={"Thời gian hiệu lực"}
          labelAlign={"left"}
          colon={false}
          name={"date"}
        >
          <RangePicker
            defaultValue={[
              moment(form.getFieldValue("time_start")),
              moment(form.getFieldValue("time_end")),
            ]}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponetCustomer;
