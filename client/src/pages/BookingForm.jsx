import { useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";

function BookingForm() {

  const location = useLocation();

  const {
    expertId,
    date: prefilledDate,
    timeSlot,
  } = location.state;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: prefilledDate || "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.phone.trim())
      newErrors.phone = "Phone is required";
    else if (!/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid phone number";

    if (!formData.date)
      newErrors.date = "Date is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      const bookingData = {
        expertId,
        timeSlot,
        ...formData,
      };

      const res = await API.post("/bookings", bookingData);
      setMessage(res.data.message);
      setIsError(false);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Booking failed"
      );
      setIsError(true);
    }
  };

  return (
    <div className="page">

      <h1>Book a Session</h1>
      <p style={{ marginBottom: "20px" }}>Fill in your details to confirm the booking</p>

      <div className="info-strip">
        <span>📅 {prefilledDate}</span>
        <span>🕐 {timeSlot}</span>
      </div>

      <div className="form-wrap">
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+91 00000 00000"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="form-error">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="form-error">{errors.date}</p>}
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              name="notes"
              placeholder="Anything you'd like the expert to know..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Confirm Booking
          </button>

        </form>

        {message && (
          <p className={`alert ${isError ? "alert-error" : "alert-success"}`}>
            {message}
          </p>
        )}
      </div>

    </div>
  );
}

export default BookingForm;
