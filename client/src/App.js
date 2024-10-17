import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import RentalList from "./components/RentalList";
import AvailableCars from "./components/AvailableCars";
import RentCar from "./components/RentCar";
import Login from "./components/Login";
import AdminNavbar from "./components/AdminNav";
import Admin from "./components/Admin";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isAdminPage = currentPath.includes("admin");

  return (
    <div className="App">
      {isAdminPage ? (
        <div>
          <AdminNavbar />
        </div>
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/available-cars" element={<AvailableCars />} />
        <Route path="/rentals" element={<RentalList />} />
        <Route path="/rent-car" element={<RentCar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
