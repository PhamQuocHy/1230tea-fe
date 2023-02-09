import { notification } from "antd";

export function NoticationView(type: any, message: any, description: any) {
  if (type === false) {
    console.log("a");
    return notification.error({
      message: message,
      description: description,
    });
  } else {
    return notification.success({
      message: message,
      description: description,
    });
  }
}
