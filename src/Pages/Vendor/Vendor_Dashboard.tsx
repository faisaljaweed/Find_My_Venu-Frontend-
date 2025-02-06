import { Outlet } from "react-router-dom";
import Header from "./Header";

const Vendor_Dashboard = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Vendor_Dashboard;
