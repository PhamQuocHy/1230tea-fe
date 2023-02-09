import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    // icon-Travelagencyfacili, icon-massage, icon-Pool, icon-restaurant, icon-brokenlink, icon-Bed, icon-payment, icon-Bed, icon-empty1, icon-Date_time
    "//at.alicdn.com/t/font_2586906_3qeh042pdxg.js",
  ],
});

const CustomIcon = ({ name, size }) => {
  let fontSize = "16px";
  if (size === "large") {
    fontSize = "64px";
  }
  if (size === "medium") {
    fontSize = "32px";
  }
  if (size === "small") {
    fontSize = "24px";
  }
  return <IconFont type={name} style={{ fontSize }} />;
};

export default CustomIcon;
