import { Link } from "react-router-dom";
import { useCartStore } from "./Cart/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <h2>Your Cart</h2>

        <p>Your cart is empty.</p>

        <Link to="/menu" className="button">
          Go to Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>

      {items.map((item, index) => (
        <div key={`${item.id}-${index}`}>
          <h3>{item.name}</h3>

          <p>{item.price} ETB</p>

          <button type="button" onClick={() => remove(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: {total} ETB</h3>

      <Link to="/checkout" className="button">
        Checkout
      </Link>
    </section>
  );
}

export default Cart;
