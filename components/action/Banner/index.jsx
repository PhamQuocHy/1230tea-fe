import { PageHeader } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Banner = () => {

  return (
    <PageHeader
      className="site-page-header"
      title={title}
      breadcrumb={{ routes }}
    />
  );
};

export default Banner;
