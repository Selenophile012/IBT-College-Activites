import Menu from "./Menu";
import dishes from "./data";
import "./App.css";

function App() {
  return (
    <main>
      <h1> Addis Eats</h1>

      <p>Fresh Ethiopian dishes delivered to you.</p>

      <Menu dishes={dishes} />
    </main>
  );
}

export default App;