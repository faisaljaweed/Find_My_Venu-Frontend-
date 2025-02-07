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
import Home_all_product from "./Pages/Client/Home_all_product";
import Detail_all_product from "./Pages/Client/Detail_all_product";
import Booking_update from "./Pages/Client/Booking_update";
import Protected_Routes from "./Protected_Routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      {/* Start Client Routes */}
      <Route path="/" element={<Client_Dashboard />}>
        <Route path="/" element={<Home />} />
        <Route path="luxury-villa" element={<Home_all_product />} />
        <Route path="luxury-villa/:id" element={<Detail_all_product />} />
        <Route
          path="luxury-villa/:id/booking-update"
          element={<Booking_update />}
        />
      </Route>
      {/* end Client Routes */}
      {/* Start Admin Routes */}
      <Route element={<Protected_Routes role="admin" />}>
        <Route path="/admin_dashboard" element={<Admin_Dashboard />}>
          <Route path="add_vendor" element={<Add_Vendor />} />
        </Route>
      </Route>
      {/* end Admin Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Start Vendor Routes */}
      <Route element={<Protected_Routes role="vendor" />}>
        <Route path="/vendor_dashboard" element={<Vendor_Dashboard />}>
          <Route path="add_product" element={<Add_Product />} />
          <Route path="check_booking" element={<h1>Check Booking</h1>} />
          <Route path="booking_details" element={<h1>Booking Details</h1>} />
        </Route>
      </Route>
      {/* end Vendor Routes */}
      <Route path="/verify-email" element={<Verify_Email />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<Reset_Password />} />
    </Route>
  )
);
export default router;
