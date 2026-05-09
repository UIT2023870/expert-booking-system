import { Routes, Route, Link, useLocation } from "react-router-dom";

import Experts from "./pages/Experts";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
import ExpertDetail from "./pages/ExpertDetail";
import Admin from "./pages/Admin";

function App() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">⚡ ExpertBook</Link>
          <div className="navbar-links">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Experts</Link>
            <Link to="/my-bookings" className={location.pathname === "/my-bookings" ? "active" : ""}>My Bookings</Link>
            <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>Admin</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Experts />} />
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
