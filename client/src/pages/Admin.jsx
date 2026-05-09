import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAll = async () => {
        try {
            setLoading(true);
            const res = await API.get("/bookings/all");
            setBookings(res.data.bookings);
        } catch (err) {
            setError("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await API.patch(`/bookings/${id}/status`, { status });
            setBookings((prev) =>
                prev.map((b) =>
                    b._id === id ? { ...b, status } : b
                )
            );
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update status");
        }
    };

    if (loading) return <div className="page"><p>Loading...</p></div>;
    if (error)   return <div className="page"><p className="alert alert-error">{error}</p></div>;

    return (
        <div className="page">

            <h1>Admin — All Bookings</h1>
            <p style={{ marginBottom: "8px" }}>Manage and update booking statuses</p>

            {bookings.length === 0 && <p style={{ marginTop: "20px" }}>No bookings found.</p>}

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Expert</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.name}</td>
                                <td>{booking.email}</td>
                                <td>{booking.phone}</td>
                                <td>{booking.expertId?.name}</td>
                                <td>{booking.expertId?.category}</td>
                                <td>{booking.date}</td>
                                <td>{booking.timeSlot}</td>
                                <td>
                                    <select
                                        value={booking.status}
                                        onChange={(e) =>
                                            handleStatusChange(booking._id, e.target.value)
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Admin;
