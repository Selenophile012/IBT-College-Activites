import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB" }) {
  return (
    <div className="dish">
      <div>
        <h3>{name}</h3>

        {spicy === true && <span>🌶️ Spicy</span>}
      </div>

      <span>
        {price} {currency}
      </span>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
};

export default Dish;
