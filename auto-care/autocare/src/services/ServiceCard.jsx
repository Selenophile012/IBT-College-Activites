import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <span className="service-category">
        {service.category}
      </span>

      <h2>{service.name}</h2>

      <p>{service.description}</p>

      <div className="service-meta">
        <strong>{service.price.toLocaleString()} ETB</strong>
        <span>{service.duration}</span>
      </div>

      <Link
        to={`/services/${service.id}`}
        className="button primary"
      >
        View Details
      </Link>
    </article>
  );
}

export default ServiceCard;