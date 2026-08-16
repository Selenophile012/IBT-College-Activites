let cart = ["Doro Wat", "Tibs"];
function loadCart() {
try {
const raw = localStorage.getItem("cart");
return raw ? JSON.parse(raw) : [];
} catch (err) {
return []; // corrupt — start fresh
}
}
S