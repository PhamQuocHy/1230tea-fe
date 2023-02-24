import moment from "moment";
import React from "react";
import CustomerInfoModal from "../modules/Order/Dialog/CustomerInfoModal";
import {
  OrderTelegramType,
  orderWebTelegramApi,
} from "../modules/Order/OrderApi";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  resetOrder,
  updateItem,
} from "../modules/Order/OrderState";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ItemModal from "../modules/Order/Dialog/ItemModal";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { NoticationView } from "../utils/NotificationView";
import { formatNumberToMoney } from "../utils/numbers";
import { Modal } from "antd";
import { saveHistory } from "../modules/history/HistoryState";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { MdOutlineClose } from "react-icons/md";

type Props = { collapsed: boolean; cart: any; handleClose: () => void };

const CartModal = (props: Props) => {
  const user = useAppSelector((state) => state.rootReducer.auth.user);
  const dispatch = useAppDispatch();
  const token = useAppSelector(
    (state: RootState) => state.rootReducer.auth.token
  );
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = React.useState<any>({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = React.useState(false);
  const [response, setResponse] = React.useState<any>({});

  React.useEffect(() => {
    if (response.message) {
      NoticationView(response.result, "Thông báo", response.message);
    }
  }, [response]);

  const handleCloseCustomerModal = () => {
    setIsCustomerModalOpen((prev: boolean) => false);
  };

  const handleClose2 = () => {
    setIsOpen((prev: boolean) => false);
  };

  const confirmAddToCart = async (data: any) => {
    await dispatch(updateItem(data));
  };

  const handleSubmitCustomerModal = async (values: any) => {
    setIsCustomerModalOpen((prev: boolean) => false);
    const orderProduct = props.cart.map((item: any) => {
      const topping = item.topping
        .map((topping: any) => {
          if (topping.quantity === 0) {
            return null;
          }
          return {
            id: topping.id,
            name: topping.name,
            quantity: topping.quantity,
          };
        })
        .filter((item: any) => item);

      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        topping: topping,
        note: `${item.includedIce ? "Đá chung" : "Đá riêng"} ${
          item.ice ? "- " + item.ice : ""
        } ${item.sugar ? "- " + item.sugar : ""} - ${item.cup} ${
          item.note ? "- " + item.note : ""
        }`,
      };
    });

    const data: OrderTelegramType = {
      customer: {
        name: values.name,
        phone: values.phone,
        address: values.address,
        birthday: `${moment(values.birthday).format("yyyy-MM-DD")}`,
      },
      products: orderProduct,
      note: values.note,
      total: props.cart.reduce(
        (acc: number, item: any) => acc + item.single_price * item.quantity,
        0
      ),
    };

    const dispatchResponse: any = await dispatch(orderWebTelegramApi(data));
    dispatch(saveHistory(data));
    const payload = dispatchResponse.payload;
    setResponse((prev: Object) => dispatchResponse.payload);
    if (payload.result) {
      dispatch(resetOrder());
    }
  };

  return (
    <Modal
      title={
        <div className="relative">
          <div className="text-[20px] leading-5 font-semibold text-color-yelow bg-background-blue-dark py-3 px-5 capitalize">
            <span className="block pr-5">Giỏ hàng</span>
          </div>
          <div>
            <span
              className="absolute right-0 top-0 p-2 lg:hidden"
              onClick={() => props.handleClose()}
            >
              <MdOutlineClose size={"24px"} color={"#fff"} />
            </span>
          </div>
        </div>
      }
      footer={null}
      open={!props.collapsed}
      onCancel={() => {
        props.handleClose();
      }}
      onOk={() => {
        props.handleClose();
      }}
      style={{
        top: 0,
      }}
      bodyStyle={{
        height: "80vh",
      }}
      width={"100%"}
    >
      {" "}
      <div className="flex flex-col py-2 px-5 gap-4 overflow-y-scroll scrollbar-hide h-[74%] lg:h-[48vh] ">
        {props.cart.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="shadow-lg rounded-xl border-2 flex flex-col border-TertiaryLight/10 py-4 px-4 cursor-pointer border-solid bg-BackgroundLight"
            >
              <div
                className="flex flex-col"
                onClick={() => {
                  setIsOpen((prev: boolean) => true);
                  setSelectedItem(item);
                }}
              >
                <div className="text-[18px] pb-2 leading-6 border-x-0 border-t-0 border-b border-[#ccc] border-solid capitalize font-semibold text-OnBackgroundLight/80">
                  {item.name}
                </div>
                <div>
                  <div>
                    <p className="my-2 text-[16px] font-bold">Topping:</p>
                  </div>

                  <div className="flex flex-col my-2 px-3">
                    {item.topping.map((topping: any, index: number) => {
                      if (topping.quantity > 0) {
                        return (
                          <div
                            className="flex flex-row text-md text-OnBackgroundLight/50 font-semibold"
                            key={topping.id}
                          >
                            <div className="mr-2">{topping.name}</div>
                            <div className="flex-1 w-full border-t-0 border-x-0 border-b border-dashed relative top-[-3px] border-[#333]"></div>
                            <div className="px-2">{" x"}</div>
                            <div>{topping.quantity}</div>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
                <div className="my-2">
                  <div className="">
                    <p className="mt-0 mb-2 text-[16px] font-bold">Lưu Ý:</p>
                  </div>
                  <div className="px-3">
                    <div className="leading-5 text-md text-[#333]">
                      {item.includedIce ? "Đá chung" : "Đá riêng"}
                    </div>
                    <div className="leading-5 text-md text-[#333] capitalize">
                      {item.cup}
                    </div>
                    <div className="leading-5 text-md text-[#333]">
                      {item.includedIce && (
                        <span className="pr-1">{item.ice && item.ice} </span>
                      )}
                      <span>{item.sugar && item.sugar} </span>
                    </div>
                  </div>
                </div>
                {item?.note !== "" && (
                  <div className="border-x-0 pb-4 border-t-0 border-b border-[#ccc] border-solid">
                    <div className="font-medium  text-md">
                      <p className="mt-0 mb-2 text-[16px] font-bold">Ghi chú</p>
                    </div>
                    <div>
                      <p className="my-0 px-5">{item.note}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between xl:flex-row md:flex-col my-2 z-10">
                <div className=" flex flex-row justify-center items-center">
                  <button
                    onClick={() => {
                      dispatch(removeItem(item.cart_id));
                    }}
                    style={
                      !user?.get_customer?.zodiac
                        ? {
                            backgroundColor: "#FAA31B",
                            color: "#FFFF",
                            border: `1px solid #FAA31B`,
                          }
                        : {
                            backgroundColor:
                              user?.get_customer.zodiac.color_web_second,
                            color: user?.get_customer.zodiac.color_web_first,
                            border: `1px solid ${user?.get_customer.zodiac.color_web_second}`,
                          }
                    }
                    className="text-[14px] cursor-pointer border-2 border-solid transition-all duration-200 ease-linear hover:opacity-80
                    px-4 py-4 leading-[0rem] text-center rounded-md"
                  >
                    Xóa
                  </button>
                </div>
                <div className="flex flex-row items-center justify-end flex-initial h-full xl:w-1/2 md:w-full">
                  <button
                    style={
                      !user?.get_customer?.zodiac
                        ? {
                            border: `2px solid #002D45`,
                          }
                        : {
                            border: `2px solid ${user?.get_customer.zodiac.color_web_first}`,
                          }
                    }
                    className="text-lg px-2 py-2 cursor-pointer transition-all duration-200 ease-linear leading-[0rem]
                     text-center border-blue-dark disabled:bg-gray-50/5 disabled:border-gray-50/40
                    disabled:text-black/20 rounded-md bg-white text-OnTertiaryDark"
                    disabled={item.quantity <= 1}
                    onClick={() => {
                      dispatch(decreaseQuantity(item.cart_id));
                    }}
                  >
                    <MinusOutlined />
                  </button>
                  <div className="text-lg leading-[0rem] font-semibold w-16 text-center">
                    {item.quantity}
                  </div>
                  <button
                    className="text-lg px-2 py-2 cursor-pointer transition-all duration-200 ease-linear leading-[0rem] 
                    text-center border-blue-dark rounded-md bg-white text-OnTertiaryDark"
                    onClick={() => {
                      dispatch(increaseQuantity(item.cart_id));
                    }}
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
              <div>
                <div className="font-medium text-md leading-5 text-OnBackgroundLight/60">
                  Tổng cộng:{" "}
                  {formatNumberToMoney(item.quantity * item.single_price) +
                    " VNĐ"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={
          !user?.get_customer?.zodiac
            ? { backgroundColor: "#284A5D" }
            : { backgroundColor: user?.get_customer.zodiac.color_web_first }
        }
        className="flex flex-col justify-center absolute z-10 bottom-0 left-0 right-0 items-center px-5 py-2"
      >
        <div className="flex flex-row mb-2 justify-between w-full items-center gap-2">
          <div className="lg:text-lg text-[16px] leading-4 font-semibold text-white">
            Tổng tiền:
          </div>{" "}
          <div
            style={
              !user?.get_customer?.zodiac
                ? { color: "#FAA31B" }
                : { color: user?.get_customer.zodiac.color_web_second }
            }
            className="lg:text-2xl text-[20px] leading-5 font-semibold"
          >
            {formatNumberToMoney(
              props.cart.reduce(
                (acc: number, item: any) =>
                  acc + item.single_price * item.quantity,
                0
              )
            ) + " VNĐ"}
          </div>
        </div>
        <div className="flex flex-row w-full justify-center items-center gap-4">
          <button
            onClick={() => {
              dispatch(resetOrder());
            }}
            style={
              !user?.get_customer?.zodiac
                ? { border: `2px solid #FAA31B` }
                : {
                    border: `2px solid ${user?.get_customer.zodiac.color_web_second}`,
                  }
            }
            className=" bg-transparent text-white transition-all duration-200 ease-linear
            text-md font-semibold rounded-lg w-1/2 px-2 py-2
            hover:opacity-80 cursor-pointer"
          >
            Xoá giỏ hàng
          </button>
          <button
            onClick={() => {
              token
                ? setIsCustomerModalOpen((prev: boolean) => true)
                : navigate("/login");
            }}
            style={
              !user?.get_customer?.zodiac
                ? {
                    backgroundColor: `#FAA31B`,
                    color: `#FFFFFF`,
                    border: "2px solid #FAA31B",
                  }
                : {
                    border: `2px solid ${user?.get_customer.zodiac.color_web_second}`,
                    backgroundColor: user?.get_customer.zodiac.color_web_second,
                    color: user?.get_customer.zodiac.color_web_first,
                  }
            }
            disabled={props.cart.length === 0}
            className=" transition-all duration-200 ease-linear w-1/2 text-md font-semibold disabled:bg-gray-50/5
            disabled:text-black/20  rounded-lg  px-2 py-2 hover:opacity-80 cursor-pointer 
            "
          >
            Đặt hàng
          </button>
        </div>
      </div>
      {Object.keys(selectedItem).length > 0 && (
        <ItemModal
          key={selectedItem.cart_id + selectedItem.quantity}
          isOpen={isOpen}
          isCartItem={true}
          handleConfirm={confirmAddToCart}
          handleClose={handleClose2}
          item={selectedItem}
        />
      )}
      <CustomerInfoModal
        isOpen={isCustomerModalOpen}
        handleClose={handleCloseCustomerModal}
        handleSubmit={handleSubmitCustomerModal}
      />
    </Modal>
  );
};

export default CartModal;
