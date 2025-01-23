import { NavLink, Outlet } from "react-router-dom";
import Logout from "../../Logout/logout";

const Vendor_Dashboard = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1> Vendor Dashboard</h1>
        <Logout />
        <NavLink to="/vendor_dashboard/add_product">Add Product</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Vendor_Dashboard;
