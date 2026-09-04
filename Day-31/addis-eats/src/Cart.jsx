import { Link } from "react-router-dom";

function Cart({ cart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
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

      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>
            {item.quantity} × {item.price} ETB
          </p>
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