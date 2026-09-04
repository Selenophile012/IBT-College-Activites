import { Link, useParams } from "react-router-dom";
import dishes from "./data";

function DishDetail() {
  const { id } = useParams();

  const dish = dishes.find(
    (item) => String(item.id) === String(id)
  );

  if (!dish) {
    return (
      <section className="not-found">
        <h2>Dish Not Found</h2>

        <p>No dish called "{id}" was found.</p>

        <Link to="/menu" className="button">
          Back to Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="dish-detail">
      <Link to="/menu" className="back-link">
        ← Back to Menu
      </Link>

      <div className="dish-detail-card">
        <h2>{dish.name}</h2>

        <p className="category">
          Category: {dish.category}
        </p>

        <p className="price">
          {dish.price} ETB
        </p>

        {dish.spicy && (
          <span className="spicy-badge">
            🌶️ Spicy
          </span>
        )}

        <p>
          Enjoy this delicious Ethiopian dish from Addis Eats.
        </p>
      </div>
    </section>
  );
}

export default DishDetail;