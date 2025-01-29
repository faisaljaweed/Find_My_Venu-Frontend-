import { NavLink, Outlet } from "react-router-dom";
import Header from "../../Components/Header";

const Client_Dashboard = () => {
  return (
    <>
      <div>
        <Header />
        {/* <NavLink to="/">Home </NavLink>
        <NavLink to="/about">About </NavLink>
        <NavLink to="/contact">Contact </NavLink> */}
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Client_Dashboard;
