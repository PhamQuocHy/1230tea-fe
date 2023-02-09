import React, { ReactChildren, ReactComponentElement } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { RootState, store } from "./redux/store";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SiderDemo from "./app/index2";
import { Layout } from "antd";
import BillHistoryViewManager from "./modules/Bill/VIew/BillHistoryViewManager";
import CustomerHistoryViewManager from "./modules/Customer/VIew/CustomerHistoryViewManager";
import TopSellView from "./modules/Home/View/TopSellView";
import PredictViewManager from "./modules/Predict/View/PredictViewManager";
import ForgotPasswordPage from "./modules/Auth/pages/ForgotPasswordPage";
import LoginPage from "./modules/Auth/pages/Login";
import ForgotPassword from "./modules/Auth/pages/ForgotPassword";
import OtpVerify from "./modules/Auth/pages/OtpVerify";
import ResetPassword from "./modules/Auth/pages/ResetPassword";
import RegisterPage from "./modules/Auth/pages/RegisterPage";
import RegisterPhone from "./modules/Auth/pages/RegisterPhone";
import RegisterInformation from "./modules/Auth/pages/RegisterInformation";
import ZodiacViewManager from "./modules/Predict/View/ZodiacViewManager";
import NumerologyViewManager from "./modules/Predict/View/NumerologyViewManager";
import OrderViewManager from "./modules/Order/View/OrderViewManager";

import OrderTemplate from "./app/OrderTemplate";

// import "antd/dist/antd.css";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.rootReducer.auth.token);

  const AuthWraper = ({ children }: any) => {
    return token ? children : <Navigate to={"/order"} />;
  };

  const LoginWraper = ({ children }: any) => {
    return !token ? children : <Navigate to={"/"} />;
  };

  return (
    <Routes>
      <Route
        path={"/login"}
        element={
          <LoginWraper>
            <LoginPage />
          </LoginWraper>
        }
      />
      <Route path={"/register"} element={<RegisterPage />}>
        <Route path={""} element={<RegisterPhone />} />
        <Route path={"otp"} element={<OtpVerify />} />
        <Route path={"information"} element={<RegisterInformation />} />
      </Route>
      <Route
        path={"/forgot-password"}
        element={
          <LoginWraper>
            <ForgotPasswordPage />
          </LoginWraper>
        }
      >
        <Route path={""} element={<ForgotPassword />} />
        <Route path={"otp"} element={<OtpVerify />} />
        <Route path={"reset"} element={<ResetPassword />} />
      </Route>
      <Route path={"/index"} element={<Navigate to={"/"} />} />
      <Route path={"/order"} element={<OrderTemplate />}>
        <Route path={""} element={<OrderViewManager />} />
      </Route>
      <Route
        path={"/"}
        element={
          <AuthWraper>
            <SiderDemo />
          </AuthWraper>
        }
      >
        <Route path={"bill-history"} element={<BillHistoryViewManager />} />
        <Route
          path={"customer-info"}
          element={<CustomerHistoryViewManager />}
        />
        <Route path={""} element={<OrderViewManager />} />
        <Route path={"predict"} element={<PredictViewManager />} />
        <Route path={"zodiac"} element={<ZodiacViewManager />} />
        <Route path={"numerology"} element={<NumerologyViewManager />} />
        <Route path={"home"} element={<TopSellView />} />
      </Route>
    </Routes>
  );
};

export default App;
