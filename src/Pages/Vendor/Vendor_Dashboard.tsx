import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Vendor_Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <main className="w-full md:flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Vendor_Dashboard;
