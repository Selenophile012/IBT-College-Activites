import { useEffect, useRef, useState } from "react";
import { loadDishes } from "./api";
import DishList from "./DishList";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

 useEffect(() => {
  if (!loading && searchRef.current) {
    searchRef.current.focus();
  }
}, [loading]);
  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      try {
        setLoading(true);
        setError(null);

        const data = await loadDishes(category, controller.signal);

        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDishes();

    return () => {
      controller.abort();
    };
  }, [category]);

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="status">Loading the menu...</p>;
  }

  if (error) {
    return (
      <div className="status error">
        <p>{error}</p>
        <button onClick={() => setCategory(category)}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="menu">
      <div className="menu-header">
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian food, made with love.</p>
      </div>

      <div className="menu-controls">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="categories">
          <button
            className={category === "All" ? "active" : ""}
            onClick={() => setCategory("All")}
          >
            All
          </button>

          <button
            className={category === "Traditional" ? "active" : ""}
            onClick={() => setCategory("Traditional")}
          >
            Traditional
          </button>

          <button
            className={category === "Grill" ? "active" : ""}
            onClick={() => setCategory("Grill")}
          >
            Grill
          </button>

          <button
            className={category === "Vegan" ? "active" : ""}
            onClick={() => setCategory("Vegan")}
          >
            Vegan
          </button>

          <button
            className={category === "Pasta" ? "active" : ""}
            onClick={() => setCategory("Pasta")}
          >
            Pasta
          </button>

          <button
            className={category === "Breakfast" ? "active" : ""}
            onClick={() => setCategory("Breakfast")}
          >
            Breakfast
          </button>
        </div>
      </div>

      <DishList dishes={filteredDishes} />
    </main>
  );
}

export default Menu;