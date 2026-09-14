import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Beauty",
      description: "Beauty and personal care products.",
    },
    {
      name: "Fragrances",
      description: "Perfumes and fragrances.",
    },
    {
      name: "Furniture",
      description: "Furniture for your home.",
    },
    {
      name: "Groceries",
      description: "Everyday grocery products.",
    },
    {
      name: "Home Decoration",
      description: "Products to improve your home.",
    },
    {
      name: "Kitchen Accessories",
      description: "Useful kitchen products.",
    },
    {
      name: "Laptops",
      description: "Computers and laptops.",
    },
    {
      name: "Mens Shirts",
      description: "Shirts for men.",
    },
    {
      name: "Mens Shoes",
      description: "Shoes for men.",
    },
    {
      name: "Mobile Accessories",
      description: "Accessories for mobile devices.",
    },
    {
      name: "Motorcycle",
      description: "Motorcycle products.",
    },
    {
      name: "Skin Care",
      description: "Skin care products.",
    },
  ];

  return (
    <div className="page">
      <div className="products-header">
        <h1>Categories</h1>
        <p>Explore products by category.</p>
      </div>

      <div className="categories-page-grid">
        {categories.map((category) => (
          <Link
            to={`/products?category=${encodeURIComponent(
              category.name
            )}`}
            className="category-large-card"
            key={category.name}
          >
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <span>View Products →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;