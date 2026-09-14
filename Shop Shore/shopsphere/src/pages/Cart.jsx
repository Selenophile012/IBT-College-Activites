import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>
          <p>Add some products to your cart to see them here.</p>

          <Link to="/products" className="shop-button">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="products-header">
        <h1>Shopping Cart</h1>
        <p>Review your selected products.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>

                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Cart Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button className="checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;