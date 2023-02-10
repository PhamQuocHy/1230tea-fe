import { Checkbox, Modal, Select } from "antd";
import React, { useEffect } from "react";
import { formatNumberToMoney } from "../../../utils/numbers";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import "./styles.scss";

type Props = {
  selectedProductKey?: any;
  item: any;
  topping?: any;
  isOpen: boolean;
  isCartItem: boolean;
  handleClose: () => void;
  handleConfirm: (data: any) => void;
};

const ItemModal = (props: Props) => {
  const iceOptions = [
    {
      value: "",
      label: "100% đá",
    },
    {
      value: "75% đá",
      label: "75% đá",
    },
    {
      value: "50% đá",
      label: "50% đá",
    },
    {
      value: "25% đá",
      label: "25% đá",
    },
  ];

  const sugarOptions = [
    {
      value: "",
      label: "100% đường",
    },
    {
      value: "75% đường",
      label: "75% đường",
    },
    {
      value: "50% đường",
      label: "50% đường",
    },
    {
      value: "25% đường",
      label: "25% đường",
    },
  ];

  const cupOptions = [
    {
      value: "ly Bạch Dương",
      label: "ly Bạch Dương",
    },
    {
      value: "ly Kim Ngưu",
      label: "ly Kim Ngưu",
    },
    {
      value: "ly Song Tử",
      label: "ly Song Tử",
    },
    {
      value: "ly Cự Giải",
      label: "ly Cự Giải",
    },
    {
      value: "ly Sư Tử",
      label: "ly Sư Tử",
    },
    {
      value: "ly Xử Nữ",
      label: "ly Xử Nữ",
    },
    {
      value: "ly Thiên Bình",
      label: "ly Thiên Bình",
    },
    {
      value: "ly Bọ Cạp",
      label: "ly Bọ Cạp",
    },
    {
      value: "ly Nhân Mã",
      label: "ly Nhân Mã",
    },
    {
      value: "ly Ma Kết",
      label: "ly Ma Kết",
    },
    {
      value: "ly Bảo Bình",
      label: "ly Bảo Bình",
    },
    {
      value: "ly Song Ngư",
      label: "ly Song Ngư",
    },
  ];

  const [note, setNote] = React.useState("");
  const [orderedItem, setOrderedItem] = React.useState(() => {
    console.log(props.item);
    if (props.isCartItem) {
      return props.item;
    }
    return {
      ...props.item,
      cart_id: props.selectedProductKey,
      topping: [
        ...props.topping.map((item: any) => {
          return { ...item, quantity: 0 };
        }),
      ],
      quantity: 1,
      includedIce: false,
      ice: iceOptions[0].value,
      sugar: sugarOptions[0].value,
      cup: cupOptions[0].value,
      single_price: props.item.price,
      note: "",
    };
  });

  return (
    <Modal
      title={
        <div className="text-[20px] leading-5 font-semibold text-color-yelow bg-background-blue-dark py-3 px-5 text-[20px]  capitalize">
          {props.item.name}
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
        // bottom: "50px",
        // marginTop: "74px",
        padding: 0,
        borderRadius: "8px",
        boxShadow: "#333 0 1px 12px 1px",
      }}
      bodyStyle={{
        maxHeight: "75vh",
        padding: 0,
      }}
      width={window.innerWidth <= 760 ? "100%" : "48%"}
    >
      <div className="flex flex-col px-5 scrollbar-hide overflow-y-scroll">
        <div>
          <div className="">
            <p className="text-[16px] font-bold my-1">Tùy chọn</p>
          </div>
          <div className="pl-5 pr-2">
            <div className="flex flex-row items-center">
              <div className="text-[14px] font-semibold pr-2">Lượng đá</div>
              <div className="grow border-b border-t-0 border-l-0 border-r-0 relative top-1 border-dashed border-background-blue-dark"></div>

              <Select
                className=""
                options={iceOptions}
                bordered={false}
                defaultValue={orderedItem.ice}
                value={orderedItem.ice}
                onChange={(value) => {
                  setOrderedItem((prev: any) => {
                    return { ...prev, ice: value };
                  });
                }}
                size={"large"}
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="text-[14px] font-semibold pr-2">Đá chung</div>
              <div className="grow border-b border-t-0 border-l-0 border-r-0 relative top-1 border-dashed border-background-blue-dark"></div>

              <input
                type="Checkbox"
                className="text-xl my-0 mr-[11px] ml-4 w-5 h-5"
                value={orderedItem.includedIce}
                defaultChecked={orderedItem.includedIce}
                onChange={() => {
                  setOrderedItem((prev: any) => {
                    return { ...prev, includedIce: !prev.includedIce };
                  });
                }}
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="text-[14px] font-semibold pr-2">Lượng đường</div>
              <div className="grow border-b border-t-0 border-l-0 border-r-0 relative top-1 border-dashed border-background-blue-dark"></div>

              <Select
                options={sugarOptions}
                bordered={false}
                defaultValue={orderedItem.sugar}
                onChange={(value) => {
                  setOrderedItem((prev: any) => {
                    return { ...prev, sugar: value };
                  });
                }}
                size={"large"}
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="text-[14px] font-semibold pr-2">Loại ly</div>
              <div className="grow border-b border-t-0 border-l-0 border-r-0 relative top-1 border-dashed border-background-blue-dark"></div>

              <Select
                options={cupOptions}
                bordered={false}
                defaultValue={orderedItem.cup}
                onChange={(value) => {
                  setOrderedItem((prev: any) => {
                    return { ...prev, cup: value };
                  });
                }}
                className="text-[14px]"
                size={"large"}
              />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex flex-row items-center pb-4">
            <div className="text-[16px] font-bold my-1">Topping</div>
            <div className="grow"></div>
          </div>
          <div className="grid grid-cols-1 gap-3 max-h-[14vh] overflow-y-auto border border-solid border-[#ccc] py-2 px-[20px] rounded">
            {orderedItem.topping.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-row w-full items-center px-1"
                >
                  <div className="flex flex-col justify-center flex-initial w-1/2">
                    <div className="text-[15px] text-OnBackgroundLight mb-1">
                      {item.name}
                    </div>
                    <div className="text-[15px] leading-4 font-semibold text-color-red">
                      {formatNumberToMoney(item.price)} VNĐ
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end flex-initial h-full w-1/2 gap-6">
                    <button
                      className="text-[15px] px-2 py-2 cursor-pointer leading-[0rem] text-center border-TertiaryContainerLight/30 disabled:bg-gray-50/5 disabled:border-gray-50/40 disabled:text-black/20 rounded-md bg-TertiaryContainerLight text-OnTertiaryDark"
                      disabled={item.quantity <= 0}
                      onClick={() => {
                        setOrderedItem((prev: any) => {
                          return {
                            ...prev,
                            single_price: prev.single_price - item.price,
                            topping: prev.topping.map((topping: any) => {
                              if (topping.id === item.id) {
                                return {
                                  ...topping,
                                  quantity: topping.quantity - 1,
                                };
                              } else {
                                return topping;
                              }
                            }),
                          };
                        });
                      }}
                    >
                      <MinusOutlined />
                    </button>
                    <div className="text-[15px] leading-[0rem] font-semibold w-14 text-center">
                      {item.quantity}
                    </div>
                    <button
                      className="text-[15px] px-2 py-2 cursor-pointer leading-[0rem] text-center border-TertiaryContainerLight/30 rounded-md bg-TertiaryContainerLight text-OnTertiaryDark"
                      onClick={() => {
                        setOrderedItem((prev: any) => {
                          return {
                            ...prev,
                            single_price: prev.single_price + item.price,
                            topping: prev.topping.map((topping: any) => {
                              if (topping.id === item.id) {
                                return {
                                  ...topping,
                                  quantity: topping.quantity + 1,
                                };
                              } else {
                                return topping;
                              }
                            }),
                          };
                        });
                      }}
                    >
                      <PlusOutlined />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex flex-row items-center mt-4 pb-4">
            <div className="text-xl font-semibold">Ghi chú</div>
            <div className="grow"></div>
          </div>
          <div>
            <TextArea
              rows={1}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 px-5 rounded-b-lg overflow-hidden py-3 bg-background-blue-dark flex flex-row justify-end items-center gap-2">
        <div className="grow flex flex-row justify-start gap-2 items-center">
          <div className="font-semibold text-white text-md text-[16px]">
            {"Tổng 1 sản phẩm: "}
          </div>{" "}
          <div className="text-color-yelow font-bold text-[16px]">
            {formatNumberToMoney(orderedItem.single_price ?? 0) + " VNĐ"}
          </div>
        </div>
        <button
          className="bg-transparent hover:bg-background-yelow mr-3 border-2 hover: text-[16px] font-semibold border-yelow min-w-[100px] cursor-pointer transition-all duration-200 ease-linear rounded-lg text-white px-4 py-2"
          onClick={() => {
            props.handleClose();
          }}
        >
          Hủy
        </button>
        <button
          className="bg-PrimaryContainerLight hover:bg-transparent cursor-pointer border-2 bg-background-yelow border-solid text-white border-yelow text-[16px] font-semibold border-PrimaryContainerLight/40 rounded-lg text-OnPrimaryContainerLight px-4 py-2"
          onClick={() => {
            props.handleClose();
            props.handleConfirm({ ...orderedItem, note: note });
            console.log({ ...orderedItem, note: note });
          }}
        >
          Xác nhận
        </button>
      </div>
    </Modal>
  );
};

export default ItemModal;
