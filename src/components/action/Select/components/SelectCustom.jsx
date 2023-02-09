import React from "react";
import { Divider, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function SelectCustom({ innerProps }) {
  const { onAdd, data } = innerProps;

  return (
    <Select
      allowClear
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider className="my-1" />
          <div className="select-add__wrapper">
            <Button
              type="link"
              className="select-add__btn"
              onClick={() => onAdd()}
            >
              <PlusOutlined /> Thêm mới
            </Button>
          </div>
        </div>
      )}
    >
      {data?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}

export default SelectCustom;
