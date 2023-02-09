import { Collapse, Modal } from "antd";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/hook";
import { RootState } from "../../../redux/store";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const HistoryView = (props: Props) => {
  const history = useAppSelector(
    (state: RootState) => state.rootReducer.history.historyList
  );

  useEffect(() => {
    console.log(history);
  }, [history]);

  return (
    <Modal
      title={
        <div className="text-2xl font-semibold text-OnBackgroundLight/70 mb-10">
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
      style={{
        top: 50,
      }}
      width={window.innerWidth <= 760 ? "100%" : "38%"}
    >
      <div>
        {history.length < 1 ? (
          <div>Không có lịch sử</div>
        ) : (
          <Collapse
            accordion={true}
            className={"overflow-y-scroll scrollbar-hide flex flex-col"}
          >
            {history.map((item: any, index: number) => (
              <Collapse.Panel header={`Đơn hàng ${index + 1}`} key={index}>
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
                    {item.products.map((product: any, productIndex: number) => (
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
                    ))}
                    <div>{`Ghi chú: ${
                      item.note ? item.note : "Không có"
                    }`}</div>
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
