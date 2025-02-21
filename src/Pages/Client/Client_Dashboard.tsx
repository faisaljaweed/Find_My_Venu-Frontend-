import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Client_Dashboard = () => {
  return (
    <>
      <div>{/* <Header /> */}</div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Client_Dashboard;
