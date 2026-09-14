import { useEffect, useState } from "react";
import ProductCard from "../componenets/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  if (loading) {
    return (
      <div className="page">
        <div className="status-message">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="error-message">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="products-header">
        <h1>Products</h1>
        <p>Browse our complete product collection.</p>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option value={item} key={item}>
              {item === "all" ? "All Categories" : item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="default">Sort Products</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try another search or category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;