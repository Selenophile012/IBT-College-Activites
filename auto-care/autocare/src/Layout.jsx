import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "./auth/AuthContext";

function Layout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <Link to="/" className="logo">
            AutoCare
          </Link>

          <nav className="nav">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/services">
              Services
            </NavLink>

            <NavLink to="/appointments">
              Appointments
            </NavLink>

            <NavLink to="/vehicle">
              My Vehicle
            </NavLink>

            {isAuthenticated ? (
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            ) : (
              <NavLink to="/login">
                Sign In
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            © 2026 AutoCare. Vehicle maintenance.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;