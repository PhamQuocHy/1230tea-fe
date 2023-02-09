import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import React from "react";
import { stringAlways } from "../../../utils/contanst";

function TableAction(props) {
  const { data, isRead, isDeleted, onEdit, onDelete, record } = props;

  return (
    <Space size="middle">
      {isRead && (
        <Tooltip title={stringAlways.detail}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit(record, stringAlways.edit)}
            style={{ alignItems: "center", height: 22, borderRadius: 5 }}
          >
            {stringAlways.update}
          </Button>
        </Tooltip>
      )}
      {isDeleted && data.length >= 1 && (
        <Popconfirm
          okText={stringAlways.confirm}
          cancelText={stringAlways.close}
          title="Bạn có muốn xóa mục này ?"
          onConfirm={() => onDelete(record?.id || record?.ql_phieu_nhap_kho_id)}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Tooltip title={stringAlways.destroy}>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size="small"
              danger
              style={{ alignItems: "center", height: 22, borderRadius: 5 }}
            >
              {stringAlways.destroy}
            </Button>
          </Tooltip>
        </Popconfirm>
      )}
    </Space>
  );
}

TableAction.defaultProps = {
  loading: false,
};

export default TableAction;
