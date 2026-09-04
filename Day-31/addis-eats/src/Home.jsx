import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <h2>Welcome to Addis Eats</h2>

      <p>
        Discover delicious Ethiopian dishes and order your favorites.
      </p>

      <Link to="/menu" className="button">
        Explore Menu
      </Link>
    </section>
  );
}

export default Home;