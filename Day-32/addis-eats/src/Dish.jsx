import { useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";

function Dish({ id, name, price, category, spicy, addItem }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);

    addItem({
      id,
      name,
      price,
      category,
      spicy,
    });
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
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  spicy: PropTypes.bool,
  addItem: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  spicy: false,
};

export default Dish;