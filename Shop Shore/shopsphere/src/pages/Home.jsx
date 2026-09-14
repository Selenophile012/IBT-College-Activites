import { Link } from "react-router-dom";

function Home() {
  const categories = [
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Essence Mascara Lash Princess",
      price: 9.99,
      category: "Beauty",
    },
    {
      id: 2,
      name: "Eyeshadow Palette",
      price: 19.99,
      category: "Beauty",
    },
    {
      id: 3,
      name: "Calvin Klein CK One",
      price: 49.99,
      category: "Fragrances",
    },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            Welcome to ShopSphere
          </span>

          <h1>
            Everything You Need,
            <br />
            All in One Place
          </h1>

          <p>
            Discover quality products, explore categories,
            and enjoy a simple online shopping experience.
          </p>

          <Link to="/products" className="hero-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-label">Our Selection</span>
            <h2>Featured Products</h2>
          </div>

          <Link to="/products" className="view-link">
            View All →
          </Link>
        </div>

        <div className="featured-grid">
          {featuredProducts.map((product) => (
            <div className="featured-card" key={product.id}>
              <div className="featured-image">
                {product.category}
              </div>

              <div className="featured-content">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <strong>${product.price.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section categories-section">
        <div className="section-heading">
          <div>
            <span className="section-label">Browse</span>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <Link
              to="/products"
              className="home-category-card"
              key={category}
            >
              <h3>{category}</h3>
              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="promotion">
        <div>
          <span className="section-label">Special Offer</span>
          <h2>Find Something You'll Love</h2>
          <p>
            Explore our growing collection of products
            and discover something perfect for you.
          </p>

          <Link to="/products" className="promotion-button">
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;