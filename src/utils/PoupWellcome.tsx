import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import React, { useState } from "react";

interface Props {
  user: any;
  handle: () => void;
  status: boolean;
}
const PoupWellcome: React.FC<Props> = ({ user, handle, status }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={status}
      onOk={handle}
      onCancel={handle}
      okText="OK"
      footer={false}
    >
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        className="fixed top-0 left-0 right-0 bottom-0 z-[99999999]"
      >
        <div className="flex items-center justify-center h-full">
          <div className="w-[800px] mb-mb-header-height max-w-full">
            <div
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80")`,
                backgroundSize: "cover",
                position: "relative",
                overflow: "hidden",
                backgroundRepeat: "no-repeat",
                boxShadow: `0px 0px 6px 0px rgba(255,255,255,0.5)`,
              }}
              className="rounded-lg"
            >
              <div
                style={{
                  backgroundColor: user.get_customer?.zodiac.color_web_first,
                  opacity: "0.8",
                }}
                className="top-0 left-0 bottom-0 right-0 absolute z-5"
              ></div>
              <div className="text-center px-4 py-8 relative z-10">
                <div className="mb-6">
                  <h2 className="text-white capitalize mt-0 text-3xl">
                    Xin Chào: {user?.first_name}
                  </h2>
                </div>
                <div className="text-xl">
                  <span className="text-white mr-2">
                    Cung hoàng đạo của bạn là:{" "}
                  </span>
                  <span
                    style={{
                      color: user.get_customer?.zodiac.color_web_second,
                    }}
                    className="text[24px] font-bold"
                  >
                    Cung {user.get_customer?.zodiac?.name}
                  </span>
                </div>

                <div className="py-4">
                  <img
                    src={`../../image/final/${user.get_customer?.zodiac_id}.png`}
                    className="w-1/3"
                  />
                </div>

                <div className="">
                  <p className="text-xl text-white mt-0">Số chủ đạo của bạn</p>
                  <div className="text-center flex items-center justify-center">
                    <p
                      style={{
                        backgroundColor:
                          user.get_customer?.zodiac.color_web_second,
                        color: user.get_customer?.zodiac.color_web_first,
                      }}
                      className="m-0 h-[64px] w-[64px] rounded-full text-[30px]  leading-[64px] font-bold"
                    >
                      {user?.get_customer?.numberology}
                    </p>
                  </div>
                  <div className="mt-6">
                    <button
                      style={{
                        backgroundColor:
                          user.get_customer?.zodiac.color_web_second,
                        color: user.get_customer?.zodiac.color_web_first,
                      }}
                      onClick={() => handle()}
                      className="w-1/4 text-xl hover:opacity-70 cursor-pointer outline-none font-bold border-none rounded-xl py-2"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PoupWellcome;
