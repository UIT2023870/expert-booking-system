import { useState } from "react";
import API from "../services/api";

const statusBadge = {
    Pending:   "badge-warning",
    Confirmed: "badge-success",
    Completed: "badge",
};

function MyBookings() {

    const [email, setEmail] = useState("");
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");

    const fetchBookings = async () => {
        try {
            const res = await API.get(
                `/bookings?email=${email}`
            );
            setBookings(res.data.bookings);
            setMessage("");
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to fetch bookings"
            );
        }
    };

    return (
        <div className="page">

            <h1>My Bookings</h1>
            <p style={{ marginBottom: "20px" }}>Enter your email to view your sessions</p>

            <div className="search-row">
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-primary" onClick={fetchBookings}>
                    Search
                </button>
            </div>

            {message && <p className="alert alert-error">{message}</p>}

            {bookings.length === 0 && !message && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "#f1f5f9",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "20px 24px",
                    marginTop: "28px",
                    color: "var(--text)",
                    fontSize: "15px",
                }}>
                    <span style={{ fontSize: "20px" }}>ℹ️</span>
                    <span>No bookings to show.</span>
                </div>
            )}

            <div className="grid">
                {bookings.map((booking) => (
                    <div key={booking._id} className="card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <h3>{booking.expertId?.name}</h3>
                            <span className={`badge ${statusBadge[booking.status] || ""}`}>
                                {booking.status}
                            </span>
                        </div>
                        <span className="badge" style={{ marginBottom: "10px" }}>
                            {booking.expertId?.category}
                        </span>
                        <p>📅 {booking.date}</p>
                        <p>🕐 {booking.timeSlot}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default MyBookings;
