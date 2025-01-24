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
import Signup from "./Signup/signup";
import Verify_Email from "./Login/Verify_Email";
import { Add_Vendor } from "./Pages/Admin/Add_Vendor";
import Add_Product from "./Pages/Vendor/Add_Product";
import Home from "./Pages/Client/Home";
import Reset_Password from "./Login/Reset_Password";
import ForgotPassword from "./Login/forgot_password";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      {/* Start Client Routes */}
      <Route path="/" element={<Client_Dashboard />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<h1>About Us</h1>} />
        <Route path="contact" element={<h1>Contact Us</h1>} />
      </Route>
      {/* end Client Routes */}
      {/* Start Admin Routes */}
      <Route path="/admin_dashboard" element={<Admin_Dashboard />}>
        <Route path="add_vendor" element={<Add_Vendor />} />
      </Route>
      {/* end Admin Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Start Vendor Routes */}
      <Route path="/vendor_dashboard" element={<Vendor_Dashboard />}>
        <Route path="add_product" element={<Add_Product />} />
      </Route>
      {/* end Vendor Routes */}
      <Route path="/verify-email" element={<Verify_Email />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<Reset_Password />} />
    </Route>
  )
);
export default router;
