import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "../Cart/cartStore";
import { placeOrder } from "../api/order";
import { validate, AREAS } from "./validate";
import Field from "./Field";

function Checkout() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);

  const total = useMemo(
    () =>
      items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items],
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverErrors, setServerErrors] = useState({});

  const errors = validate(form);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setServerError("");

    setServerErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) {
      return;
    }

    const currentErrors = validate(form);

    if (Object.keys(currentErrors).length > 0) {
      setTouched({
        name: true,
        phone: true,
        area: true,
        notes: true,
      });

      const firstError = Object.keys(currentErrors)[0];

      document.getElementById(firstError)?.focus();

      return;
    }

    setSubmitting(true);
    setServerError("");
    setServerErrors({});

    try {
      const order = await placeOrder(form);

      navigate(`/orders/${order.id}`, {
        replace: true,
      });
    } catch (error) {
      if (error.status === 422) {
        const fieldErrors = error.fieldErrors || {};

        setServerErrors(fieldErrors);

        setTouched((current) => ({
          ...current,
          ...Object.keys(fieldErrors).reduce(
            (result, field) => ({
              ...result,
              [field]: true,
            }),
            {},
          ),
        }));

        const firstServerError = Object.keys(fieldErrors)[0];

        if (firstServerError) {
          document.getElementById(firstServerError)?.focus();
        }
      } else {
        setServerError("We could not place your order. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <p className="checkout-total">
          Your total: <strong>{total} ETB</strong>
        </p>

        {serverError && (
          <p role="alert" className="server-error">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Field
            id="name"
            label="Name"
            error={serverErrors.name || errors.name}
            touched={touched.name}
          >
            {(showError) => (
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!showError}
                aria-describedby={showError ? "name-error" : undefined}
                autoComplete="name"
              />
            )}
          </Field>

          <Field
            id="phone"
            label="TeleBirr phone"
            error={serverErrors.phone || errors.phone}
            touched={touched.phone}
          >
            {(showError) => (
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!showError}
                aria-describedby={showError ? "phone-error" : undefined}
                autoComplete="tel"
                placeholder="09XXXXXXXX"
              />
            )}
          </Field>

          <Field
            id="area"
            label="Delivery area"
            error={serverErrors.area || errors.area}
            touched={touched.area}
          >
            {(showError) => (
              <select
                id="area"
                name="area"
                value={form.area}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!showError}
                aria-describedby={showError ? "area-error" : undefined}
              >
                {AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field
            id="notes"
            label="Notes (optional)"
            error={errors.notes}
            touched={touched.notes}
          >
            {(showError) => (
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!showError}
                aria-describedby={showError ? "notes-error" : undefined}
                maxLength={200}
                rows={4}
              />
            )}
          </Field>

          <button type="submit" disabled={submitting}>
            {submitting ? "Sending your order…" : `Order — ${total} ETB`}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
