let cart = ["Doro Wat", "Tibs"];
// SAVE — stringify first
localStorage.setItem("cart",
JSON.stringify(cart));
// LOAD — parse back (guard the null)
const raw = localStorage.getItem("cart");
cart = raw ? JSON.parse(raw) : [];
