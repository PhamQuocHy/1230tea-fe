import Sider from "antd/es/layout/Sider";
import React from "react";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  resetOrder,
  updateItem,
} from "../modules/Order/OrderState";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ItemModal from "../modules/Order/Dialog/ItemModal";
import CustomerInfoModal from "../modules/Order/Dialog/CustomerInfoModal";
import moment from "moment";
import {
  OrderTelegramType,
  orderWebTelegramApi,
} from "../modules/Order/OrderApi";
import { NoticationView } from "../utils/NotificationView";
import { formatNumberToMoney } from "../utils/numbers";
import { saveHistory } from "../modules/history/HistoryState";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

type Props = {
  collapsed: boolean;
  cart: any;
};

const CartSider = (props: Props) => {
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

  const handleClose = () => {
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
    <Sider
      className="bg-white h-full shadow-xl z-20 hidden md:block transition-all duration-200 ease-linear fixed right-0
      top-0 bottom-0"
      collapsible
      collapsed={props.collapsed}
      collapsedWidth={0}
      width={window.innerWidth <= 1500 ? "30%" : "20%"}
      trigger={null}
    >
      <div className="flex justify-center items-center text-xl font-semibold py-2 h-[7%]">
        Giỏ hàng
      </div>
      <div className="flex flex-col py-2 px-5 gap-4 overflow-y-scroll scrollbar-hide h-[78%] ">
        {props.cart.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="shadow-lg rounded-xl border-2 flex flex-col border-TertiaryLight/10 py-4 px-4 cursor-pointer border-solid bg-BackgroundLight"
            >
              <div
                className="flex flex-col gap-3"
                onClick={() => {
                  setIsOpen((prev: boolean) => true);
                  setSelectedItem(item);
                }}
              >
                <div className="text-lg font-semibold text-OnBackgroundLight/80">
                  {item.name}
                </div>
                <div className="flex flex-col gap-2">
                  {item.topping.map((topping: any, index: number) => {
                    if (topping.quantity > 0) {
                      return (
                        <div
                          className="flex flex-row text-md text-OnBackgroundLight/50 font-semibold"
                          key={topping.id}
                        >
                          <div>{topping.name}</div>
                          <div className="px-2">{" x"}</div>
                          <div>{topping.quantity}</div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
                <div className="font-semibold text-md text-OnBackgroundLight/80">
                  {item.includedIce ? "Đá chung" : "Đá riêng"}
                </div>
                <div className="font-semibold text-md text-OnBackgroundLight/80">
                  {item.cup}
                </div>
                <div className="font-semibold text-md text-OnBackgroundLight/80">
                  {item.ice}, {item.sugar}{" "}
                </div>
                <div className="font-medium text-md text-OnBackgroundLight/60">
                  Ghi chú: {item.note}
                </div>
                <div className="font-medium text-md text-OnBackgroundLight/60">
                  Tổng cộng:{" "}
                  {formatNumberToMoney(item.quantity * item.single_price) +
                    " VNĐ"}
                </div>
              </div>
              <div className="flex xl:flex-row md:flex-col mt-10 z-10">
                <div className="w-1/2 flex flex-row justify-center items-center">
                  <button
                    onClick={() => {
                      dispatch(removeItem(item.cart_id));
                    }}
                    className="text-lg px-4 py-4 leading-[0rem] text-center bg-ErrorContainerLight text-OnErrorContainerLight rounded-md border-ErrorContainerLight/30"
                  >
                    Xóa
                  </button>
                </div>
                <div className="flex flex-row items-center justify-end flex-initial h-full xl:w-1/2 md:w-full gap-6">
                  <button
                    className="text-lg px-2 py-2 cursor-pointer leading-[0rem] text-center border-TertiaryContainerLight/30 disabled:bg-gray-50/5 disabled:border-gray-50/40 disabled:text-black/20 rounded-md bg-TertiaryContainerLight text-OnTertiaryDark"
                    disabled={item.quantity <= 0}
                    onClick={() => {
                      dispatch(decreaseQuantity(item.cart_id));
                    }}
                  >
                    <MinusOutlined />
                  </button>
                  <div className="text-lg leading-[0rem] font-semibold w-14 text-center">
                    {item.quantity}
                  </div>
                  <button
                    className="text-lg px-2 py-2 cursor-pointer leading-[0rem] text-center border-TertiaryContainerLight/30 rounded-md bg-TertiaryContainerLight text-OnTertiaryDark"
                    onClick={() => {
                      dispatch(increaseQuantity(item.cart_id));
                    }}
                  >
                    <PlusOutlined />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col h-[15%] justify-center items-center px-5">
        <div className="flex flex-row h-1/5 justify-start w-full items-center px-5 gap-2">
          <div className="text-lg font-semibold">Tổng cộng:</div>{" "}
          <div className="text-lg font-semibold text-TertiaryLight">
            {formatNumberToMoney(
              props.cart.reduce(
                (acc: number, item: any) =>
                  acc + item.single_price * item.quantity,
                0
              )
            ) + " VNĐ"}
          </div>
        </div>
        <div className="flex flex-row h-4/5 justify-center items-center gap-4">
          <button
            onClick={() => {
              dispatch(resetOrder());
            }}
            className=" bg-ErrorContainerLight text-OnErrorContainerLight
            border-ErrorContainerLight/30 text-md font-semibold h-1/2 rounded-lg  px-4 py-2"
          >
            Xoá giỏ hàng
          </button>
          <button
            onClick={() => {
              token
                ? setIsCustomerModalOpen((prev: boolean) => true)
                : navigate("/login");
            }}
            disabled={props.cart.length === 0}
            className="bg-PrimaryContainerLight text-md font-semibold h-1/2 disabled:bg-gray-50/5 disabled:border-gray-50/40 disabled:text-black/20 border-PrimaryContainerLight/40 rounded-lg text-OnPrimaryContainerLight px-4 py-2"
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
          handleClose={handleClose}
          item={selectedItem}
        />
      )}

      <CustomerInfoModal
        isOpen={isCustomerModalOpen}
        handleClose={handleCloseCustomerModal}
        handleSubmit={handleSubmitCustomerModal}
      />
    </Sider>
  );
};

export default CartSider;
