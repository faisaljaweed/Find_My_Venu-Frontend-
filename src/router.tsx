import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorPage from "./error_page";
import Admin_Dashboard from "./Pages/Admin/Admin_Dashboard";
import Client_Dashboard from "./Pages/Client/Client_Dashboard";
import Vendor_Dashboard from "./Pages/Vendor/Vendor_Dashboard";
import Login from "./Login/login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Login />} />
      <Route path="/admin_dashboard" element={<Admin_Dashboard />} />
      <Route path="/client_dashboard" element={<Client_Dashboard />} />
      <Route path="/vendor_dashboard" element={<Vendor_Dashboard />} />
    </Route>
  )
);
export default router;
