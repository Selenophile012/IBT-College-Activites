import PropTypes from "prop-types";
import Dish from "./Dish";

function Menu({ dishes, category }) {
  const shown = dishes.filter((dish) => dish.category === category);

  if (shown.length === 0) {
    return <p className="empty-state">No {category} dishes found.</p>;
  }

  return (
    <div className="menu">
      {shown.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
        />
      ))}
    </div>
  );
}

Menu.propTypes = {
  dishes: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default Menu;