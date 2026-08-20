const STORAGE_KEY = "addiseats";
const MENU_URL = "data/menu.json";
const PHONE = /^(?:\+251|0)9\d{8}$/;

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

const checkoutForm = document.querySelector("#checkout");
const nameEl = document.querySelector("#name");
const phoneEl = document.querySelector("#phone");
const areaEl = document.querySelector("#area");

const errorEl = document.querySelector("#form-error");
const confirmationEl = document.querySelector("#confirmation");


async function loadMenu() {

    menuEl.textContent = "Loading menu...";

    try {

        const response = await fetch(MENU_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Menu data is not an array.");
        }

        state.dishes = data;

        render();

    } catch (error) {

        console.error("Menu loading error:", error);

        menuEl.innerHTML = `
            <div class="error-state">
                <strong>Could not load the menu.</strong>
                <p>Please try again later.</p>
            </div>
        `;
    }
}


function render() {

    renderMenu();
    renderCart();
}


function renderMenu() {

    const term = state.search
        .trim()
        .toLowerCase();

    const shownDishes = state.dishes.filter(dish => {

        const name = dish?.name ?? "";

        return name
            .toLowerCase()
            .includes(term);
    });


    if (shownDishes.length === 0) {

        menuEl.innerHTML = `
            <div class="empty">
                <h2>No dishes found</h2>
                <p>
                    Try searching for another dish.
                </p>
            </div>
        `;

        return;
    }


    menuEl.innerHTML = shownDishes
        .map(renderDish)
        .join("");
}


function renderDish(dish) {

    const id = dish?.id;

    const name = dish?.name ?? "Unnamed dish";

    const category =
        dish?.category ?? "Uncategorized";

    const price =
        Number(dish?.price ?? 0);

    const spicy =
        dish?.spicy === true;


    return `
        <article
            class="dish"
            data-id="${id}"
        >

            <h3>${name}</h3>

            <p class="category">
                ${category}
            </p>

            <p class="price">
                ${price} ETB
            </p>

            ${
                spicy
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
    `;
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
        .map(renderCartItem)
        .join("");


    totalEl.textContent =
        `${cartTotal()} ETB`;
}


function renderCartItem(item) {

    const name =
        item?.name ?? "Unknown dish";

    const price =
        Number(item?.price ?? 0);

    const quantity =
        Number(item?.qty ?? 0);


    return `
        <div
            class="cart-item"
            data-id="${item.id}"
        >

            <div class="cart-item-info">

                <span class="cart-item-name">
                    ${name}
                </span>

                <span class="cart-item-details">
                    ${price} ETB × ${quantity}
                </span>

            </div>


            <div class="quantity-controls">

                <button
                    class="decrease"
                    type="button"
                    aria-label="Decrease ${name} quantity"
                >
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button
                    class="increase"
                    type="button"
                    aria-label="Increase ${name} quantity"
                >
                    +
                </button>

            </div>


            <button
                class="remove"
                type="button"
                aria-label="Remove ${name}"
            >
                Remove
            </button>

        </div>
    `;
}


function cartTotal() {

    if (!Array.isArray(state.cart)) {
        return 0;
    }


    return state.cart.reduce(
        (sum, item) => {

            const price =
                Number(item?.price ?? 0);

            const quantity =
                Number(item?.qty ?? 0);


            if (quantity <= 0) {
                return sum;
            }


            if (!Number.isFinite(price)) {
                return sum;
            }


            return sum + price * quantity;
        },

        0
    );
}


function addToCart(id) {

    if (!Number.isFinite(id)) {
        return;
    }


    const dish = state.dishes.find(
        item => item?.id === id
    );


    if (!dish) {
        return;
    }


    const price =
        Number(dish?.price ?? 0);


    if (!Number.isFinite(price) || price < 0) {
        return;
    }


    const existing = state.cart.find(
        item => item?.id === id
    );


    if (existing) {

        const currentQuantity =
            Number(existing.qty ?? 0);

        existing.qty =
            currentQuantity + 1;

    } else {

        state.cart.push({
            id: dish.id,
            name: dish.name ?? "Unnamed dish",
            price,
            qty: 1
        });
    }


    save();

    render();
}


function updateCartQuantity(id, change) {

    if (!Number.isFinite(id)) {
        return;
    }


    if (!Number.isFinite(change)) {
        return;
    }


    const item = state.cart.find(
        cartItem => cartItem?.id === id
    );


    if (!item) {
        return;
    }


    const currentQuantity =
        Number(item.qty ?? 0);


    const newQuantity =
        currentQuantity + change;


    if (newQuantity <= 0) {

        removeFromCart(id);

        return;
    }


    item.qty = newQuantity;

    save();

    render();
}


function removeFromCart(id) {

    if (!Number.isFinite(id)) {
        return;
    }


    state.cart = state.cart.filter(
        item => item?.id !== id
    );


    save();

    render();
}


function save() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state.cart)
        );

    } catch (error) {

        console.error(
            "Could not save cart:",
            error
        );
    }
}


function load() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);


        if (!saved) {
            return;
        }


        const parsed =
            JSON.parse(saved);


        if (!Array.isArray(parsed)) {
            return;
        }


        state.cart = parsed
            .filter(item => {

                const quantity =
                    Number(item?.qty ?? 0);

                const price =
                    Number(item?.price ?? 0);

                return (
                    item &&
                    item.id !== undefined &&
                    quantity > 0 &&
                    Number.isFinite(price)
                );
            })
            .map(item => ({
                id: item.id,
                name: item.name ?? "Unknown dish",
                price: Number(item.price ?? 0),
                qty: Number(item.qty ?? 1)
            }));

    } catch (error) {

        console.error(
            "Could not restore cart:",
            error
        );

        state.cart = [];
    }
}


function validate({ name, phone }) {

    if (!name?.trim()) {
        return "Please enter your name.";
    }


    const cleanPhone =
        phone?.trim() ?? "";


    if (!PHONE.test(cleanPhone)) {
        return "Enter a valid Ethiopian phone.";
    }


    if (!Array.isArray(state.cart)) {
        return "Your cart is empty.";
    }


    if (state.cart.length === 0) {
        return "Your cart is empty.";
    }


    const hasValidItem =
        state.cart.some(item => {

            const quantity =
                Number(item?.qty ?? 0);

            return quantity > 0;
        });


    if (!hasValidItem) {
        return "Your cart is empty.";
    }


    return "";
}


function showError(message) {

    errorEl.textContent =
        message ?? "";
}


function clearError() {

    errorEl.textContent = "";
}


function showConfirmation(order) {

    const total =
        Number(order?.total ?? 0);

    const area =
        order?.area ?? "your delivery area";

    const name =
        order?.name ?? "Customer";


    confirmationEl.hidden = false;

    confirmationEl.textContent =
        `Order placed successfully, ${name}! ` +
        `Total: ${total} ETB. ` +
        `Delivering to ${area}.`;
}

function placeOrder(data) {

    if (!data) {
        return;
    }


    if (state.cart.length === 0) {
        return;
    }


    const order = {

        ...data,

        items: state.cart.map(item => ({
            ...item
        })),

        total: cartTotal(),

        placedAt:
            new Date().toISOString()
    };


    console.log("Order placed:", order);


    state.cart = [];

    save();

    render();

    showConfirmation(order);

    checkoutForm.reset();
}


searchEl.addEventListener(
    "input",
    event => {

        state.search =
            event.target.value;

        render();
    }
);


menuEl.addEventListener(
    "click",
    event => {

        if (!event.target.matches(".add")) {
            return;
        }


        const dishElement =
            event.target.closest(".dish");


        if (!dishElement) {
            return;
        }


        const id =
            Number(dishElement.dataset.id);


        addToCart(id);
    }
);


cartEl.addEventListener(
    "click",
    event => {

        const cartItem =
            event.target.closest(".cart-item");


        if (!cartItem) {
            return;
        }


        const id =
            Number(cartItem.dataset.id);


        if (event.target.matches(".increase")) {

            updateCartQuantity(id, 1);

        } else if (
            event.target.matches(".decrease")
        ) {

            updateCartQuantity(id, -1);

        } else if (
            event.target.matches(".remove")
        ) {

            removeFromCart(id);
        }
    }
);


checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        clearError();


        const data = {

            name:
                nameEl.value.trim(),

            phone:
                phoneEl.value.trim(),

            area:
                areaEl.value
        };


        const message =
            validate(data);


        if (message) {

            showError(message);

            return;
        }


        placeOrder(data);
    }
);


function init() {

    load();

    render();

    loadMenu();
}


init();