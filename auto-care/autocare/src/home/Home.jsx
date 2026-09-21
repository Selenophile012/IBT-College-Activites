import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="page">
      <div className="container hero">
        <div className="hero-content">
          <p className="eyebrow">SMART VEHICLE CARE</p>

          <h1>Take better care of your car with AutoCare.</h1>

          <p className="hero-text">
            Find reliable car services, book maintenance appointments, and keep
            your vehicle service history organized in one place.
          </p>

          <div className="hero-actions">
            <Link to="/services" className="button primary">
              Explore Services
            </Link>

            <Link to="/vehicle" className="button secondary">
              My Vehicle
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">WHY AUTOCARE?</p>
          <h2>Everything your vehicle needs</h2>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <h3>Find Services</h3>
            <p>Browse maintenance and repair services for your vehicle.</p>
          </article>

          <article className="feature-card">
            <h3>Book Appointments</h3>
            <p>Choose a service and schedule a convenient appointment.</p>
          </article>

          <article className="feature-card">
            <h3>Track Maintenance</h3>
            <p>Keep your vehicle information and service history organized.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Home;
