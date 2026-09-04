import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function placeOrder(e) {
    e.preventDefault();

    alert("Order placed successfully!");

    navigate("/menu", {
      replace: true
    });
  }

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      <p>
        Signed in as: {user?.phone}
      </p>

      <form onSubmit={placeOrder}>
        <label>
          Delivery Name
          <input type="text" required />
        </label>

        <label>
          Delivery Area
          <select defaultValue="Bole">
            <option>Bole</option>
            <option>Piassa</option>
            <option>Megenagna</option>
            <option>CMC</option>
            <option>Kazanchis</option>
          </select>
        </label>

        <button type="submit">
          Place Order
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </section>
  );
}

export default Checkout;