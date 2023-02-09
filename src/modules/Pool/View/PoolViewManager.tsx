import React, { useEffect, useState } from "react";
import TableAction from "../../../components/action/TableAction";
import TablesComponent from "../../../components/action/TablesComponent/TablesComponent";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { convertOptions } from "../../../utils/common";
import {
  Divider,
  Row,
  Select,
  Space,
  Tag,
  Input,
  Button,
  InputNumber,
} from "antd"; 
import ModalComponentPool from "../Modal/ModalComponentPool";
import { permisionUser, stringAlways } from "../../../utils/contanst";
import AdvancedSearchForm from "../../../components/action/AdvancedSearchForm";
import { useForm } from "antd/lib/form/Form";
import { formatNumberToMoney } from "../../../utils/numbers";
const { Option } = Select;
const PoolViewManager: React.FC = () => {
  return(<></>);
};

export default PoolViewManager;
  