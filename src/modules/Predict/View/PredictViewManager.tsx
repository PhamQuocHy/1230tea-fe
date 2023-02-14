/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Divider,
  Input,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
  Rate,
  Spin,
} from "antd";
import React, { useEffect, useReducer, useState } from "react";
//icon

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getListPredict } from "../PredictApi";
import TablesComponent from "../../../components/action/TablesComponent/TablesComponent";
import TableAction from "../../../components/action/TableAction";
import { stringAlways, tableName } from "../../../utils/contanst";
import { useForm } from "antd/lib/form/Form";
import AdvancedSearchForm from "../../../components/action/AdvancedSearchForm";
import Text from "antd/lib/typography/Text";
import { convertOptions } from "../../../utils/common";
import "./style.scss";
import "./index.js";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { url } from "inspector";

const PredictHistoryViewManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { Text } = Typography;
  //form
  const [formSearch] = useForm();

  //useAppSelect
  const listPredict = useAppSelector((state) => state.predict.listPredict);
  const user = useAppSelector((state) => state.rootReducer.auth.user);
  const loading = useAppSelector((state) => state.loading.loading);

  //state view
  const [pagination, setPagination] = useState({
    pageSize: 10,
    total: 10,
    page: 1,
  });

  const day = [
    {
      id: 1,
      name: "Hôm qua",
    },
    {
      id: 2,
      name: "Hôm nay",
    },
    {
      id: 3,
      name: "Ngày mai",
    },
  ];

  const [selectedDay, setSelectedDay] = useState<any>(day[1]);
  //data table
  const [expectedData, setExpectedData] = useState<any>({});

  //Open Modal
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitalModal] = useState("");
  const [action, setAction] = useState("");

  //Search
  const [params, setParms] = useState({});

  async function loadData() {}

  useEffect(() => {
    (async () => {
      try {
        const paramsGet = {
          phone: user?.phone || "0389606380",
        };
        await dispatch(getListPredict(paramsGet));
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, [dispatch, user]);

  useEffect(() => {
    if (listPredict.data) {
      setExpectedData((prev: any) => {
        switch (selectedDay.id) {
          case 1:
            return listPredict.data.expected.expected_yesterday;
          case 2:
            return listPredict.data.expected.expected_now;
          case 3:
            return listPredict.data.expected.expected_tomorrow;
        }
      });
    }
  }, [selectedDay, listPredict]);

  useEffect(() => {
    console.log(expectedData);
  }, [expectedData]);

  return (
    <Spin spinning={loading}>
      <div
        className="rounded-xl sm:p-8 p-2 h-full"
        style={{
      //     background: `linear-gradient(323deg,  ${user.get_customer?.zodiac.color_web_first}
      // 0%, ${user.get_customer?.zodiac.color_web_second} 99%)`,
      // background: `${user.get_customer?.zodiac.color_web_first}`,
          backgroundImage: `url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80")`,
          backgroundSize: 'cover',
          position: 'relative',
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
        style={{
          position: 'absolute',
          background: `${user.get_customer?.zodiac.color_web_first}`,
          opacity: 0.85,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

        }}></div>
       <div
       style={{
        position: 'relative',
        zIndex: 5,
       }}>
        <div className="text-Libra text-3xl font-poppins py-5 font-bold text-center uppercase ">
          Dự báo theo ngày
        </div>

        <div className="justify-center flex items-center h-16 mb-5 border-4">
          <div className="lg:col-span-4 hidden sm:block"></div>
          {day.map((item) => (
            <button
              onClick={() => {
                setSelectedDay(item);
              }}
              key={item.id}
              className="bg-transparent border-none lg:col-span-1 md:col-span-3 col-span-1 w-auto mx-3"
            >
              <div
                className={
                  item.id == selectedDay.id
                    ? "border-active" 
                    : "border1"
                }
              >
                {item.name}
              </div>
            </button>
          ))}
        </div>

        <div className="sm:hidden justify-center flex flex-row">
          <img
            src={`../../../../public/image/zodiac/12.png`}
           
            className="w-2/3 invert "
          />
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-0 gap-4 grid-rows-2 place-items-center h-full">
          <div className="first sm:text-2xl text-md font-semibold text-OnPrimaryLight">
            <div>
              {""} Tình cảm {""}
            </div>
            <Rate
              disabled
              value={expectedData?.love}
              className="sm:text-3xl text-lg mt-3 stroke-Libra stroke-[40] "
            />
          </div>

          <div className="sm:block hidden row-span-2 text-center w-full justify-center">
            <img
              src={`../../../image/zodiac/3.png`}
              className=" " //invert
              style={{marginTop: 10, paddingBottom: 10, width: 450, height: 320, marginLeft: -27 }}

            />
          </div>
          <div className="second sm:text-2xl text-md font-semibold text-OnPrimaryLight">
            <div>
              {""} Công việc {""}
            </div>
            <Rate
              disabled
              value={expectedData?.job}
              className="sm:text-3xl text-lg mt-3 stroke-Libra stroke-[40] "
            />
          </div>

          <div className="third sm:text-2xl text-md font-semibold text-OnPrimaryLight">
            <div>
              {""} Sức khỏe {""}
            </div>
            <Rate
              disabled
              value={expectedData?.health}
              className="sm:text-3xl text-lg mt-3 stroke-Libra stroke-[40] "
            />
          </div>
          <div className="fourth sm:text-2xl text-md font-semibold text-OnPrimaryLight">
            <div>
              {""} Tài chính {""}
            </div>
            <Rate
              disabled
              value={expectedData?.money}
              className="sm:text-3xl text-lg mt-3 stroke-Libra stroke-[40] "
            />
          </div>
        </div>
        <div
          className="text-white text-xl font-poppins font-semibold text-center pt-5 uppercase
                color: #fcba03
                "
        >
          Ngày sinh: {listPredict.data?.birthday}
        </div>
        <div className="w-full h-full bg-no-repeat bg-cover">
          <Text
            style={{
              color: "#fff",
              textShadow: "0px 0px 10px #fcba03",
            }}
          >
            <h1 className="text-Libra text-3xl font-poppins font-bold text-center uppercase ">
              {listPredict.data?.zodiac.name}
            </h1>
          </Text>
          <div className="grid grid-cols-6 auto-rows-max gap-2 justify-items-center">
            <div className="rounded-2xl md:col-span-2 col-span-3 border-slate-400 h-full w-full grid bg-Libra2/20 bg-opacity-10 text-white">
              <div className="px-5 self-center text-lg text-TertiaryContainerLight font-bold">
                Màu may mắn
              </div>
              <p className="justify-self-center self-start text-center">
                {expectedData?.color_lucky}
              </p>
            </div>
            <div className="rounded-2xl md:col-span-2 col-span-3 border-slate-400 h-full w-full grid bg-Libra2/20 bg-opacity-10 text-white">
              <div className="px-5 self-center text-lg text-TertiaryContainerLight font-bold">
                Số may mắn
              </div>
              <p className="justify-self-center self-start text-center">
                {expectedData?.number_lucky}
              </p>
            </div>
            <div className="rounded-2xl md:col-span-2 col-span-6 border-slate-400 h-full w-full grid bg-Libra2/20 bg-opacity-10 text-white">
              <div className="px-5 self-center text-lg text-TertiaryContainerLight font-bold">
                Cung hoàng đạo may mắn
              </div>
              <p className="justify-self-center self-start text-center">
                {expectedData?.zodiac_lucky}
              </p>
            </div>
            <div className="rounded-2xl col-span-6 h-full w-full grid border-slate-400 bg-Libra2/20 bg-opacity-10 text-white">
              <div className="px-5 self-center text-lg text-TertiaryContainerLight font-bold">
                Dự báo trong ngày
              </div>
              <p className="justify-self-center self-start text-justify px-7">
                {expectedData?.expected}
              </p>
            </div>
            <div className="rounded-2xl col-span-6  h-full w-full grid border-slate-400 bg-Libra2/20 bg-opacity-10 text-white">
              <div className="px-5 self-center text-lg text-TertiaryContainerLight font-bold">
                Lời khuyên hôm nay
              </div>
              <p className="justify-self-center self-start text-justify px-7">
                {expectedData?.advice}
              </p>
            </div>
          </div>
        </div>
        </div> 
      </div>
    </Spin>
  );
};
export default PredictHistoryViewManager;
