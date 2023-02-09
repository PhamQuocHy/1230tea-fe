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
  return (
    <>
      <Modal
        title={title}
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
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
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
          <Descriptions.Item label="Sản phẩm">
            <List
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
            />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ModalComponentBill;
