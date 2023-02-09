import { Button, DatePicker, Form, Input, Modal } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import React, { createRef, RefObject, useEffect, useState } from "react";
import locale from "antd/es/date-picker/locale/vi_VN";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { NoticationView } from "../../../utils/NotificationView";
import { CheckPhoneApi, NewOtpApi, VerifyOtpApi } from "../../Auth/AuthApi";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (values: Object) => void;
};

const CustomerInfoModal = (props: Props) => {
  const user = useAppSelector(
    (state: RootState) => state.rootReducer.auth.user
  );

  const dispatch = useAppDispatch();

  const [stage, setStage] = useState(0);
  const [form] = Form.useForm();
  const numberOfInputs = 6;

  const [otp, setOtp] = useState<string[]>(new Array(numberOfInputs).fill(""));
  const [currentElement, setCurrentElement] = useState(0);
  const [response, setResponse] = useState<any>({});

  const [refsList] = useState<RefObject<HTMLInputElement>[]>(() => {
    return Array.from({ length: numberOfInputs }, () =>
      createRef<HTMLInputElement>()
    );
  });

  useEffect(() => {
    if (response.status) {
      NoticationView(
        response.result,
        "Thông báo",
        response.status == 2
          ? "Vui lòng nhập thông tin giao hàng"
          : "Vui lòng nhập mã OTP"
      );
      return;
    }

    if (response.message) {
      NoticationView(response.result, "Thông báo", response.message);
    }
  }, [response]);

  const handleNextStage = async () => {
    const phone = form.getFieldValue("phone");
    switch (stage) {
      case 0:
        const data = {
          phone: phone,
        };

        const dispatchResponse: any = await dispatch(CheckPhoneApi(data));
        const payload = dispatchResponse.payload;
        setResponse((prev: Object) => dispatchResponse.payload);
        if (payload.result) {
          if (payload.status == 2) {
            setStage(2);
          } else if (payload.status == 1) {
            const sendOtpResponse: any = await dispatch(NewOtpApi(data));
            const sendOtpPayload = sendOtpResponse.payload;
            // setResponse((prev: Object) => sendOtpResponse.payload);
            if (sendOtpPayload.result) {
              setStage(1);
            }
          }
        }
        break;
      case 1:
        const dataOtp = {
          otp: otp.join(""),
          phone: phone,
        };

        console.log(dataOtp);
        // const dispatchResponseOTP: any = await dispatch(VerifyOtpApi(dataOtp));
        // const payloadOTP = dispatchResponseOTP.payload;
        // setResponse((prev: Object) => dispatchResponseOTP.payload);
        // if (payload.result) {
        setStage(2);
        // }
        break;
      case 2:
        form.submit();
        break;
    }
  };

  return (
    <Modal
      title={
        <div className="text-2xl font-semibold text-OnBackgroundLight/70">
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
      style={{
        top: 50,
      }}
      width={window.innerWidth <= 760 ? "100%" : "38%"}
    >
      <Form
        form={form}
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
        className="flex flex-col px-0 md:px-12 mt-5"
      >
        {(stage === 0 || stage === 2) && (
          <Form.Item
            className=""
            label={
              <div className="text-OnBackgroundLight text-md">
                Số điện thoại
              </div>
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
              disabled={stage === 2}
              prefix={<PhoneOutlined />}
              placeholder={"Số điện thoại"}
            />
          </Form.Item>
        )}

        {stage === 1 && (
          <div>
            <div className="w-full flex justify-center font-bold text-lg mb-5">
              Vui lòng nhập mã OTP
            </div>
            <div className="flex justify-center items-center space-x-2">
              {otp.map((_, index) => {
                return (
                  <div key={index}>
                    <input
                      ref={refsList[index]}
                      type="text"
                      maxLength={1}
                      onFocus={(e) => {
                        e.target.select();
                      }}
                      onChange={(e) => {
                        if (e.target.value.match(/[0-9]/)) {
                          setCurrentElement((prev) => {
                            const nextIndex = (index + 1) % numberOfInputs;
                            const nextElement = refsList[nextIndex].current;
                            nextElement!.focus();
                            nextElement!.select();
                            return nextIndex;
                          });
                          setOtp((prev) => {
                            prev[index] = e.target.value;

                            return prev;
                          });
                        } else {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                        }
                      }}
                      className="lg:w-12 lg:h-12 w-9 h-9 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl spin-button-none border-gray-400 focus:border-PrimaryContainerLight focus:text-gray-700 text-gray-400 transition"
                    />
                    {index === otp.length - 1 ? null : (
                      <span className="w-2 py-0.5 bg-gray-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {stage === 2 && (
          <div>
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
              label={
                <div className="text-OnBackgroundLight text-md">Địa chỉ</div>
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
          </div>
        )}

        <div className="flex flex-row w-full justify-center mt-10">
          {stage !== 2 && (
            <button
              type="button"
              onClick={() => {
                handleNextStage();
              }}
              className="bg-PrimaryContainerLight w-2/3 text-lg font-semibold border-PrimaryContainerLight/40 rounded-lg text-OnPrimaryContainerLight px-4 py-2 "
            >
              Tiếp theo
            </button>
          )}

          {stage === 2 && (
            <button
              type="submit"
              className="bg-PrimaryContainerLight w-2/3 text-lg font-semibold border-PrimaryContainerLight/40 rounded-lg text-OnPrimaryContainerLight px-4 py-2 "
            >
              Đặt hàng
            </button>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerInfoModal;
