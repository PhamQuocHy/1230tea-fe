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
        className=" sm:p-8 px-2 py-4 h-full"
        style={{
          //     background: `linear-gradient(323deg,  ${user.get_customer?.zodiac.color_web_first}
          // 0%, ${user.get_customer?.zodiac.color_web_second} 99%)`,
          background: `${user.get_customer?.zodiac.color_web_first}`,
          // backgroundImage: `url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80")`,
          // backgroundSize: "cover",
          // position: "relative",
          // overflow: "hidden",
          // backgroundRepeat: "no-repeat",
        }}
      >
        {/* <div
          style={{
            position: "absolute",
            background: `${user.get_customer?.zodiac.color_web_first}`,
            opacity: 0.85,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div> */}
        <div
          // style={{
          //   position: "relative",
          //   zIndex: 5,
          // }}
          className="h-full"
        >
          <div
            className=" lg:text-4xl text-xl font-poppins py-5 font-bold text-center uppercase h-full"
            style={{
              color: `${user.get_customer?.zodiac.color_web_second}`,
              textShadow: `0px 0px 10px ${user.get_customer?.zodiac.color_web_second}`,
            }}
          >
            Dự báo theo ngày
          </div>

          <div className="justify-center flex items-center h-16 lg:mb-5 border-4">
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
                  style={
                    item.id == selectedDay.id
                      ? {
                          paddingBottom: "8px",
                          borderBottom: `2px solid ${user.get_customer?.zodiac.color_web_second}`,
                        }
                      : { border: "none", paddingBottom: "8px" }
                  }
                  className="text-white lg:text-[21px] text-sm font-bold uppercase"
                >
                  {item.name}
                </div>
              </button>
            ))}
          </div>

          <div className="sm:hidden justify-center flex flex-row">
            <img
              src={`../../../image/zodiac/${listPredict.data?.zodiac_id}.png`}
              className="w-2/3"
            />
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-0 gap-4 grid-rows-2 place-items-center h-full">
            <div className="first sm:text-2xl text-md font-semibold text-OnPrimaryLight">
              <div>
                {""} Tình cảm {""}
              </div>
              <Rate
                // disabled
                value={expectedData?.love}
                className="sm:text-3xl text-lg mt-3  stroke-[40] "
                style={{
                  stroke: `${user.get_customer?.zodiac.color_web_second}`,
                  color: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              />
            </div>

            <div className="sm:block hidden row-span-2 text-center w-full justify-center">
              <img
                src={`../../../image/zodiac/${listPredict.data?.zodiac_id}.png`}
                className=" " //invert
                style={{
                  marginTop: 10,
                  paddingBottom: 10,
                  width: 450,
                  height: 320,
                  marginLeft: -27,
                }}
              />
            </div>
            <div className="second sm:text-2xl text-md font-semibold text-OnPrimaryLight">
              <div>
                {""} Công việc {""}
              </div>
              <Rate
                disabled
                value={expectedData?.job}
                className="sm:text-3xl text-lg mt-3  stroke-[40] "
                style={{
                  stroke: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              />
            </div>

            <div className="third sm:text-2xl text-md font-semibold text-OnPrimaryLight">
              <div>
                {""} Sức khỏe {""}
              </div>
              <Rate
                disabled
                value={expectedData?.health}
                className="sm:text-3xl text-lg mt-3  stroke-[40] "
                style={{
                  stroke: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              />
            </div>
            <div className="fourth sm:text-2xl text-md font-semibold text-OnPrimaryLight">
              <div>
                {""} Tài chính {""}
              </div>
              <Rate
                disabled
                value={expectedData?.money}
                className="sm:text-3xl text-lg mt-3 stroke-[40] "
                style={{
                  stroke: `${user.get_customer?.zodiac.color_web_second}`,
                }}
              />
            </div>
          </div>

          <div className="w-full h-full bg-no-repeat bg-cover pt-3">
            {/* <Text
            style={{
              color: "#fff",
              textShadow: "0px 0px 10px #fcba03",
            }}
          >
            <h1 className="text-Libra text-3xl font-poppins font-bold text-center uppercase ">
              {listPredict.data?.zodiac.name}
            </h1>
          </Text> */}
            <div className="auto-rows-max gap-2 justify-items-center">
              <div className="flex justify-between">
                <div className="bg-before-white rounded-2xl w-[50%] text-white">
                  <div
                    className="lg:px-5 lg:py-3 p-1 self-center lg:text-[18px] text-[14px] uppercase  font-bold"
                    style={{
                      color: `${user.get_customer?.zodiac.color_web_second}`,
                    }}
                  >
                    Màu may mắn
                  </div>
                  <p className="justify-self-center self-start text-center">
                    {expectedData?.color_lucky}
                  </p>
                </div>

                <div className="bg-before-white rounded-2xl w-[50%] text-white">
                  <div
                    className="lg:px-5 lg:py-3 p-1 self-center lg:text-[18px] text-[14px] uppercase font-bold"
                    style={{
                      color: `${user.get_customer?.zodiac.color_web_second}`,
                    }}
                  >
                    Số may mắn
                  </div>
                  <p className="justify-self-center self-start text-center">
                    {expectedData?.number_lucky}
                  </p>
                </div>
              </div>

              <div>
                <div className=" bg-before-white rounded-2xl w-full text-white">
                  <div
                    className="lg:px-5 lg:py-3 p-1 self-center text-[18px] uppercase font-bold"
                    style={{
                      color: `${user.get_customer?.zodiac.color_web_second}`,
                    }}
                  >
                    Cung hoàng đạo may mắn
                  </div>
                  <p className="justify-self-center self-start text-center">
                    {expectedData?.zodiac_lucky}
                  </p>
                </div>
              </div>

              <div>
                <div className=" bg-before-white rounded-2xl  w-full text-white">
                  <div
                    className="lg:px-5 lg:py-3 p-1 self-center text-[18px] uppercase  font-bold"
                    style={{
                      color: `${user.get_customer?.zodiac.color_web_second}`,
                    }}
                  >
                    Dự báo trong ngày
                  </div>
                  <p className="justify-self-center self-start text-justify px-7">
                    {expectedData?.expected}
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-before-white rounded-2xl w-full  text-white ">
                  <div
                    className="lg:px-5 lg:py-3 p-1 self-center text-[18px] uppercase font-bold"
                    style={{
                      color: `${user.get_customer?.zodiac.color_web_second}`,
                    }}
                  >
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
      </div>
    </Spin>
  );
};
export default PredictHistoryViewManager;
