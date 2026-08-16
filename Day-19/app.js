const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

const items = [];


function updateTotal() {
    const total = items.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    totalEl.textContent = total.toFixed(2);
}


function addRow(name, price) {
    const item = {
        id: Date.now(),
        name: name,
        price: price,
        bought: false
    };

    items.push(item);

    const li = document.createElement("li");

    li.dataset.id = item.id;

    const itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    const itemName = document.createElement("span");
    itemName.textContent = item.name;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = `${item.price} ETB`;

    itemInfo.append(itemName);
    itemInfo.append(itemPrice);


    const actions = document.createElement("div");
    actions.classList.add("actions");

    const boughtButton = document.createElement("button");
    boughtButton.classList.add("buy");
    boughtButton.textContent = "Bought";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("del");
    deleteButton.textContent = "Delete";

    actions.append(boughtButton);
    actions.append(deleteButton);

    li.append(itemInfo);
    li.append(actions);

    list.append(li);

    updateTotal();
}


form.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || !price || price <= 0) {
        return;
    }

    addRow(name, price);

    form.reset();
});


list.addEventListener("click", event => {

    const li = event.target.closest("li");

    if (!li) {
        return;
    }


    if (event.target.matches(".del")) {

        const id = Number(li.dataset.id);

        const index = items.findIndex(item => item.id === id);

        if (index !== -1) {
            items.splice(index, 1);
        }

        li.remove();

        updateTotal();

    } else if (event.target.matches(".buy")) {

        li.classList.toggle("bought");

        const id = Number(li.dataset.id);

        const item = items.find(item => item.id === id);

        if (item) {
            item.bought = !item.bought;
        }
    }
});