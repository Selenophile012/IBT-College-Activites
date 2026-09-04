import { useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

function Dish({ name, price, category, spicy, onAdd }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
    onAdd(price);
  }

  return (
    <Card>
      <h3>{name}</h3>

      <p>
        {price} ETB · {category}
      </p>

      {spicy === true && <span> Spicy</span>}

      <div>
        <button onClick={handleAdd}>Add</button>

        <span> Ordered: {count}</span>
      </div>
    </Card>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  spicy: false,
};

export default Dish;