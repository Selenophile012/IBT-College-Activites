import Link from "next/link";

const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    description: "Minced beef seasoned with Ethiopian spices.",
    price: 450,
  },
  {
    id: "shiro",
    name: "Shiro",
    description: "Traditional Ethiopian chickpea stew.",
    price: 250,
  },
  {
    id: "doro-wot",
    name: "Doro Wot",
    description: "Spicy Ethiopian chicken stew.",
    price: 500,
  },
];

export default function MenuPage() {
  return (
    <main>
      <h1>Our Menu</h1>

      {dishes.map((dish) => (
        <article key={dish.id}>
          <h2>{dish.name}</h2>
          <p>{dish.description}</p>
          <p>{dish.price} ETB</p>

          <Link href={`/menu/${dish.id}`}>
            View Dish
          </Link>
        </article>
      ))}

      <nav>
        <Link href="/">Home</Link>
        {" | "}
        <Link href="/cart">Cart</Link>
        {" | "}
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}