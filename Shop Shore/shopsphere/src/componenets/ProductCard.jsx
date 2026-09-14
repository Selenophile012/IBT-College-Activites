import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="product-image-real"
      />

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.title}</h3>

        <p className="product-price">
          ${product.price.toFixed(2)}
        </p>

        <p className="rating">
           {product.rating}
        </p>

        <div className="product-actions">
          <Link
            to={`/products/${product.id}`}
            className="details-button"
          >
            View Details
          </Link>

          <button
            className="cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;