import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Tabs, Empty, Row } from 'antd';
import { BarsOutlined, CalendarOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
interface TabPaneProps {
  title: any;
  viewFlort?: any,
  viewRight: any
}
const TabPanes: React.FC<TabPaneProps> = ({
  title,
  viewFlort,
  viewRight
}) => {

  const OperationSlot = {
    right:
      <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {viewRight}
      </div>
  }

  return (
    <Tabs defaultActiveKey="1" tabBarExtraContent={OperationSlot}>
      <TabPane
        tab={
          <span>
            <BarsOutlined />
            {title[0]}
          </span>
        }
        key="1"
      >
        <div>
          {viewFlort[0]}
        </div>
      </TabPane>
      <TabPane
        tab={
          <span>
            <CalendarOutlined />
            {title[1]}

          </span>
        }
        key="2"
      >
        <Empty />

      </TabPane>
      <TabPane
        tab={
          <span>
            <CalendarOutlined />
            {title[2]}

          </span>
        }
        key="3"
      >
        <Empty />

      </TabPane>

    </Tabs>

  )
}
export default TabPanes;
