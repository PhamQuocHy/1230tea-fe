import { Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import customerTypeApi from "../../apis/customerTypeApi";
import { notifcationAction } from "../../utils";
import ModalForm from "../ModalForm";
import SelectCustom from "./components/SelectCustom";

const SelectCustomerType = ({ innerProps }) => {
  const { formOuter } = innerProps;

  const form = Form.useForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (() => fetchData(isMounted))();
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchData = async (isMounted = true) => {
    try {
      if (isMounted) {
        const { data } = await customerTypeApi.getAll();
        setData(data?.customer_types || []);
      }
    } catch (error) {
      notifcationAction("error", "Thông báo", error.message);
    }
  };

  const formItems = [
    {
      label: "Tên loại",
      key: "name",
      type: "input",
      rules: [
        {
          required: true,
          message: "Bắc buộc",
        },
      ],
    },
  ];

  const onOpenModal = () => setOpen(true);

  const onCloseModal = () => setOpen(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await customerTypeApi.add(values);
      fetchData(true);
      const result = {
        customer_type_id:
          data?.customertype &&
          data?.customertype[data?.customertype?.length - 1].id,
      };
      formOuter.setFieldsValue({
        ...formOuter.getFieldValue(),
        ...result,
      });
      setOpen(false);
    } catch (error) {
      notifcationAction("error", "Thông báo", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <SelectCustom
        innerProps={{
          data,
          onAdd: onOpenModal,
        }}
      />
      <ModalForm
        form={form}
        isOpen={open}
        loading={loading}
        submited={onSubmit}
        formItems={formItems}
        closedModal={onCloseModal}
      />
    </Fragment>
  );
};

export default SelectCustomerType;
