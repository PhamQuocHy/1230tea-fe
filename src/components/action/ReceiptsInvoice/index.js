import { Col, Layout, Row } from "antd";
import moment from "moment";
import "moment/locale/vi";
import { getText } from "number-to-text-vietnamese";
import React from "react";
import NumberFormat from "react-number-format";
import "./style.css";

class ReceiptsInvoice extends React.PureComponent {
  render() {
    const { invoice } = this.props;
    const date = moment().format("LL").toString();
    return (
      <Layout ref={(el) => (this.componentRef = el)} className="invoice layout">
        <Row gutter={24}>
          <Col span={9}>
            <div className="text-center">
              <h4 className="mb-0 content-2 text-uppercase">
                <strong>CTY CP NHKS ANH ĐÀO MEKONG 2</strong>
              </h4>
              <p className="mb-0 heading-2 text-uppercase">ANH ĐÀO MEKONG 2</p>
              <p className="mb-0 content-3 mb-5">
                <strong>08 Xuân Thủy, P. An Bình, Q.NK, TPCT</strong>
              </p>
              <p className="mb-0 content-3">
                <strong>MST: 1801246511</strong>
              </p>
            </div>
          </Col>
          <Col span={6}>
            <div className="text-center">
              <h2 className="heading-0 mb-5 text-uppercase">
                <strong>{invoice?.ql_loai_phieu_thu_chi_ten}</strong>
              </h2>
              <div className="content-1 content-center mb-5">
                <span>Số: {invoice?.ql_phieu_thu_chi_ma}</span>
              </div>
              <p className="content-1 mb-0">
                <em>{"Ngày " + date}</em>
              </p>
            </div>
          </Col>
          <Col span={9}>
            <div className="text-center">
              <h4 className="mb-5 heading-2">
                <strong>Mẫu số 01</strong>
              </h4>
              <p className="content-3 mb-10">
                (Ban hành theo QĐ số 48/2006/QĐ-BTC ngày 14/9/2006 của Bộ trưởng
                BTC)
              </p>
              <p className="content-2 text-left mb-0">
                <strong>Quyển sổ: {invoice?.ql_phieu_thu_chi_quyen_so}</strong>
              </p>
              <ul>
                <li className="content-center-between content-2">
                  <strong>Nợ: {invoice?.ql_phieu_thu_chi_no} </strong>{" "}
                  <span></span>
                </li>
                <li className="content-center-between content-2">
                  <strong>Có: {invoice?.ql_phieu_thu_chi_co} </strong>{" "}
                  <span></span>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <table className="table-info content-1 mb-5">
              <tbody>
                <tr>
                  <td>Họ tên người nộp tiền:</td>
                  <td>
                    <strong>
                      {invoice?.name
                        ? invoice.name
                        : invoice.ql_phieu_thu_chi_nguoi_nop_nhan_tien}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Địa chỉ</td>
                  <td>
                    {invoice?.address_company
                      ? invoice?.address_company
                      : "8 Xuân Thuỷ, P.An Bình, Q.Ninh Kiều, TP, Cần Thơ"}
                  </td>
                </tr>
                <tr>
                  <td>Đơn vị công tác</td>
                  <td>
                    <strong className="mr-50 text-uppercase">
                      CTY CP NHKS ANH ĐÀO MEKONG 2
                    </strong>
                    <span>MST: </span>
                  </td>
                </tr>
                <tr>
                  <td>Nội dung nộp tiền</td>
                  <td>
                    {invoice?.service_name} -{" "}
                    {invoice?.ql_loai_phieu_thu_chi_ten}
                  </td>
                </tr>
                <tr>
                  <td>Số tiền</td>
                  <td>
                    <strong>
                      <NumberFormat
                        value={invoice?.ql_phieu_thu_chi_so_tien_thu || 0}
                        displayType="text"
                        thousandSeparator
                        suffix=" đồng"
                      />{" "}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Viết bằng chữ</td>
                  <td>
                    <p className="letter-uppercase">
                      <em>
                        {getText(invoice?.ql_phieu_thu_chi_so_tien_thu || 0)}{" "}
                        đồng
                      </em>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <div className="content-center-between content-1 mb-10">
              <span>Kèm theo: {invoice?.ql_phieu_thu_chi_kem_theo}</span>
              <span>
                Chứng từ gốc: {invoice?.ql_phieu_thu_chi_chung_tu_goc}
              </span>
            </div>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <div className="text-right content-1 mb-15">
              <em>{"Ngày " + date}</em>
            </div>
          </Col>
        </Row>
        <Row wrap={false} className="mb-80">
          <Col flex="auto">
            <div className="text-center content-1">
              <strong className="d-block">Giám đốc</strong>
              <em className="d-block">(Ký, họ tên, đóng dấu)</em>
            </div>
          </Col>
          <Col flex="auto">
            <div className="text-center content-1">
              <strong className="d-block">Kế toán</strong>
              <em className="d-block">(Ký, họ tên)</em>
            </div>
          </Col>
          <Col flex="auto">
            <div className="text-center content-1">
              <strong className="d-block">Người nộp tiền</strong>
              <em className="d-block">(Ký, họ tên)</em>
            </div>
          </Col>
          <Col flex="auto">
            <div className="text-center content-1">
              <strong className="d-block">Người lập phiếu</strong>
              <em className="d-block">(Ký, họ tên)</em>
            </div>
          </Col>
          <Col flex="auto">
            <div className="text-center content-1">
              <strong className="d-block">Thủ quỹ</strong>
              <em className="d-block">(Ký, họ tên)</em>
            </div>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <div className="content-1 content-desc">
              <div className="content-title">
                Đã nhận đủ số tiền{" "}
                <em>
                  (viết bằng chữ):{" "}
                  {getText(invoice?.ql_phieu_thu_chi_so_tien_thu || 0)} đồng
                </em>
              </div>
              {/* <div className="line-dashed"></div>
              <div className="line-dashed mb-0"></div> */}
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}
export default ReceiptsInvoice;
