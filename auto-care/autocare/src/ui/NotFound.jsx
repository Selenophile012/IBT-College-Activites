import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page">
      <div className="container not-found">
        <p className="eyebrow">404 ERROR</p>

        <h1>Page Not Found</h1>

        <p>The page you are looking for does not exist.</p>

        <Link to="/" className="button primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
