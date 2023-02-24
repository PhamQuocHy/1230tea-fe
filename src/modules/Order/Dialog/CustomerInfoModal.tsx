import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import React from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (values: Object) => void;
};

const CustomerInfoModal = (props: Props) => {
  const user = useAppSelector(
    (state: RootState) => state.rootReducer.auth.user
  );

  return (
    <Modal
      title={
        <div
          style={{
            backgroundColor: user?.get_customer?.zodiac?.color_web_first,
            color: user?.get_customer?.zodiac?.color_web_second,
          }}
          className="text-xl py-2 px-4 font-semibold uppercase"
        >
          {"Thông tin giao hàng"}
        </div>
      }
      footer={null}
      open={props.isOpen}
      onCancel={() => {
        props.handleClose();
      }}
      onOk={() => {
        props.handleClose();
      }}
      width={window.innerWidth <= 760 ? "100%" : "38%"}
    >
      <Form
        size="large"
        name="register-form"
        initialValues={{
          name: user.name ?? "",
          phone: user.phone ?? "",
          birthday: user.get_customer
            ? moment(user.get_customer.birthday, "DD/MM/YYYY")
            : "",
          address: user.get_customer ? user.get_customer.address : "",
        }}
        onFinish={props.handleSubmit}
        layout={"vertical"}
        className="flex flex-col px-0 md:px-12 py-5 h-[80vh] overflow-y-auto"
      >
        <Form.Item
          className=""
          label={
            <div className="text-OnBackgroundLight text-md">Số điện thoại</div>
          }
          colon={false}
          required={false}
          name="phone"
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
            disabled={false}
            prefix={<PhoneOutlined />}
            placeholder={"Số điện thoại"}
          />
        </Form.Item>

        <Form.Item
          name={"name"}
          required={false}
          label={
            <div className="text-OnBackgroundLight text-md">Họ và tên</div>
          }
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
          label={
            <div className="text-OnBackgroundLight text-md">Sinh nhật</div>
          }
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

        <Form.Item
          name={"address"}
          required={false}
          label={<div className="text-OnBackgroundLight text-md">Địa chỉ</div>}
          rules={[
            {
              required: true,
              message: (
                <div className="text-ErrorLight text-md">
                  Vui lòng nhập địa chỉ
                </div>
              ),
            },
          ]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>

        <Form.Item
          name={"name"}
          style={{ marginTop: -15, fontWeight: 600 }}
          required={false}
          label={
            <div className="text-OnBackgroundLight text-md">Họ và tên</div>
          }
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
          style={{ marginTop: -15, fontWeight: 600 }}
          required={false}
          label={
            <div className="text-OnBackgroundLight text-md">Sinh nhật</div>
          }
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
        <Form.Item
          name={"city"}
          style={{ marginTop: -15, fontWeight: 600 }}
          required={false}
          label={
            <div className="text-OnBackgroundLight text-md">
              Tỉnh / Thành phố
            </div>
          }
          rules={[
            {
              required: true,
              message: (
                <div className="text-ErrorLight text-md">
                  Vui lòng chọn tỉnh thành phố
                </div>
              ),
            },
          ]}
        >
          <Select placeholder="--Chọn tỉnh thành phố--">
            <Select.Option value="2">Chọn tỉnh thành phố</Select.Option>
            <Select.Option value="1">Chọn tỉnh thành phố</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"district"}
          style={{ marginTop: -15, fontWeight: 600 }}
          required={false}
          label={
            <div className="text-OnBackgroundLight text-md">Quận / Huyện</div>
          }
          rules={[
            {
              required: true,
              message: (
                <div className="text-ErrorLight text-md">
                  Vui lòng chọn quận huyện
                </div>
              ),
            },
          ]}
        >
          <Select placeholder="--Chọn quận huyện--">
            <Select.Option value="2">Chọn tỉnh thành phố</Select.Option>
            <Select.Option value="1">Chọn tỉnh thành phố</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"district"}
          style={{ marginTop: -15, fontWeight: 600 }}
          required={false}
          label={
            <div className="text-OnBackgroundLight text-md">
              Phường, Xã / Thị trấn
            </div>
          }
          rules={[
            {
              required: true,
              message: (
                <div className="text-ErrorLight text-md">
                  Vui lòng chọn phường xã, thị trấn
                </div>
              ),
            },
          ]}
        >
          <Select placeholder="--Chọn phường xã thị trấn--">
            <Select.Option value="2">Chọn tỉnh thành phố</Select.Option>
            <Select.Option value="1">Chọn tỉnh thành phố</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"address"}
          style={{ marginTop: -15, fontWeight: 600 }}
          required={false}
          label={
            <div className="text-OnBackgroundLight text-md">Địa chỉ cụ thể</div>
          }
          rules={[
            {
              required: true,
              message: (
                <div className="text-ErrorLight text-md">
                  Vui lòng nhập địa chỉ
                </div>
              ),
            },
          ]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>

        <div>
          <div className="flex flex-row items-center pb-4">
            <div className="text-xl font-semibold">Ghi chú</div>
            <div className="grow"></div>
          </div>
          <div>
            <Form.Item name={"note"}>
              <TextArea rows={4} />
            </Form.Item>
          </div>
        </div>

        <div className="flex flex-row w-full justify-center mt-10">
          <button
            type="submit"
            style={{
              backgroundColor: user?.get_customer?.zodiac?.color_web_first,
              color: user?.get_customer?.zodiac?.color_web_second,
            }}
            className="w-2/3 text-lg font-semibold cursor-pointer hover:opacity-80 border-none rounded-lg px-4 py-2 "
          >
            Đặt hàng
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerInfoModal;
