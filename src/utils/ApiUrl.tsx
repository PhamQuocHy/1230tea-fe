const HOST = "1230teaapi.alphasoftware.vn";
export const API_URL = `http://${HOST}/api`;

export const url = {
  // ------------------------------- Auth -------------------------------
  LOGIN: `${API_URL}/auth/login-web`,
  LOGOUT: `${API_URL}/auth/logout`,
  AUTH_CHECK_PHONE: `${API_URL}/auth/check-phone`,
  AUTH_REGISTER_WEB: `${API_URL}/auth/register-web`,
  AUTH_FORGET_PASSWORD: `${API_URL}/auth/forget-password`,
  AUTH_NEW_OTP: `${API_URL}/auth/new-otp`,
  AUTH_VERIFY_OTP: `${API_URL}/auth/verify-otp`,
  AUTH_NEW_PASSWORD: `${API_URL}/auth/new-password`,

  // ------------------------------- Product Zodiac -------------------------------

  PRODUCT_ZODIAC_INDEX: `${API_URL}/product-zodiac/index`,

  // ------------------------------- Order Web Telegram -------------------------------

  ORDER_WEB_TELEGRAM: `${API_URL}/orderWebTelegram`,

  // ------------------------------- Bill -------------------------------
  Bill_INDEX: `${API_URL}/search-history-purchase`,
  EDIT_Bill: `${API_URL}/Bill/edit`,
  DELETE_Bill: `${API_URL}/Bill/delete`,
  ADD_Bill: `${API_URL}/Bill/store`,

  // ------------------------------- Predict -------------------------------};
  PREDICT_INDEX: `${API_URL}/get-customer-by-phone?`,
};
