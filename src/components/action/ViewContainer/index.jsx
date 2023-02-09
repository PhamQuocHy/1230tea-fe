import React from "react";
import { PageHeader } from "antd";
import { useHistory } from "react-router-dom";

function ViewContainer(props) {
  const history = useHistory();
  const { title, children, back } = props;

  return (
    <div style={{ backgroundColor: "#fff", padding: 20, borderRadius: 6 }}>
      {back ? (
        <PageHeader onBack={() => history.goBack()} title={title} style={{ padding: 0}} />
      ) : (
        <h2>{title}</h2>
      )}
      {children}
    </div>
  );
}

export default ViewContainer;
