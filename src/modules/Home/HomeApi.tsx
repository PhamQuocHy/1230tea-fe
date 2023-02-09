import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import {
  saveListFloorHome,
  saveListItemMenu,
  saveListOrderService,
  saveListRoomBooked,
  saveListRoomReport,
  saveListServiceRoom,
  saveListStatusRoom,
  saveListUnit,
} from "./HomeState";
import { url } from "../../utils/ApiUrl";
import {
  hideLoading,
  showLoading,
} from "../../components/LoadingView/LoadingState";
import { NoticationView } from "../../utils/NotificationView";
import { v4 as uuid } from "uuid";

 