import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getServiceById } from "../api/serviceApi";

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadService() {
      setLoading(true);

      const data = await getServiceById(id);

      if (active) {
        setService(data);
        setLoading(false);
      }
    }

    loadService();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
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

  if (!service) {
    return (
      <section className="page">
        <div className="container">
          <div className="state-message">
            <h1>Service not found</h1>

            <p>
              The service you are looking for does not exist.
            </p>

            <Link
              to="/services"
              className="button primary"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container detail-page">
        <p className="eyebrow">{service.category}</p>

        <h1>{service.name}</h1>

        <p className="hero-text">
          {service.description}
        </p>

        <div className="detail-card">
          <h2>Service Information</h2>

          <p>
            <strong>Price:</strong>{" "}
            {service.price.toLocaleString()} ETB
          </p>

          <p>
            <strong>Duration:</strong>{" "}
            {service.duration}
          </p>
        </div>

        <div className="detail-card">
          <h2>What's Included?</h2>

          <ul>
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <Link
          to={`/book/${service.id}`}
          className="button primary"
        >
          Book This Service
        </Link>
      </div>
    </section>
  );
}

export default ServiceDetails;