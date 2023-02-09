import { PageHeader } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Breadcrumbs = () => {
  const title = useSelector((state) => state.setting.pageTitle);
  const routes = useSelector((state) => state.setting.routes);

  return (
    <PageHeader
      className="site-page-header"
      title={title}
      breadcrumb={{ routes }}
    />
  );
};

export default Breadcrumbs;
