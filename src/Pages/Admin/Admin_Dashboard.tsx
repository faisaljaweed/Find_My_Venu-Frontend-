import { NavLink, Outlet } from "react-router-dom";
import Logout from "../../Logout/logout";

const Admin_Dashboard = () => {
  return (
    <>
      <div className="flex justify-between">
        <h1>Admin Dashboard</h1>
        <NavLink to="/admin_dashboard/add_vendor">Add Vendor</NavLink>
        <Logout />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Admin_Dashboard;
