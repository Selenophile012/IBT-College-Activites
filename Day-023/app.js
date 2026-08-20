const state = {
    dishes: [],
    cart: [],
    search: ""
};

const menuEl = document.querySelector("#menu");
const searchEl = document.querySelector("#search");
const cartEl = document.querySelector("#cart");
const cartItemsEl = document.querySelector("#cart-items");
const totalEl = document.querySelector("#total");


async function loadMenu() {
    menuEl.textContent = "Loading menu...";

    try {
        const res = await fetch("data/menu.json");

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        state.dishes = await res.json();

        render();
    } catch (err) {
        menuEl.innerHTML = `
            <p class="error">
                Could not load the menu.
            </p>
        `;
    }
}


function render() {
    const term = state.search.toLowerCase().trim();

    const shown = state.dishes.filter(dish =>
        dish.name.toLowerCase().includes(term)
    );

    if (shown.length === 0) {
        menuEl.innerHTML = `
            <div class="empty">
                <h2>No dishes found</h2>
                <p>Try another search.</p>
            </div>
        `;
    } else {
        menuEl.innerHTML = shown
            .map(dish => `
                <article
                    class="dish"
                    data-id="${dish.id}"
                >

                    <h3>${dish.name}</h3>

                    <p class="category">
                        ${dish.category}
                    </p>

                    <p class="price">
                        ${dish.price} ETB
                    </p>

                    ${
                        dish.spicy
                            ? `<p class="spicy">🌶️ Spicy</p>`
                            : ""
                    }

                    <button
                        class="add"
                        type="button"
                    >
                        Add to Cart
                    </button>

                </article>
            `)
            .join("");
    }

    renderCart();
}


function renderCart() {

    if (state.cart.length === 0) {

        cartItemsEl.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        totalEl.textContent = "0 ETB";

        return;
    }

    cartItemsEl.innerHTML = state.cart
        .map(item => `
            <div
                class="cart-item"
                data-id="${item.id}"
            >

                <div class="cart-item-info">

                    <span class="cart-item-name">
                        ${item.name}
                    </span>

                    <span class="cart-item-details">
                        ${item.price} ETB × ${item.qty}
                    </span>

                </div>

                <div class="quantity-controls">

                    <button
                        class="decrease"
                        type="button"
                        aria-label="Decrease ${item.name} quantity"
                    >
                        −
                    </button>

                    <span>${item.qty}</span>

                    <button
                        class="increase"
                        type="button"
                        aria-label="Increase ${item.name} quantity"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    type="button"
                    aria-label="Remove ${item.name}"
                >
                    Remove
                </button>

            </div>
        `)
        .join("");

    totalEl.textContent = `${cartTotal()} ETB`;
}


function cartTotal() {
    return state.cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
}


searchEl.addEventListener("input", (event) => {

    state.search = event.target.value;

    render();
});


menuEl.addEventListener("click", (event) => {

    if (!event.target.matches(".add")) {
        return;
    }

    const dishElement = event.target.closest(".dish");

    const id = Number(dishElement.dataset.id);

    const dish = state.dishes.find(
        item => item.id === id
    );

    if (!dish) {
        return;
    }

    const existing = state.cart.find(
        item => item.id === id
    );

    if (existing) {
        existing.qty += 1;
    } else {
        state.cart.push({
            id: dish.id,
            name: dish.name,
            price: dish.price,
            qty: 1
        });
    }

    save();

    render();
});


cartEl.addEventListener("click", (event) => {

    const cartItem = event.target.closest(".cart-item");

    if (!cartItem) {
        return;
    }

    const id = Number(cartItem.dataset.id);

    const item = state.cart.find(
        cartItem => cartItem.id === id
    );

    if (!item) {
        return;
    }

    if (event.target.matches(".increase")) {

        item.qty += 1;

    } else if (event.target.matches(".decrease")) {

        item.qty -= 1;

        if (item.qty <= 0) {
            state.cart = state.cart.filter(
                cartItem => cartItem.id !== id
            );
        }

    } else if (event.target.matches(".remove")) {

        state.cart = state.cart.filter(
            cartItem => cartItem.id !== id
        );

    } else {
        return;
    }

    save();

    render();
});


function save() {
    localStorage.setItem(
        "addisEatsCart",
        JSON.stringify(state.cart)
    );
}


function load() {

    const saved = localStorage.getItem(
        "addisEatsCart"
    );

    if (!saved) {
        return;
    }

    try {
        const cart = JSON.parse(saved);

        if (Array.isArray(cart)) {
            state.cart = cart;
        }

    } catch (err) {
        state.cart = [];
    }
}


function init() {

    load();

    loadMenu();
}


init();