import "./App.css";
import Menu from "./Menu";
import dishes from "./data";

function Header() {
  return (
    <header>
      <h1>🍴 Addis Eats</h1>
      <p>Delicious food from Addis Ababa</p>
    </header>
  );
}

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        <h3>Main Dishes</h3>
        <Menu dishes={dishes} category="Main" />

        <h3>Vegetarian Dishes</h3>
        <Menu dishes={dishes} category="Vegetarian" />

        <h3>Desserts</h3>
        <Menu dishes={dishes} category="Dessert" />
      </main>
    </div>
  );
}

export default App;