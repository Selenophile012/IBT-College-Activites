import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu({ dishes }) {
  const [params, setParams] = useSearchParams();

  const category = params.get("category") ?? "All";

  const categories = [
    "All",
    "Main",
    "Vegetarian",
    "Grill"
  ];

  function chooseCategory(cat) {
    if (cat === "All") {
      setParams({});
    } else {
      setParams({ category: cat });
    }
  }

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter(
          (dish) => dish.category === category
        );

  return (
    <section className="menu-page">
      <h2>Our Menu</h2>

      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={chooseCategory}
      />

      {filteredDishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        <DishList dishes={filteredDishes} />
      )}
    </section>
  );
}

export default Menu;