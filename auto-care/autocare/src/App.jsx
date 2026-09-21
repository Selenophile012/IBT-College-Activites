import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import RequireAuth from "./auth/RequireAuth";

import Home from "./home/Home";
import Services from "./services/Services";
import ServiceDetails from "./services/ServiceDetails";
import BookService from "./booking/BookService";
import Appointments from "./appointments/Appointments";
import Vehicle from "./vehicle/Vehicle";
import Login from "./auth/Login";
import NotFound from "./ui/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="services" element={<Services />} />

        <Route
          path="services/:id"
          element={<ServiceDetails />}
        />

        <Route element={<RequireAuth />}>
          <Route
            path="book/:serviceId"
            element={<BookService />}
          />
        </Route>

        <Route
          path="appointments"
          element={<Appointments />}
        />

        <Route
          path="vehicle"
          element={<Vehicle />}
        />

        <Route path="login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;