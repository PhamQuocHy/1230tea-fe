import { Layout } from "antd";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ChangeRoomFeature from "../../features/Dashboard/components/ChangeRoom";
import CheckIn from "../../features/Dashboard/components/CheckIn";
import MenuFeature from "../../features/CategoryManagement";
import AdditionalFeature from "../../features/CategoryManagement/AdditionalType";
import InventoryFeature from "../../features/CategoryManagement/Inventory";
import ProductsFeature from "../../features/CategoryManagement/Products";
import WarehouseFeature from "../../features/CategoryManagement/Warehouse";
import Dashboard from "../../features/Dashboard";
import BarFeature from "../../features/FacilityManagement/Bar";
import DepartmentFeature from "../../features/FacilityManagement/Department";
import FloorFeature from "../../features/FacilityManagement/Floor";
import LobbyFeature from "../../features/FacilityManagement/Lobby";
import PromotionFeature from "../../features/FacilityManagement/Promotion";
import RoomFeature from "../../features/FacilityManagement/Room";
import RoomTypeFeature from "../../features/FacilityManagement/RoomType";
import SupplierFeature from "../../features/FacilityManagement/Supplier";
import TableBookingFeature from "../../features/FacilityManagement/TableBooking";
import VoucherFeature from "../../features/FacilityManagement/Voucher";
import CustomerFeature from "../../features/HumanResourceManagement/Customer";
import CustomerTypeFeature from "../../features/HumanResourceManagement/CustomerType";
import EmployeeFeature from "../../features/HumanResourceManagement/Employee";
import WorkShiftFeature from "../../features/HumanResourceManagement/WorkShift";
import RolesFeature from "../../features/HumanResourceManagement/Roles";
import UserFeature from "../../features/HumanResourceManagement/User";
import PartyBookingFeature from "../../features/OrderManagement/PartyBooking";
import RoomsBookingFeature from "../../features/OrderManagement/RoomsBooking";

import DebtFeature from "../../features/Payment/Debt";
import ReceiptsAndExpendituresFeature from "../../features/Payment/ReceiptsAndExpenditures";

import MassageBookingFeature from "../../features/OrderManagement/MassageBooking";
import CreateMassageBookingFeature from "../../features/OrderManagement/MassageBooking/Order";
import DetailMassageBookingFeature from "../../features/OrderManagement/MassageBooking/DetailOrder";

import TourBookingFeature from "../../features/OrderManagement/TourBooking";
import CreateTourBookingFeature from "../../features/OrderManagement/TourBooking/Order";
import DetailTourBookingFeature from "../../features/OrderManagement/TourBooking/DetailOrder";

import RestaurantBookingFeature from "../../features/OrderManagement/RestaurantBooking";
import CreateRestaurantBookingFeature from "../../features/OrderManagement/RestaurantBooking/Order";
import DetailRestaurantBookingFeature from "../../features/OrderManagement/RestaurantBooking/DetailOrder";
import PoolBookingFeature from "../../features/OrderManagement/PoolBooking";
import DetailPoolBookingFeature from "../../features/OrderManagement/PoolBooking/DetailOrder";
import CreatePoolBookingFeature from "../../features/OrderManagement/PoolBooking/Order/index";

import CashShiftsFeature from "../../features/Report/CashShifts";
import RoomDentityFeature from "../../features/Report/RoomDentity";
import InventoryReportFeature from "../../features/Report/Inventory";
import RevenueReportFeature from "../../features/Report/Revenue";
import InvoicesReportFeature from "../../features/Report/Invoices";
import InvoicesDaysFeature from "../../features/Report/Invoices/InvoicesDays";
import DetailInvoiceFeature from "../../features/Report/Invoices/DetailInvoice";
import CashfundFeature from "../../features/Report/Cashfund";
import RevenueDayFeature from "../../features/Report/RevenueDay";
import TimekeepingFeature from "../../features/Report/Timekeeping";
import HandoverHistoryFeature from "../../features/Report/HandoverHistory";

import NotFound from "../NotFound";

const Content = ({ collapsed, onMenuClick, onSidebarChange }) => {
  return (
    <Layout.Content
      style={{
        paddingLeft: 24,
        paddingTop: 24,
        paddingRight: 8,
        paddingBottom: 8,
        marginTop: 40,
        marginLeft: collapsed ? 90 : 225,
        minHeight: "calc(100vh - 40px)",
      }}
    >
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/checkinRoom" component={CheckIn} />
        <Route path="/changeRoom" component={ChangeRoomFeature} />
        <Route path="/floors" component={FloorFeature} />
        <Route path="/bartable" component={TableBookingFeature} />
        <Route path="/bar" component={BarFeature} />
        <Route path="/rooms" component={RoomFeature} />
        <Route path="/room-types" component={RoomTypeFeature} />
        <Route path="/ballroom" component={LobbyFeature} />
        <Route path="/department" component={DepartmentFeature} />
        <Route path="/supplier" component={SupplierFeature} />
        <Route path="/vouchers" component={VoucherFeature} />
        <Route path="/promotions" component={PromotionFeature} />
        <Route path="/customer-type" component={CustomerTypeFeature} />
        <Route path="/customers" component={CustomerFeature} />
        <Route path="/users" component={UserFeature} />
        <Route path="/roles" component={RolesFeature} />
        <Route path="/employee" component={EmployeeFeature} />
        <Route path="/workshift" component={WorkShiftFeature} />

        <Route path="/debt" component={DebtFeature} />
        <Route
          path="/receipt-expenditures"
          component={ReceiptsAndExpendituresFeature}
        />

        <Route path="/orderbanquet" component={PartyBookingFeature} />
        <Route path="/orderRoom" component={RoomsBookingFeature} />

        <Route path="/order/massages" component={MassageBookingFeature} />
        <Route
          path="/order/massages-create"
          component={CreateMassageBookingFeature}
        />
        <Route
          path="/ordermassage/:ordermassageId"
          component={DetailMassageBookingFeature}
        />

        <Route path="/order/restaurant" component={RestaurantBookingFeature} />
        <Route
          path="/order/restaurant-create"
          component={CreateRestaurantBookingFeature}
        />
        <Route
          path="/orderrestaurant/:orderrestaurantId"
          component={DetailRestaurantBookingFeature}
        />

        <Route path="/order/tour" component={TourBookingFeature} />
        <Route path="/order/tour-create" component={CreateTourBookingFeature} />
        <Route
          path="/ordertour/:ordertourId"
          component={DetailTourBookingFeature}
        />

        <Route path="/order/pool" component={PoolBookingFeature} />
        <Route path="/order/pool-create" component={CreatePoolBookingFeature} />
        <Route
          path="/orderpool/:orderpoolId"
          component={DetailPoolBookingFeature}
        />
        <Route path="/menus" component={MenuFeature} />

        <Route path="/cashShifts" component={CashShiftsFeature} />
        <Route path="/roomDensity" component={RoomDentityFeature} />
        <Route path="/inventory" component={InventoryReportFeature} />
        <Route path="/revenue" component={RevenueReportFeature} />
        <Route path="/invoicereport" component={InvoicesReportFeature} />
        <Route path="/invoicesDays" component={InvoicesDaysFeature} />
        <Route path="/invoice/:id" component={DetailInvoiceFeature} />
        <Route path="/cashfund" component={CashfundFeature} />
        <Route path="/roombydateRevenues" component={RevenueDayFeature} />
        <Route path="/timekeeping" component={TimekeepingFeature} />

        <Route path="/handhover-history" component={HandoverHistoryFeature} />

        <Route path="/additiontype" component={AdditionalFeature} />
        <Route path="/product-management" component={ProductsFeature} />
        <Route path="/warehouse-management" component={WarehouseFeature} />
        <Route path="/inventory-management" component={InventoryFeature} />

        <Route path="*">
          <NotFound
            onMenuClick={onMenuClick}
            onSidebarChange={onSidebarChange}
          />
        </Route>
      </Switch>
    </Layout.Content>
  );
};

export default Content;
