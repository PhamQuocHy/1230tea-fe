import { Collapse, Modal } from "antd";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";
import "./styles.scss";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const HistoryView = (props: Props) => {
  const user = useAppSelector((state) => state.rootReducer.auth.user);

  const history = useAppSelector(
    (state: RootState) => state.rootReducer.history.historyList
  );

  // useEffect(() => {
  //   console.log(history);
  // }, [history]);

  return (
    <Modal
      title={
        <div
          style={{
            backgroundColor: user?.get_customer?.zodiac?.color_web_first,
            color: user?.get_customer?.zodiac?.color_web_second,
          }}
          className="text-xl font-semibold py-2 px-4 uppercase h-full"
        >
          Lịch sử đặt hàng
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
      style={
        {
          // top: 50,
        }
      }
      width={window.innerWidth <= 760 ? "100%" : "38%"}
    >
      <div>
        {history.length < 1 ? (
          <div>Không có lịch sử</div>
        ) : (
          <Collapse
            accordion={true}
            className={"overflow-y-scroll scrollbar-hide flex flex-col p-5"}
          >
            {history.map((item: any, index: number) => (
              <Collapse.Panel
                header={`Đơn hàng ${index + 1}`}
                key={index}
                className="border border-solid border-[#ccc] rounded-lg space_bl2"
              >
                <div className="max-h-[30vh] overflow-auto">
                  <div className="">
                    <div className="text-lg font-bold mb-2">
                      Thông tin cá nhân
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 grid-rows-2">
                      <div className="flex flex-row gap-2">
                        <div className="font-semibold">{"Họ và tên: "}</div>
                        {item.customer.name}
                      </div>
                      <div className="flex flex-row gap-2">
                        <div className="font-semibold">{"SĐT: "}</div>
                        {item.customer.phone}
                      </div>
                      <div className="flex flex-row gap-2">
                        <div className="font-semibold">{"Sinh nhật: "}</div>
                        {item.customer.birthday}
                      </div>
                      <div className="flex flex-row gap-2">
                        <div className="font-semibold">{"Địa chỉ: "}</div>
                        {item.customer.address}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-lg font-bold">Thông tin đơn hàng</div>
                    ============
                    <div className="">
                      {item.products.map(
                        (product: any, productIndex: number) => (
                          <div>
                            <div className="font-semibold">{`${product.name} x ${product.quantity}`}</div>
                            <div className="font-semibold">{`Topping:`}</div>
                            <div className="px-5">
                              {product.topping.map(
                                (topping: any, toppingIndex: number) => (
                                  <div>
                                    <div>{`${topping.name} x ${topping.quantity}`}</div>
                                  </div>
                                )
                              )}
                            </div>
                            <div>{`Ghi chú: ${product.note}`}</div>
                            ============
                          </div>
                        )
                      )}
                      <div>{`Ghi chú: ${
                        item.note ? item.note : "Không có"
                      }`}</div>
                    </div>
                  </div>
                </div>
              </Collapse.Panel>
            ))}
          </Collapse>
        )}
      </div>
    </Modal>
  );
};

export default HistoryView;
