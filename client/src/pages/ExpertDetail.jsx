import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import API from "../services/api";

function ExpertDetail() {

    const { id } = useParams();
    const [expert, setExpert] = useState(null);
    const socket = useSocket();
    const [bookedSlots, setBookedSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchExpert = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/experts/${id}`);
                setExpert(res.data.expert);
            } catch (error) {
                setError("Failed to fetch expert");
            } finally {
                setLoading(false);
            }
        };
        fetchExpert();
    }, [id]);

    useEffect(() => {
        socket.on("slotBooked", (data) => {
            // Check same expert
            if (data.expertId === expert?._id) {
                setBookedSlots((prev) => [
                    ...prev,
                    `${data.date}-${data.timeSlot}`,
                ]);
            }
        });
        return () => {
            socket.off("slotBooked");
        };
    }, [socket, expert]);

    if (loading) return <div className="page"><p>Loading...</p></div>;
    if (error)   return <div className="page"><p className="alert alert-error">{error}</p></div>;
    if (!expert) return <div className="page"><p>No expert found</p></div>;

    return (
        <div className="page">

            <div className="expert-hero">
                <span className="badge">{expert.category}</span>
                <h1>{expert.name}</h1>
                <p style={{ marginTop: "6px" }}>{expert.bio}</p>
                <div className="expert-meta">
                    <span>🎓 {expert.experience} years experience</span>
                    <span>⭐ {expert.rating} rating</span>
                </div>
            </div>

            <h2>Available Slots</h2>

            {expert.availableSlots.map((slotData, index) => (
                <div key={index} className="slots-group">
                    <h3>📅 {slotData.date}</h3>
                    <div className="slots-wrap">
                        {slotData.slots.map((slot, idx) => (
                            <button
                                key={idx}
                                className="slot-btn"
                                disabled={
                                    bookedSlots.includes(
                                        `${slotData.date}-${slot}`
                                    )
                                }
                                onClick={() =>
                                    navigate("/book", {
                                        state: {
                                            expertId: expert._id,
                                            date: slotData.date,
                                            timeSlot: slot,
                                        },
                                    })
                                }
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
}

export default ExpertDetail;
