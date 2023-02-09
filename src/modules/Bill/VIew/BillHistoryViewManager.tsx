/* eslint-disable jsx-a11y/alt-text */
import { Button, Divider, Input, Row, Space, Tag } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import moment from "moment";
import ModalComponentBill from "../Modal/ModalComponentBill";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { destroyBill, getListBill, editBill, storeBill } from "../BillApi";
import TablesComponent from "../../../components/action/TablesComponent/TablesComponent";
import TableAction from "../../../components/action/TableAction";
import { stringAlways, tableName } from "../../../utils/contanst";
import { useForm } from "antd/lib/form/Form";
import AdvancedSearchForm from "../../../components/action/AdvancedSearchForm";
import Text from "antd/lib/typography/Text";
import { convertOptions } from "../../../utils/common";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";

const BillHistoryViewManager: React.FC = () => {
  const dispatch = useAppDispatch();

  //form
  const [formSearch] = useForm();

  //useAppSelect
  const listBill = useAppSelector((state) => state.bill.listBill);

  const user = useAppSelector((state) => state.login.user);

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
  const [thisBill, setThisBill] = useState<any>({});

  //Search
  const initVal = {
    phone: user?.phone || "0389606380",
    date_from: "2022-01-01",
    date_to: moment().format("YYYY-MM-DD"),
  };
  const [params, setParms] = useState(initVal);

  const columnSearch = [
    {
      label: "Mã",
      type: "input",
      key: "code",
    },
    {
      label: "Lọc theo ngày",
      type: "date-range",
      key: "date",
    },
    {
      label: "Trạng thái",
      type: "select",
      key: "status",
      data: convertOptions([
        {
          id: 1,
          name: "Đã thanh toán",
        },
        {
          id: 2,
          name: "Chưa thanh toán",
        },
      ]),
    },
  ];

  async function loadData() {
    try {
      const paramsGet = {
        ...params,
        page: JSON.stringify(params) === "{}" ? pagination.page : 1,
      };

      const resultBill: any = await dispatch(getListBill(paramsGet));

      if (resultBill.payload.action) {
        setPagination({
          ...pagination,
          total: resultBill.payload.total,
          page: resultBill.payload.page,
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadData();
  }, [pagination.page, params]);

  async function apiStore(data: any) {
    const resultStore = await dispatch(
      storeBill({
        data: {
          name: data.name,
          describe: data.describe ? data.describe : null,
          status: data.status,
        },
      })
    );
    if (resultStore.payload) {
      setOpenModal(false);
      if (pagination.page === 1) {
        loadData();
      } else {
        setPagination({
          ...pagination,
          page: 1,
        });
      }
    }
  }

  async function apiDestroy(Bill: any) {
    const resultDestroy = await dispatch(
      destroyBill({
        id: Bill.id,
      })
    );
    if (resultDestroy.payload) {
      if (pagination.page === 1) {
        loadData();
      } else {
        setPagination({
          ...pagination,
          page: 1,
        });
      }
    }
  }

  async function apiEdit(Bill: any, data: any) {
    const resultEdit = await dispatch(
      editBill({
        id: Bill.id,
        data: {
          name: data.name,
          describe: data.describe ? data.describe : null,
          status: data.status,
        },
      })
    );
    if (resultEdit.payload) {
      if (pagination.page === 1) {
        loadData();
      } else {
        setPagination({
          ...pagination,
          page: 1,
        });
      }
    }
  }

  function submitModal(action: any, Bill: any, data: any) {
    if (action === stringAlways.add) {
      apiStore(data);
    } else if (action === stringAlways.edit) {
      apiEdit(Bill, data);
      setOpenModal(false);
    }
  }

  function chooseData(thisChoose: any, action: string) {
    if (action === stringAlways.add) {
      setOpenModal(true);
      setThisBill({});
      setAction(action);
      setTitalModal(stringAlways.more);
    } else if (action === stringAlways.edit) {
      setOpenModal(true);
      setThisBill({ ...thisChoose });
      setAction(action);
      setTitalModal(stringAlways.update);
    } else {
      apiDestroy(thisChoose);
    }
  }

  function onSearch(value: any) {
    setParms({
      phone: user?.phone,
      date_from: value.date ? value.date[0].format("YYYY-MM-DD") : "",
      date_to: value.date ? value.date[1].format("YYYY-MM-DD") : "",
    });
  }

  function setEmpty() {
    setParms(initVal);
    setPagination({
      ...pagination,
      page: 1,
    });
  }

  function onChangePage(value: any) {
    if (pagination.page === 1) {
      setPagination({
        ...pagination,
        page: value.current,
      });
    } else {
      setPagination({
        ...pagination,
        page: value.current,
      });
      setPagination({
        ...pagination,
        page: 1,
      });
    }
  }
  function detailBill(data: any) {
    setOpenModal(true);
    setTitalModal("Chi tiết đơn hàng");
    setThisBill(data);
  }

  return (
    <>
      <div className="flex flex-col">
        <Space direction="vertical" style={{ width: "100%", flex: 1 }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {" "}
              Lịch sử đơn hàng{" "}
            </p>

            <AdvancedSearchForm
              searchItems={columnSearch}
              onSearch={onSearch}
              form={formSearch}
              setEmpty={setEmpty}
            />

            <TablesComponent
              btn={stringAlways.tbnAddNew}
              Tablename="Danh sách Tầng"
              Navname="Quản lý tầng"
              data={listBill}
              panigation={pagination}
              onChangePage={onChangePage}
              chooseData={chooseData}
              checkedAdd={false}
              keyColumn={[
                {
                  title: "STT",
                  dataIndex: "idx",
                  key: "idx",
                  width: 70,
                  align: "center",
                  render: (_: any, __: any, index: number) => index + 1,
                },
                {
                  title: "Mã giao dịch",
                  dataIndex: "code",
                  key: "id",
                  align: "center",
                  render: (
                    _: any,
                    record: {
                      invoice: any;
                      code:
                        | boolean
                        | React.ReactChild
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }
                  ) => {
                    return <Text>{record?.invoice.code}</Text>;
                  },
                },
                {
                  title: "Ngày giao dịch",
                  dataIndex: "date",
                  key: "id",
                  align: "center",
                  render: (
                    _: any,
                    record: {
                      date:
                        | boolean
                        | React.ReactChild
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }
                  ) => {
                    return <Text>{record?.date}</Text>;
                  },
                },
                {
                  title: "Tổng tiền",
                  dataIndex: "total",
                  key: "total",
                  align: "center",
                  render: (
                    _: any,
                    record: {
                      invoice: any;
                      total:
                        | boolean
                        | React.ReactChild
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }
                  ) => {
                    return <Text>{record?.invoice.formatted_total}</Text>;
                  },
                },
                {
                  title: "Phương thức thanh toán",
                  dataIndex: "payment_type",
                  key: "payment",
                  align: "center",
                  render: (
                    _: any,
                    record: {
                      invoice: any;
                      type:
                        | boolean
                        | React.ReactChild
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }
                  ) => {
                    return <Text>{record?.invoice.payment_type_desc}</Text>;
                  },
                },
                {
                  title: "Chi nhánh",
                  dataIndex: "branch",
                  key: "id",
                  align: "center",
                  render: (
                    _: any,
                    record: {
                      branch: any;
                      address: any;
                    }
                  ) => {
                    return <Text>{record?.branch.address}</Text>;
                  },
                },
                {
                  title: "Chi tiết",
                  dataIndex: "action",
                  key: "action",
                  align: "center",
                  render: (_: any, record: any) => (
                    <Button
                      type="primary"
                      onClick={() => detailBill(record)}
                      shape="round"
                    >
                      <EyeOutlined />
                    </Button>
                  ),
                },
              ]}
            />
          </div>
        </Space>

        <ModalComponentBill
          action={action}
          title={titleModal}
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          submitModal={submitModal}
          data={thisBill}
        />
      </div>
    </>
  );
};
export default BillHistoryViewManager;
