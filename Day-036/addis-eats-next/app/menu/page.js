import DishList from "./DishList";

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

export default async function MenuPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main>
      <h1>Our Menu</h1>

      <DishList dishes={dishes} />
    </main>
  );
}