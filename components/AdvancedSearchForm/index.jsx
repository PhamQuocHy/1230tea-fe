import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Divider,
} from "antd";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from "react-number-format";
import "./style.scss";

const AdvancedSearchForm = (props) => {
  const { searchItems, onSearch, form, onValuesChange } = props;

  const dateFormat = "DD/MM/YYYY";
  const dateTimeFormat = "DD/MM/YYYY HH:mm:ss";

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

    xhtml = searchItems.map((searchItem) => {
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
          {searchItem.type === "number" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <NumberFormat customInput={Input} thousandSeparator />
            </Form.Item>
          )}
          {searchItem.type === "select" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <Select options={searchItem.data} allowClear />
            </Form.Item>
          )}
          {searchItem.type === "select-multi" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <Select options={searchItem.data} allowClear mode="multiple" />
            </Form.Item>
          )}
          {searchItem.type === "date" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <DatePicker format={dateFormat} style={{width: '100%'}} />
            </Form.Item>
          )}
          {searchItem.type === "date-time" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <DatePicker format={dateTimeFormat} showTime />
            </Form.Item>
          )}
          {searchItem.type === "date-range" && (
            <Form.Item name={searchItem.key} label={searchItem.label}>
              <DatePicker.RangePicker format={dateFormat} />
            </Form.Item>
          )}
        </Col>
      );
    });
    return xhtml;
  };

  return (
    <div style={{ marginTop: 15 }}>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        onFinish={onSearch}
        onValuesChange={onValuesChange}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Làm rỗng
            </Button>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>
      <Divider style={{ marginTop: 15, marginBottom: 15 }} />
    </div>
  );
};

AdvancedSearchForm.propTypes = {
  searchItems: PropTypes.array,
};

AdvancedSearchForm.defaultProps = {
  searchItems: [],
};

export default AdvancedSearchForm;
