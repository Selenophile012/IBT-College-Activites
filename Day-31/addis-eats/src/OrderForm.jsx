import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert(`Order for ${form.name} is ready for delivery.`);
  }

  const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delivery Information</h2>

      <div>
        <label>Name</label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>

      <div>
        <label>TeleBirr Phone</label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX or +2519XXXXXXXX"
        />

        {form.phone && !validPhone && (
          <p className="err">
            Use 09… or +2519…
          </p>
        )}
      </div>

      <div>
        <label>Area</label>

        <select
          name="area"
          value={form.area}
          onChange={handleChange}
        >
          <option value="Bole">Bole</option>
          <option value="Piassa">Piassa</option>
          <option value="Kazanchis">Kazanchis</option>
          <option value="Megenagna">Megenagna</option>
          <option value="CMC">CMC</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!validPhone}
      >
        Pay with TeleBirr
      </button>
    </form>
  );
}

export default OrderForm;