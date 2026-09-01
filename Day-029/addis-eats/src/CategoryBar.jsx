function CategoryBar({ selected, onSelect }) {
  const categories = ["All", "Main", "Vegetarian"];

  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={category === selected ? "chip on" : "chip"}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;