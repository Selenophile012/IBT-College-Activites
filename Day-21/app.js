const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorEl = document.querySelector("#error");
const countEl = document.querySelector("#count");


// Save helper
function save(data) {
    localStorage.setItem(
        "signups",
        JSON.stringify(data)
    );
}


// Load helper
function load() {

    try {

        const raw = localStorage.getItem("signups");

        if (!raw) {
            return [];
        }

        const data = JSON.parse(raw);

        if (!Array.isArray(data)) {
            return [];
        }

        return data;

    } catch (error) {

        console.error(error);

        return [];
    }
}


// Validation
function validate(name, phone) {

    if (name.trim().length < 2) {
        return "Enter your full name.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid Ethiopian phone number.";
    }

    return "";
}


// Update signup count
function updateCount() {

    const signups = load();

    countEl.textContent = signups.length;
}


// Restore count on page load
updateCount();


// Form submit
form.addEventListener("submit", event => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const message = validate(name, phone);

    if (message) {

        errorEl.textContent = message;

        return;
    }

    errorEl.textContent = "";

    const signups = load();

    signups.push({
        name,
        phone
    });

    save(signups);

    form.reset();

    updateCount();
});