import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="not-found">
        <span>404</span>
        <h1>Oops!</h1>
        <p>
          The page you are looking for does not exist.
        </p>

        <button onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;