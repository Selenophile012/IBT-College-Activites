import { useEffect, useState } from "react";

function Vehicle() {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    plate: "",
    mileage: "",
  });

  const [saved, setSaved] = useState(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedVehicle = localStorage.getItem("autocare-vehicle");

    if (savedVehicle) {
      setVehicle(JSON.parse(savedVehicle));
    }

    const appointments = JSON.parse(
      localStorage.getItem("autocare-appointments") || "[]",
    );

    setHistory(
      appointments.filter((appointment) => appointment.status !== "Cancelled"),
    );
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setVehicle((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();

    localStorage.setItem("autocare-vehicle", JSON.stringify(vehicle));

    setSaved(true);
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-heading">
          <p className="eyebrow">YOUR VEHICLE</p>

          <h1>My Vehicle</h1>

          <p>
            Manage your vehicle information and view its maintenance history.
          </p>
        </div>

        <div className="vehicle-card">
          <h2>Vehicle Information</h2>

          <form className="vehicle-form" onSubmit={handleSave}>
            <label>
              Make
              <input
                type="text"
                name="make"
                value={vehicle.make}
                onChange={handleChange}
                placeholder="Toyota"
              />
            </label>

            <label>
              Model
              <input
                type="text"
                name="model"
                value={vehicle.model}
                onChange={handleChange}
                placeholder="Corolla"
              />
            </label>

            <label>
              Year
              <input
                type="number"
                name="year"
                value={vehicle.year}
                onChange={handleChange}
                placeholder="2020"
              />
            </label>

            <label>
              License Plate
              <input
                type="text"
                name="plate"
                value={vehicle.plate}
                onChange={handleChange}
                placeholder="AA-12345"
              />
            </label>

            <label>
              Current Mileage
              <input
                type="number"
                name="mileage"
                value={vehicle.mileage}
                onChange={handleChange}
                placeholder="50000"
              />
            </label>

            <button type="submit" className="button primary">
              Save Vehicle
            </button>

            {saved && (
              <p className="success-message">
                Vehicle information saved successfully.
              </p>
            )}
          </form>
        </div>

        <div className="history-card">
          <h2>Service History</h2>

          {history.length === 0 ? (
            <div className="empty-history">
              <p>No service history yet.</p>

              <p>Your completed or booked services will appear here.</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((appointment) => (
                <article className="history-item" key={appointment.id}>
                  <div>
                    <h3>{appointment.serviceName}</h3>

                    <p>{appointment.vehicle}</p>
                  </div>

                  <div>
                    <p>{appointment.date}</p>

                    <span className="status">{appointment.status}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Vehicle;
