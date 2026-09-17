import { useAuth } from "./auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "./Cart/cartStore";

function Checkout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const total = useCartStore((state) =>
    state.items.reduce((sum, dish) => sum + dish.price, 0),
  );

  function placeOrder(e) {
    e.preventDefault();

    alert("Order placed successfully!");

    clear();

    navigate("/menu", {
      replace: true,
    });
  }

  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      <p>Signed in as: {user?.phone}</p>

      <h3>Order Summary</h3>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((dish, index) => (
            <p key={`${dish.id}-${index}`}>
              {dish.name} - {dish.price} ETB
            </p>
          ))}

          <h3>Total: {total} ETB</h3>
        </>
      )}

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

        <button type="submit">Place Order</button>
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
