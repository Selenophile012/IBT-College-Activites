import "./App.css";

function Header() {
  return (
    <header>
      <h1>🍴 Addis Eats</h1>
      <p>Delicious food from Addis Ababa</p>
    </header>
  );
}

function Dish({ name, price }) {
  return (
    <div className="dish">
      <span>{name}</span>
      <span>{price} ETB</span>
    </div>
  );
}

function App() {
  const dishes = [
    { id: 1, name: "Doro Wot", price: 250 },
    { id: 2, name: "Tibs", price: 300 },
    { id: 3, name: "Kitfo", price: 350 },
    { id: 4, name: "Shiro", price: 180 },
    { id: 5, name: "Injera", price: 50 },
  ];

  return (
    <div className="app">
      <Header />

      <main>
        <h2>Our Menu</h2>

        {dishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;
