import Dish from "./Dish";

function DishList({ dishes, addItem }) {
  if (dishes.length === 0) {
    return <p className="status">No dishes found.</p>;
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <Dish key={dish.id} {...dish} addItem={addItem} />
      ))}
    </div>
  );
}

export default DishList;
