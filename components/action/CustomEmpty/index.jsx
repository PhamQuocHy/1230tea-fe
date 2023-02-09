import React from "react";
import { Empty, Typography } from "antd";
const {Text} = Typography;

function CustomEmpty({ title }) {
  return (
    <Empty
      imageStyle={{
        height: 40,
      }}
      className="flex flex-col justify-center items-center"
      description={<Text style={{color: '#949faa'}}>{title}</Text>}
    />
  );
}

export default CustomEmpty;
