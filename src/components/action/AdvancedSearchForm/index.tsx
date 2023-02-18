import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Divider,
  FloatButton,
} from "antd";

import { HiOutlineTrash } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";

import PropTypes from "prop-types";
import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { formatNumberToMoney } from "../../../utils/numbers";
import { removeVietnameseTones } from "../../../utils/string";
import "./style.scss";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../redux/hook";
interface AdvancedSearchFormProps {
  searchItems: any;
  onSearch: (value: any) => void;
  form: any;
  onValuesChange?: (value: any) => void;
  setEmpty?: (value: any) => void;
  districsState?: any;
  warpState?: any;
  clearValue?: (values: any) => void;
}

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  searchItems,
  onSearch,
  form,
  onValuesChange,
  setEmpty,
  districsState,
  warpState,
  clearValue,
}) => {
  const dateFormat = "DD/MM/YYYY";
  const dateTimeFormat = "DD/MM/YYYY HH:mm:ss";

  useEffect(() => {
    if (districsState != undefined && warpState != undefined) {
      if (districsState.length === 0) {
        form.setFieldsValue({ dicstrict: undefined });
      } else if (warpState.length === 0) {
        form.setFieldsValue({ ward: undefined });
      }
    }
  }, [districsState, warpState]);

  const infoUser = useAppSelector((state) => state.rootReducer.auth.user);

  const getFields = () => {
    let xhtml = null;
    let breakpoints = [24, 24, 12, 8, 8, 6];

    if (searchItems.length === 1) {
      breakpoints = [24, 24, 24, 24, 24, 24];
    } else if (searchItems.length === 2) {
      breakpoints = [24, 24, 24, 12, 12, 12];
    } else if (searchItems.length === 3) {
      breakpoints = [24, 24, 12, 8, 8, 8];
    }

    xhtml = searchItems.map((searchItem: any) => {
      return (
        <Col
          xs={breakpoints[0]}
          sm={breakpoints[1]}
          md={breakpoints[2]}
          lg={breakpoints[5]}
          xl={breakpoints[5]}
          xxl={breakpoints[5]}
          key={searchItem.key}
        >
          {searchItem.type === "input" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <Input placeholder={searchItem.placeholder} />
            </Form.Item>
          )}
          {searchItem.type === "fortmat-number" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <Input
                placeholder={searchItem.placeholder}
                value={formatNumberToMoney(searchItem.key)}
              />
            </Form.Item>
          )}
          {searchItem.type === "number" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <NumberFormat customInput={Input} thousandSeparator />
            </Form.Item>
          )}
          {searchItem.type === "input-number" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <NumberFormat customInput={Input} />
            </Form.Item>
          )}
          {searchItem.type === "select" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <Select
                options={searchItem.data}
                allowClear
                showSearch
                filterOption={(inputValue, option: any) => {
                  return (
                    removeVietnameseTones(
                      option.name ? option.name : option.label
                    )
                      .toLowerCase()
                      .indexOf(
                        removeVietnameseTones(inputValue).toLowerCase()
                      ) >= 0
                  );
                }}
              />
            </Form.Item>
          )}
          {searchItem.type === "select-multi" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <Select
                options={searchItem.data}
                allowClear
                mode="multiple"
                showSearch
                filterOption={(inputValue, option: any) => {
                  return (
                    removeVietnameseTones(option.name)
                      .toLowerCase()
                      .indexOf(
                        removeVietnameseTones(inputValue).toLowerCase()
                      ) >= 0
                  );
                }}
              />
            </Form.Item>
          )}
          {searchItem.type === "date" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <DatePicker
                format={dateFormat}
                style={{ width: "100%" }}
                placeholder="Chọn thời gian"
              />
            </Form.Item>
          )}
          {searchItem.type === "date-time" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <DatePicker format={dateTimeFormat} showTime />
            </Form.Item>
          )}
          {searchItem.type === "date-range" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <DatePicker.RangePicker
                format={dateFormat}
                placeholder={["Bắt đầu", "Kết thúc"]}
              />
            </Form.Item>
          )}
          {searchItem.type === "select-address" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <Select
                allowClear
                options={searchItem.data}
                onClear={() => {
                  if (searchItem.key === "province_id") {
                    form.setFieldsValue({ dicstrict_id: undefined });
                    form.setFieldsValue({ ward_id: undefined });
                    // clearValue(searchItem.key);
                  } else if (searchItem.key === "dicstrict_id") {
                    form.setFieldsValue({ ward_id: undefined });
                    // clearValue(searchItem.key);
                  }
                }}
                showSearch
                filterOption={(inputValue, option: any) => {
                  return (
                    removeVietnameseTones(option.name)
                      .toLowerCase()
                      .indexOf(
                        removeVietnameseTones(inputValue).toLowerCase()
                      ) >= 0
                  );
                }}
              />
            </Form.Item>
          )}
        </Col>
      );
    });
    return xhtml;
  };

  return (
    <div
      style={{
        margin: "15px 0",
        borderBottom: `1px solid ${infoUser?.get_customer?.zodiac.color_web_second}`,
      }}
    >
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        onFinish={onSearch}
        onValuesChange={onValuesChange}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "left" }}>
            <Button
              // shape="round"
              style={{
                marginRight: "8px",
                color: infoUser?.get_customer?.zodiac.color_web_first,
                backgroundColor:
                  infoUser?.get_customer?.zodiac.color_web_second,
                border: `2px solid ${infoUser?.get_customer?.zodiac.color_web_second}`,
              }}
              className="font-medium hover:opacity-80"
              onClick={() => {
                form.resetFields();
                // setEmpty();
              }}
            >
              <HiOutlineTrash className="text-[16px] relative top-[3px] mr-1" />
              Làm mới
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                color: infoUser?.get_customer?.zodiac.color_web_second,
                border: `2px solid ${infoUser?.get_customer?.zodiac.color_web_second}`,
              }}
              className="bg-transparent font-medium hover:opacity-80"
              // shape="round"
            >
              <BsSearch className="text-[16px] relative top-[3px] mr-1" />
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
    </div>
  );
};

// AdvancedSearchForm.propTypes = {
//   searchItems: PropTypes.array,
// };

// AdvancedSearchForm.defaultProps = {
//   searchItems: [],
// };

export default AdvancedSearchForm;
