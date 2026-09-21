import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError(
        "Please enter your name, email, and password."
      );
      return;
    }

    login(form.name, form.email);

    navigate("/", {
      replace: true,
    });
  }

  return (
    <section className="page">
      <div className="container form-page">
        <div className="page-heading">
          <p className="eyebrow">ACCOUNT</p>

          <h1>Sign In</h1>

          <p>
            Sign in to book services and manage your AutoCare account.
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <label>
            Name

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Email

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          <button
            type="submit"
            className="button primary"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;