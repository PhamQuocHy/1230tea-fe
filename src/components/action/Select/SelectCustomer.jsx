import { Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import customerApi from "../../apis/customerApi";
import genderApi from "../../apis/genderApi";
import nationApi from "../../apis/nationApi";
import { notifcationAction } from "../../utils";
import ModalFormCustomer from "./components/ModalFormCustomer";
import SelectCustom from "./components/SelectCustom";

const SelectCustomerType = ({ innerProps }) => {
  const { formOuter } = innerProps;

  const form = Form.useForm();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [genders, setGenders] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (() => fetchData(isMounted))();
    (() => fetchGender(isMounted))();
    (() => fetchCountry(isMounted))();
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchData = async (isMounted = true) => {
    try {
      if (isMounted) {
        const { data } = await customerApi.getAll();
        setData(data?.customers?.data || []);
      }
    } catch (error) {
      notifcationAction("error", "Thông báo", error.message);
    }
  };

  const fetchCountry = async (isMounted = true) => {
    try {
      if (isMounted) {
        const { data } = await nationApi.getCmb();
        setCountries(data?.data || []);
      }
    } catch (error) {
      notifcationAction("error", "Thông báo", error.message);
    }
  };

  const fetchGender = async (isMounted = true) => {
    try {
      if (isMounted) {
        const { data } = await genderApi.getAll();
        setGenders(data?.genders || []);
      }
    } catch (error) {
      notifcationAction("error", "Thông báo", error.message);
    }
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await customerApi.add(values);
      const result = {
        customer_id: data?.customer?.id,
      };
      fetchData(true);
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
      <ModalFormCustomer
        form={form}
        isOpen={open}
        loading={loading}
        genders={genders}
        submited={onSubmit}
        countries={countries}
        closedModal={onCloseModal}
      />
    </Fragment>
  );
};

export default SelectCustomerType;
