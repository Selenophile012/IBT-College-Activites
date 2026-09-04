import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { useState } from "react";

import { useAuth } from "../auth/AuthContext";

function Login() {
  const [phone, setPhone] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const from =
    location.state?.from?.pathname ?? "/menu";

  function handleSubmit(e) {
    e.preventDefault();

    if (!phone) {
      return;
    }

    login(phone);

    navigate(from, {
      replace: true
    });
  }

  return (
    <section className="login-page">
      <h2>Sign In</h2>

      <p>
        Sign in to continue to checkout.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">
          Phone Number
        </label>

        <input
          id="phone"
          type="tel"
          value={phone}
          placeholder="09XXXXXXXX"
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <button type="submit">
          Sign In
        </button>
      </form>
    </section>
  );
}

export default Login;