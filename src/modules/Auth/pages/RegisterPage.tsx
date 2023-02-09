import React from "react";
import { Outlet } from "react-router";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div
      className={
        "container min-w-full static bg-no-repeat bg-cover min-h-full bg-gradient-to-br from-Tertiary10 via-primary10 to-primary0 flex flex-col "
      }
    >
      <Outlet />
    </div>
  );
};

export default RegisterPage;
