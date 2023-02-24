/* eslint-disable jsx-a11y/alt-text */
import { Space, Card, Typography } from "antd";
import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";

import { useForm } from "antd/lib/form/Form";
import { getListPredict } from "../../Predict/PredictApi";
import "../../../app/style.scss";

const CustomerHistoryViewManager: React.FC = () => {
  const dispatch = useAppDispatch();

  //form
  const [formSearch] = useForm();

  //useAppSelect
  const listCustomer = useAppSelector((state) => state.customer.listCustomer);
  const listPredict = useAppSelector((state) => state.predict.listPredict);
  const user = useAppSelector((state) => state.rootReducer.auth.user);
  //state view
  const [pagination, setPagination] = useState({
    pageSize: 10,
    total: 10,
    page: 1,
  });

  //Open Modal
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitalModal] = useState("");
  const [action, setAction] = useState("");
  const [thisCustomer, setThisCustomer] = useState<any>({});
  const { Text } = Typography;
  //Search
  const [params, setParms] = useState({});

  async function loadData() {
    try {
      const paramsGet = {
        phone: user?.phone || "0389606380",
      };
      const resultPredict: any = await dispatch(getListPredict(paramsGet));
    } catch (e: any) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: user.get_customer?.zodiac.color_web_first,
      }}
      className="w-full h-full min-h-[90vh]"
    >
      <div className="mx-auto w-width-layout max-w-full px-4 flex flex-col py-10">
        <div
          style={{
            color: "#fff",
            textShadow: `0px 0px 10px ${user.get_customer?.zodiac.color_web_second}`,
          }}
          className="w-full flex items-center justify-center flex-col"
        >
          <h1
            style={{ color: user.get_customer?.zodiac.color_web_second }}
            className="title-font sm:text-4xl text-3xl mb-4 font-bold uppercase"
          >
            Thông tin khách hàng
          </h1>
        </div>

        <div className="bg-before-white flex justify-center">
          <div className="flex items-center justify-center py-6 relative">
            <div className="text-center flex-[1] py-3 px-8">
              <img
                src="../../../../image/2690549.jpg"
                className="h-40 rounded-full"
              />
            </div>

            <div
              style={{ borderLeft: "3px solid #fff" }}
              className=" text-OnPrimaryLight flex-[9] py-3 px-8"
            >
              <div className="uppercase">
                <h2 className="mx-0 mt-0 mb-3 capitalize font-bold">
                  {listPredict.data?.name}
                </h2>
              </div>
              <div className="text-left text-base">
                <div className="font-semibold inline mr-2">Ngày sinh:</div>{" "}
                {listPredict.data?.birthday}
              </div>
              <div className="text-left text-base pt-2">
                <div className="font-semibold inline mr-2">Số điện thoại:</div>{" "}
                {listPredict.data?.phone}
              </div>
              <div className="text-left text-base pt-2">
                <div className="font-semibold inline mr-2">Cung hoàng đạo:</div>{" "}
                {listPredict.data?.zodiac?.name}
              </div>
              <div className="text-left text-base pt-2">
                <div className="font-semibold inline mr-2">Điểm tích lũy:</div>{" "}
                {listPredict.data?.point}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerHistoryViewManager;
