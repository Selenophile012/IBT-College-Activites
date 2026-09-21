import { useState } from "react";
import Modal from "./ui/Modal";
import PropTypes from "prop-types";
import Card from "./Card";

function Dish({ id, name, price, category, spicy, addItem }) {
  if (
    id === 1 &&
    new URLSearchParams(window.location.search).get("crashDish") === "1"
  ) {
    throw new Error("Deliberate Day 34 dish render error");
  }

  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
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
  <button type="button" onClick={() => setModalOpen(true)}>
    Details
  </button>;
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
        {modalOpen && (
          <Modal title={name} onClose={() => setModalOpen(false)}>
            <p>Category: {category}</p>

            <p>Price: {price} ETB</p>

            {spicy && <p>🌶️ This dish is spicy.</p>}

            <button type="button" onClick={handleAdd}>
              Add to cart
            </button>
          </Modal>
        )}
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
