import Text from "antd/lib/typography/Text";
import { ReactChild, ReactFragment, ReactPortal } from "react";

export const stringAlways = {
  //always
  confirm: "Xác nhận",
  close: "Đóng",
  more: "Thêm",
  cancel: "Hủy",
  update: "Chi tiết",
  destroy: "Xóa",
  search: "Tìm kiếm",
  empty: "Làm rỗng",
  detail: "Cập nhật",

  //ACTION
  add: "add",
  edit: "edit",
  delete: "delete",

  //btn
  tbnAddNew: "Thêm mới",
  btnPrimary: "primary",

  //time
  time_start: "Ngày bắt đầu",
  time_end: "Ngày kết thúc",

  //formatDate
  DD_MM_YYYY: "DD/MM/YYYY",
};

export const CONSTANTS = {
  TOKEN: "TOKEN_HOTEL",
  USER: "REQUEST_USER",
  HAND_ORVER: "HAND_ORVER",
  USER_ASSINGED: "USER_ASSINGED",
  GENERAL_SETTING: "GENERAL_SETTING",
};

export const HOME_BOOK_ROOM = {
  BOOK_NOW: "book_now",
  BOOK_RESEVER: "book_resever",
  CHECK_IN: "check_in",
};

export const SERVICE = {
  pool: 4,
  restaurant: 5,
  tour: 7,
  bar: 2,
  massage: 6,
  services: 8,
  room: 1,
  envent: 3,
};

export const tableMoney = {
  display: "flex",
  justifyContent: "flex-end",
};

export const tableName = {
  display: "flex",
  justifyContent: "flex-start",
};

export const permisionUser = {
  surcharge_list: "surcharge_list",
  surcharge_detail: "surcharge_detail",
  surcharge_group_store: "surcharge_group_store",
  payment_book_bar: "payment_book_bar",
  order_on_home: "order_on_home",
  surcharge_edit: "surcharge_edit",
  surcharge_store: "surcharge_store",
  surcharge_destroy: "surcharge_destroy",
  receipt_list: "receipt_list",
  receipt_detail: "receipt_detail",
  receipt_edit: "receipt_edit",
  receipt_store: "receipt_store",
  receipt_destroy: "receipt_destroy",
  ballroom_list: "ballroom_list",
  ballroom_detail: "ballroom_detail",
  ballroom_edit: "ballroom_edit",
  ballroom_store: "ballroom_store",
  ballroom_destroy: "ballroom_destroy",
  book_room_store: "book_room_store",
  book_room_list: "book_room_list",
  book_room_detail: "book_room_detail",
  book_room_edit: "book_room_edit",
  convert_hollow_room: "convert_hollow_room",
  book_room_destroy: "book_room_destroy",
  book_bar_list: "book_bar_list",
  book_bar_detail: "book_bar_detail",
  book_bar_edit: "book_bar_edit",
  book_bar_store: "book_bar_store",
  book_bar_destroy: "book_bar_destroy",
  department_list: "department_list",
  department_detail: "department_detail",
  department_edit: "department_edit",
  department_store: "department_store",
  department_destroy: "department_destroy",
  employee_list: "employee_list",
  employee_detail: "employee_detail",
  employee_edit: "employee_edit",
  employee_store: "employee_store",
  employee_destroy: "employee_destroy",
  menu_event_list: "menu_event_list",
  menu_event_detail: "menu_event_detail",
  menu_event_edit: "menu_event_edit",
  menu_event_store: "menu_event_store",
  menu_event_destroy: "menu_event_destroy",
  menu_massage_list: "menu_massage_list",
  menu_massage_detail: "menu_massage_detail",
  menu_massage_edit: "menu_massage_edit",
  menu_massage_store: "menu_massage_store",
  menu_massage_destroy: "menu_massage_destroy",
  menu_pool_list: "menu_pool_list",
  menu_pool_detail: "menu_pool_detail",
  menu_pool_edit: "menu_pool_edit",
  menu_pool_store: "menu_pool_store",
  menu_pool_destroy: "menu_pool_destroy",
  menu_restaurant_list: "menu_restaurant_list",
  menu_restaurant_detail: "menu_restaurant_detail",
  menu_restaurant_edit: "menu_restaurant_edit",
  menu_restaurant_store: "menu_restaurant_store",
  menu_restaurant_destroy: "menu_restaurant_destroy",
  menu_room_service_list: "menu_room_service_list",
  menu_room_service_detail: "menu_room_service_detail",
  menu_room_service_edit: "menu_room_service_edit",
  menu_room_service_store: "menu_room_service_store",
  menu_room_service_destroy: "menu_room_service_destroy",
  menu_bar_list: "menu_bar_list",
  menu_bar_detail: "menu_bar_detail",
  menu_bar_edit: "menu_bar_edit",
  menu_bar_store: "menu_bar_store",
  menu_bar_destroy: "menu_bar_destroy",
  promotion_list: "promotion_list",
  promotion_detail: "promotion_detail",
  promotion_edit: "promotion_edit",
  promotion_store: "promotion_store",
  promotion_destroy: "promotion_destroy",
  voucher_list: "voucher_list",
  voucher_detail: "voucher_detail",
  voucher_edit: "voucher_edit",
  voucher_store: "voucher_store",
  voucher_destroy: "voucher_destroy",
  expenditures_list: "expenditures_list",
  expenditures_detail: "expenditures_detail",
  expenditures_edit: "expenditures_edit",
  expenditures_store: "expenditures_store",
  expenditures_destroy: "expenditures_destroy",
  room_list: "room_list",
  room_detail: "room_detail",
  room_edit: "room_edit",
  room_store: "room_store",
  room_destroy: "room_destroy",
  typeroom_list: "typeroom_list",
  typeroom_detail: "typeroom_detail",
  typeroom_edit: "typeroom_edit",
  typeroom_store: "typeroom_store",
  typeroom_destroy: "typeroom_destroy",
  supplier_list: "supplier_list",
  supplier_detail: "supplier_detail",
  supplier_edit: "supplier_edit",
  supplier_store: "supplier_store",
  supplier_destroy: "supplier_destroy",
  user_list: "user_list",
  user_detail: "user_detail",
  user_edit: "user_edit",
  user_store: "user_store",
  user_destroy: "user_destroy",
  floor_destroy: "floor_destroy",
  floor_list: "floor_list",
  floor_detail: "floor_detail",
  floor_store: "floor_store",
  floor_edit: "floor_edit",
  table_edit: "table_edit",
  table_destroy: "table_destroy",
  table_store: "table_store",
  table_detail: "table_detail",
  table_list: "table_list",
  bar_list: "bar_list",
  bar_destroy: "bar_destroy",
  bar_store: "bar_store",
  bar_edit: "bar_edit",
  bar_detail: "bar_detail",
  view_map_room: "view_map_room",
  order_room_before: "order_room_before",
  order_room_now: "order_room_now",
  payment: "payment",
  change_room: "change_room",
  convert_broken_room: "convert_broken_room",
  view_list_order: "view_list_order",
  view_history_order: "view_history_order",
  list_customer_stay: "list_customer_stay",
  debt: "debt",
  fund_report: "fund_report",
  check_in: "check_in",
  customer_type_list: "customer_type_list",
  customer_type_store: "customer_type_store",
  customer_type_detail: "customer_type_detail",
  customer_type_edit: "customer_type_edit",
  customer_type_destroy: "customer_type_destroy",
  customer_list: "customer_list",
  customer_store: "customer_store",
  customer_detail: "customer_detail",
  customer_edit: "customer_edit",
  customer_destroy: "customer_destroy",
  role_list: "role_list",
  role_store: "role_store",
  role_detail: "role_detail",
  role_edit: "role_edit",
  role_destroy: "role_destroy",
  work_shift_list: "work_shift_list",
  work_shift_store: "work_shift_store",
  work_shift_detail: "work_shift_detail",
  work_shift_edit: "work_shift_edit",
  work_shift_destroy: "work_shift_destroy",
  book_event_destroy: "book_event_destroy",
  book_event_detail: "book_event_detail",
  book_event_edit: "book_event_edit",
  book_event_list: "book_event_list",
  book_event_store: "book_event_store",
  payment_book_event: "payment_book_event",
  book_massage_destroy: "book_massage_destroy",
  book_massage_detail: "book_massage_detail",
  book_massage_edit: "book_massage_edit",
  book_massage_list: "book_massage_list",
  book_massage_store: "book_massage_store",
  payment_book_massage: "payment_book_massage",
  payment_book_tour: "payment_book_tour",
  book_tour_store: "book_tour_store",
  cash_shitfs_list: "cash_shitfs_list",
  book_tour_destroy: "book_tour_destroy",
  book_tour_edit: "book_tour_edit",
  counter_bar_detail: "counter_bar_detail",
  cash_shitfs_edit: "cash_shitfs_edit",
  book_tour_list: "book_tour_list",
  room_density: "room_density",
  invoice: "invoice",
  invoice_detail: "invoice_detail",
  counter_bar_edit: "counter_bar_edit",
  invetory: "invetory",
  counter_bar_store: "counter_bar_store",
  book_restaurant_destroy: "book_restaurant_destroy",
  book_restaurant_store: "book_restaurant_store",
  cash_shitfs_detail: "cash_shitfs_detail",
  book_pool_store: "book_pool_store",
  revenue: "revenue",
  counter_bar_list: "counter_bar_list",
  book_pool_detail: "book_pool_detail",
  book_restaurant_detail: "book_restaurant_detail",
  book_restaurant_edit: "book_restaurant_edit",
  cash_fund: "cash_fund",
  book_pool_destroy: "book_pool_destroy",
  book_restaurant_list: "book_restaurant_list",
  book_tour_detail: "book_tour_detail",
  payment_book_pool: "payment_book_pool",
  room_by_date_revenues: "room_by_date_revenues",
  time_keeping: "time_keeping",
  payment_book_restaurant: "payment_book_restaurant",
  book_pool_list: "book_pool_list",
  counter_bar_destroy: "counter_bar_destroy",
  book_pool_edit: "book_pool_edit",
  menu_tour_list: "menu_tour_list",
  menu_tour_detail: "menu_tour_detail",
  menu_tour_edit: "menu_tour_edit",
  menu_tour_store: "menu_tour_store",
  menu_tour_destroy: "menu_tour_destroy",
  cancel_order_room_before: "cancel_order_room_before",
  //don vi
  unit_list: "unit_list",
  unit_store: "unit_store",
  unit_detail: "unit_detail",
  unit_edit: "unit_edit",
  unit_destroy: "unit_destroy",
  //loai san pham
  item_category_list: "item_category_list",
  item_category_store: "item_category_store",
  item_category_edit: "item_category_edit",
  item_category_destroy: "item_category_destroy",
  //san pham
  item_menu_list: "item_menu_list",
  item_menu_store: "item_menu_store",
  item_menu_edit: "item_menu_edit",
  item_menu_destroy: "item_menu_destroy",

  //dat tiec
  book_event: "book_event_list",
  //dat ho boi
  book_pool: "book_pool_list",
  //dat nha hange
  book_restaurant: "book_restaurant_list",
  //dat spa
  book_massage: "book_massage_list",
  //dat tour
  book_tour: "book_tour_list",
  //dat bar
  book_bar: "book_bar_list",
};

export const menu = [
  {
    id: 1,
    name: "Đồ ăn",
  },
  {
    id: 2,
    name: "Đồ uống",
  },
  {
    id: 3,
    name: "Khác",
  },
];

export const statusCoSo = [
  {
    id: 1,
    name: "Đang hoạt động",
  },
  {
    id: 2,
    name: "Không hoạt động",
  },
];

export const columnChooseUser: any = [
  {
    title: "Tên khách hàng",
    dataIndex: "name",
    key: "id",
    align: "center",
    width: 180,
    render: (
      _: any,
      record: {
        name:
          | boolean
          | ReactChild
          | ReactFragment
          | ReactPortal
          | null
          | undefined;
      }
    ) => {
      return (
        <div style={tableName}>
          <Text>{record?.name}</Text>
        </div>
      );
    },
  },
  {
    title: "Số điện thoại",
    dataIndex: "identity",
    key: "id",
    align: "center",
    width: 110,
    render: (
      _: any,
      record: {
        identity:
          | boolean
          | ReactChild
          | ReactFragment
          | ReactPortal
          | null
          | undefined;
      }
    ) => {
      return (
        <div style={tableMoney}>
          <Text>{record?.identity}</Text>
        </div>
      );
    },
  },
  {
    title: "CMND/ CCCD",
    dataIndex: "phone",
    key: "id",
    align: "center",
    width: 110,
    render: (
      _: any,
      record: {
        phone:
          | boolean
          | ReactChild
          | ReactFragment
          | ReactPortal
          | null
          | undefined;
      }
    ) => {
      return (
        <div style={tableMoney}>
          <Text>{record?.phone}</Text>
        </div>
      );
    },
  },
];

export const groupPermission = {
  category: "category",
  payment: "payment",
  base: "base",
  book: "book",
  staff: "staff",
  homepage: "homepage",
  report: "report",
};

export const over_time_minus = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
  {
    id: 10,
  },
  {
    id: 11,
  },
  {
    id: 12,
  },
  {
    id: 13,
  },
  {
    id: 14,
  },
  {
    id: 15,
  },
  {
    id: 16,
  },
  {
    id: 17,
  },
  {
    id: 18,
  },
  {
    id: 19,
  },
  {
    id: 20,
  },
  {
    id: 21,
  },
  {
    id: 22,
  },
  {
    id: 23,
  },
  {
    id: 24,
  },
  {
    id: 25,
  },
  {
    id: 26,
  },
  {
    id: 27,
  },
  {
    id: 28,
  },
  {
    id: 29,
  },
  {
    id: 30,
  },
  {
    id: 31,
  },
  {
    id: 32,
  },
  {
    id: 33,
  },
  {
    id: 34,
  },
  {
    id: 35,
  },
  {
    id: 36,
  },
  {
    id: 37,
  },
  {
    id: 38,
  },
  {
    id: 39,
  },
  {
    id: 40,
  },
  {
    id: 41,
  },
  {
    id: 42,
  },
  {
    id: 43,
  },
  {
    id: 44,
  },
  {
    id: 45,
  },
  {
    id: 46,
  },
  {
    id: 47,
  },
  {
    id: 48,
  },
  {
    id: 49,
  },
  {
    id: 50,
  },
  {
    id: 51,
  },
  {
    id: 52,
  },
  {
    id: 53,
  },
  {
    id: 54,
  },
  {
    id: 55,
  },
  {
    id: 56,
  },
  {
    id: 57,
  },
  {
    id: 58,
  },
  {
    id: 59,
  },
];

export const bookTime = [
  {
    id: 1,
    name: "Ngày",
  },
  {
    id: 2,
    name: "Giờ",
  },
];
