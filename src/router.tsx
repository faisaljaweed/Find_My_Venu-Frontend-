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
import Booking_Detail from "./Pages/Vendor/Booking";
import Check_Booking from "./Pages/Vendor/Check_Booking";
import BookingResponse from "./Pages/Vendor/Booking_response";
import Add_Booking from "./Pages/Vendor/Add_Booking";
import User_Details from "./Pages/Admin/User_Details";
import Check_Booking_Details from "./Pages/Admin/Check_Booking_Details";
import Check_Product_details from "./Pages/Admin/Check_Product_details";

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
          <Route path="user-detail" element={<User_Details />} />
          <Route
            path="check-booking-detail"
            element={<Check_Booking_Details />}
          />
          <Route
            path="check-product-detail"
            element={<Check_Product_details />}
          />
        </Route>
      </Route>
      {/* end Admin Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Start Vendor Routes */}
      <Route element={<Protected_Routes role="vendor" />}>
        <Route path="/vendor_dashboard" element={<Vendor_Dashboard />}>
          <Route path="add_product" element={<Add_Product />} />
          <Route path="check_booking" element={<Check_Booking />} />
          <Route path="booking_details" element={<Booking_Detail />} />
          <Route path="add-booking" element={<Add_Booking />} />
          <Route path="booking-response" element={<BookingResponse />} />
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
