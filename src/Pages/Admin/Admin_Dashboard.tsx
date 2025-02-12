import { Outlet } from "react-router-dom";
// import Logout from "../../Logout/logout";
import Header from "./Headers";

const Admin_Dashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <Header />
        <main className="w-full md:flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin_Dashboard;
