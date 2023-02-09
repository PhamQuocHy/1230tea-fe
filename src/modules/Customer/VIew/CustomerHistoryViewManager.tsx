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
    <div className="w-full">
      <div
        className="rounded-2xl mx-auto flex flex-col py-10"
        style={{
          background: `linear-gradient(323deg,  ${user.get_customer?.zodiac.color_web_first}
          0%, ${user.get_customer?.zodiac.color_web_second} 99%)`,
        }}
      >
        <div className="text-center">
          <img
            src="../../../../image/2690549.jpg"
            className="h-40 rounded-full"
          />

          <div className="mt-4 text-TertiaryContainerLight text-6xl font-poppins font-semibold md:text-xl capitalize">
            {listPredict.data?.name}
          </div>
        </div>

        <div className="row-span-2 mx-auto mt-5 flex flex-col gap-4 text-OnPrimaryLight">
          <div className="text-left text-base">
            <div className="font-semibold inline">Ngày sinh:</div>{" "}
            {listPredict.data?.birthday}
          </div>
          <div className="text-left text-base">
            <div className="font-semibold inline">Số điện thoại:</div>{" "}
            {listPredict.data?.phone}
          </div>
          <div className="text-left text-base">
            <div className="font-semibold inline">Email:</div>{" "}
            {listPredict.data?.email}
          </div>
          <div className="text-left text-base">
            <div className="font-semibold inline">Địa chỉ:</div>{" "}
            {listPredict.data?.address}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerHistoryViewManager;
