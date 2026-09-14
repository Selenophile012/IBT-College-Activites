import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="status-message">
          Loading product...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page">
        <div className="error-message">
          <h2>Product not found</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/products")}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="details-container">
        <div className="details-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="details-content">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <p className="details-description">
            {product.description}
          </p>

          <p className="details-price">
            ${product.price.toFixed(2)}
          </p>

          <p className="details-rating">
            ⭐ {product.rating}
          </p>

          <p>
            Stock available: {product.stock}
          </p>

          <div className="details-actions">
            <button
              className="cart-button"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <Link
              to="/products"
              className="details-button"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;