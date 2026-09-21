import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments = JSON.parse(
      localStorage.getItem("autocare-appointments") || "[]"
    );

    setAppointments(savedAppointments);
  }, []);

  function cancelAppointment(id) {
    const updatedAppointments = appointments.map(
      (appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status: "Cancelled",
            }
          : appointment
    );

    setAppointments(updatedAppointments);

    localStorage.setItem(
      "autocare-appointments",
      JSON.stringify(updatedAppointments)
    );
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">YOUR BOOKINGS</p>

          <h1>My Appointments</h1>

          <p>
            View and manage your vehicle service appointments.
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="empty-state">
            <h2>No appointments yet</h2>

            <p>
              Book a service and your appointment will appear here.
            </p>

            <Link
              to="/services"
              className="button primary"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <article
                className="appointment-card"
                key={appointment.id}
              >
                <div>
                  <span className="service-category">
                    {appointment.status}
                  </span>

                  <h2>{appointment.serviceName}</h2>

                  <p>
                    Vehicle: {appointment.vehicle}
                  </p>

                  <p>
                    Date: {appointment.date}
                  </p>

                  <p>
                    Time: {appointment.time}
                  </p>

                  {appointment.notes && (
                    <p>
                      Notes: {appointment.notes}
                    </p>
                  )}
                </div>

                {appointment.status !== "Cancelled" && (
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() =>
                      cancelAppointment(appointment.id)
                    }
                  >
                    Cancel
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Appointments;