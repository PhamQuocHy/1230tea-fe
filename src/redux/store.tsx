import {
  configureStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "@reduxjs/toolkit"; // defaults to localStorage for web
import logger from "redux-logger";
import home from "../modules/Home/HomeState";
import loading from "../components/LoadingView/LoadingState";
import pool from "../modules/Pool/PoolState";
import login from "../modules/Auth/LoginState";
import bill from "../modules/Bill/BillState";
import history from "../modules/history/HistoryState";
import customer from "../modules/Customer/CustomerState";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import predict from "../modules/Predict/PredictState";
import order from "../modules/Order/OrderState";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      version: 1,
      storage,
    },
    login
  ),
  order: persistReducer(
    {
      key: "order",
      version: 1,
      storage,
    },
    order
  ),
  history: persistReducer(
    {
      key: "history",
      version: 1,
      storage,
    },
    history
  ),
});

export const store = configureStore({
  reducer: {
    home,
    loading,
    pool,
    rootReducer,
    bill,
    login,
    predict,
    customer,
  },

  devTools: process.env.NODE_ENV !== "production",
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
