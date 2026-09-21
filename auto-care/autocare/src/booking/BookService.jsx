import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getServiceById } from "../api/serviceApi";

function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);

  const [form, setForm] = useState({
    vehicle: "",
    date: "",
    time: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getServiceById(serviceId).then((data) => {
      setService(data);
    });
  }, [serviceId]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.vehicle || !form.date || !form.time) {
      setError("Please enter your vehicle, date, and time.");
      return;
    }

    const existingAppointments = JSON.parse(
      localStorage.getItem("autocare-appointments") || "[]"
    );

    const appointment = {
      id: Date.now(),
      serviceId,
      serviceName: service?.name || serviceId,
      vehicle: form.vehicle,
      date: form.date,
      time: form.time,
      notes: form.notes,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "autocare-appointments",
      JSON.stringify([
        ...existingAppointments,
        appointment,
      ])
    );

    setError("");
    setSuccess(true);

    setTimeout(() => {
      navigate("/appointments");
    }, 800);
  }

  if (!service) {
    return (
      <section className="page">
        <div className="container">
          <div className="state-message">
            <p>Loading service...</p>
          </div>
        </div>
      </section>
    );
  }

  if (success) {
    return (
      <section className="page">
        <div className="container">
          <div className="state-message">
            <h1>Booking Successful!</h1>

            <p>
              Your {service.name} appointment has been created.
            </p>

            <p>
              Redirecting you to your appointments...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container form-page">
        <div className="page-heading">
          <p className="eyebrow">BOOK A SERVICE</p>

          <h1>Book {service.name}</h1>

          <p>
            Schedule your vehicle service appointment.
          </p>
        </div>

        <div className="booking-summary">
          <strong>{service.name}</strong>

          <span>
            {service.price.toLocaleString()} ETB
          </span>

          <span>{service.duration}</span>
        </div>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <label>
            Vehicle
            <input
              type="text"
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              placeholder="e.g. Toyota Corolla 2020"
            />
          </label>

          <label>
            Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </label>

          <label>
            Time
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
            />
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Describe any problem or special request..."
              rows="5"
            />
          </label>

          <button
            type="submit"
            className="button primary"
          >
            Confirm Booking
          </button>

          <Link
            to={`/services/${serviceId}`}
            className="button secondary"
          >
            Back to Service
          </Link>
        </form>
      </div>
    </section>
  );
}

export default BookService;