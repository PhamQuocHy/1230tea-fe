import React, { useState } from "react";
// import "antd/dist/antd.css";
import { Table, Form, Space, Input, Divider, Modal, Row, Col } from "antd";
import { Button } from "antd";
import { removeVietnameseTones } from "../../../utils/string";
import { useAppSelector } from "../../../redux/hook";
import TableAction from "../TableAction";
import { v4 as uuid4 } from "uuid";

const { Search } = Input;
interface TabblessProps {
  btn?: string;
  Tablename?: string;
  Navname?: string;
  data: any;
  keyColumn: any;
  panigation?: any;
  onChangePage?: (value: any) => void;
  chooseData: (thisChoose: any, value: string) => void;
  checkedAdd?: boolean;
}
const TablesComponent: React.FC<TabblessProps> = ({
  btn,
  Tablename,
  Navname,
  data,
  keyColumn,
  onChangePage,
  panigation,
  chooseData,
  checkedAdd,
}) => {
  const loading = useAppSelector((state) => state.loading.loading);

  const columns = keyColumn;

  return (
    <>
      {checkedAdd && (
        <Row gutter={[8, 8]} style={{ marginTop: 10, marginBottom: 10 }}>
          <Col span={4}>
            <Button
              type="primary"
              style={{ borderRadius: "5px" }}
              onClick={() => chooseData({}, "add")}
            >
              <span> {btn} </span>
            </Button>
          </Col>
        </Row>
      )}

      <Table
        scroll={{ x: "max-content" }}
        dataSource={data}
        loading={loading}
        columns={columns}
        onChange={onChangePage}
        pagination={{
          total: panigation.total,
          pageSize: panigation.pageSize,
          current: panigation.page,
        }}
        rowKey={() => uuid4()}
      />
    </>
  );
};
export default TablesComponent;
