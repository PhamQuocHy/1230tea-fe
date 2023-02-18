import React, { useEffect, useState } from "react";
import {
  Modal,
  Input,
  Form,
  Select,
  Descriptions,
  Avatar,
  List,
  Image,
} from "antd";

import { statusCoSo, stringAlways } from "../../../utils/contanst";
import { useAppSelector } from "../../../redux/hook";
import { BiBorderRadius } from "react-icons/bi";

interface ModalComponentProps {
  title: string;
  openModal: boolean;
  closeModal: () => void;
  data: any;
  submitModal: (action: any, Bill: any, name: string) => void;
  action: string;
}

const ModalComponentBill: React.FC<ModalComponentProps> = ({
  title,
  openModal,
  closeModal,
  data,
  submitModal,
  action,
}) => {
  const infoUser = useAppSelector((state) => state.rootReducer.auth.user);
  console.log("data: ", data);

  return (
    <>
      <Modal
        title={
          <div
            style={{
              backgroundColor: infoUser?.get_customer?.zodiac?.color_web_first,
              color: infoUser?.get_customer?.zodiac?.color_web_second,
            }}
            className="text-xl font-semibold py-2 px-4 uppercase"
          >
            Chi tiết đơn hàng
          </div>
        }
        visible={openModal}
        onCancel={() => closeModal()}
        okText={action === stringAlways.add ? stringAlways.edit : "Cập nhật"}
        //hide ok button
        footer={null}
        cancelText={stringAlways.cancel}
        width={900}
      >
        <Descriptions
          bordered
          column={{ xxl: 4, xl: 2, lg: 3, md: 3, sm: 2, xs: 1 }}
          style={{ borderRadius: "inherit" }}
        >
          <Descriptions.Item label="Mã hóa đơn:">
            <span style={{ color: "blue" }}>
              {" "}
              {data ? data.invoice?.code : ""}{" "}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Hoàn thành lúc:">
            {data ? data.invoice?.completed_at : ""}{" "}
          </Descriptions.Item>
          <Descriptions.Item label="Bởi nhân viên:">
            {data ? data.invoice?.customer_id : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng cộng:">
            {data ? data.invoice?.formatted_total : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Giảm giá:">
            {data ? data.invoice?.voucher_discount : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Thanh toán:">
            {data ? data.invoice?.payment_source_desc : ""}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Sản phẩm"> */}
          {/* <List
              itemLayout="horizontal"
              dataSource={data ? data.products : []}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={item.image_url}
                        style={{ width: 50, height: 50 }}
                      />
                    }
                    title={
                      <>
                        <b>{item.name}</b>
                        <br />
                        Số lượng: {item.quantity}
                      </>
                    }
                    description={item.formatted_price}
                  />
                </List.Item>
              )}
            /> */}
          {/* </Descriptions.Item> */}
        </Descriptions>
        <div
          style={{ borderRadius: "0 0 8px 8px", borderTop: "1px solid #ccc" }}
        >
          <div className="text-center py-3">
            <span className="text-[20px] font-medium leading-7">Sản phẩm</span>
          </div>
          <div className="px-6 py-4 max-h-[40vh] overflow-y-auto overflow-x-hidden">
            <div>
              {data?.products?.map((product: any) => (
                <div className="border-bls flex py-4">
                  <div className="w-[30%]">
                    <img
                      className="w-full object-cover rounded-lg h-[210px]"
                      src={product.image_url}
                      alt=""
                    />
                  </div>
                  <div className="w-[70%]">
                    <div className="px-6">
                      <div className="mb-2">
                        <h3 className="m-0 text-[18px] leading-6 font-semibold">
                          {product.name}
                        </h3>
                      </div>
                      <div className="text-base mb-1">
                        <span className="font-medium">Số lượng:</span>
                        <span>{product.quantity}</span>
                      </div>
                      <div className="text-base mb-1">
                        <span className="font-medium text-color-red">
                          {product.formatted_price} VNĐ
                        </span>
                      </div>
                      <div className="text-base">
                        <span className="font-medium">Món thêm:</span>
                        <div className="py-1 px-3">
                          <div className="flex items-center">
                            <span className="min-w-[150px] mr-4">
                              Trân châu x 1
                            </span>{" "}
                            <span>7,000VNĐ</span>
                          </div>
                          <div className="flex items-center">
                            <span className="min-w-[150px] mr-4">
                              Trân châu x 1
                            </span>{" "}
                            <span>7,000VNĐ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponentBill;
