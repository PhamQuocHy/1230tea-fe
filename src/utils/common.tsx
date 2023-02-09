import { formatNumberToMoney } from "./numbers";

export function convertOptions(options: any) {
  return options.length > 0
    ? options.map((option: { name: any; unit: any; id: string }) => ({
        ...option,
        label: option.name || option.unit,
        value: typeof option.id === "string" ? parseInt(option.id) : option.id,
      }))
    : [];
}

export function convertOptionsRooms(options: any) {
  return options.length > 0
    ? options.map(
        (option: {
          name: string;
          price: any;
          unit: any;
          order_id: string;
        }) => ({
          ...option,
          label:
            option.name + "---Giá:" + formatNumberToMoney(option.price) ||
            option.unit,
          value:
            typeof option.order_id === "string"
              ? parseInt(option.order_id)
              : option.order_id,
        })
      )
    : [];
}
export function convertOptionsRole(options: any) {
  return options.length > 0
    ? options.map((option: { translate: any; unit: any; id: string }) => ({
        ...option,
        label: option.translate || option.unit,
        value: typeof option.id === "string" ? parseInt(option.id) : option.id,
      }))
    : [];
}

export function convertOptionsName(options: any[]) {
  return options.length > 0
    ? options.map((option) => ({
        ...option,
        label: option.name,
        value: option.name,
      }))
    : [];
}

export const statusRoom = {
  trong: "Trống",
  dat_truoc: "Đặt Trước",
  co_khach: "Có khách",
  dang_don: "Đang dọn",
  bao_tri: "Bảo trì",
};
