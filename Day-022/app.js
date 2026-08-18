const API = "https://open.er-api.com/v6/latest/ETB";
const KEY = "birrwatch";

const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const watchBtn = document.querySelector("#watch");
const watchUl = document.querySelector("#watchlist");

async function loadRates() {
  status.textContent = "Loading rates...";

  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    state.rates = data.rates;

    status.textContent = "";

    render();
  } catch (err) {
    status.textContent = "Could not load rates.";
  }
}

function render() {
  const codes = Object.keys(state.rates);

  select.innerHTML = codes
    .map((c) => `<option value="${c}">${c}</option>`)
    .join("");

  if (state.rates[state.currency]) {
    select.value = state.currency;
  } else if (codes.length > 0) {
    state.currency = codes[0];
    select.value = state.currency;
  }

  renderWatchlist();
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies yet</li>";
    return;
  }

  watchUl.innerHTML = state.watchlist
    .map((currency) => {
      const rate = state.rates[currency];

      return `
                <li data-c="${currency}">
                    <span>1 ETB = ${rate} ${currency}</span>
                    <button class="rm" type="button">×</button>
                </li>
            `;
    })
    .join("");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amt = Number(amount.value);

  if (!amt || amt <= 0 || isNaN(amt)) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  state.amount = amt;
  state.currency = select.value;

  const rate = state.rates[state.currency];

  if (!rate) {
    result.textContent = "Rate unavailable.";
    return;
  }

  const out = (amt * rate).toFixed(2);

  result.textContent = `${amt} ETB = ${out} ${state.currency}`;
});

watchBtn.addEventListener("click", () => {
  const currency = select.value;

  if (!currency) {
    return;
  }

  if (state.watchlist.includes(currency)) {
    return;
  }

  state.watchlist.push(currency);

  save();

  renderWatchlist();
});

watchUl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) {
    return;
  }

  const item = e.target.closest("li");
  const currency = item.dataset.c;

  state.watchlist = state.watchlist.filter((x) => x !== currency);

  save();

  renderWatchlist();
});

function save() {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      watchlist: state.watchlist,
      currency: state.currency,
    }),
  );
}

function load() {
  const saved = localStorage.getItem(KEY);

  if (!saved) {
    return;
  }

  try {
    Object.assign(state, JSON.parse(saved));
  } catch (err) {
    console.log("Could not load saved data.");
  }
}

async function init() {
  load();

  await loadRates();

  render();
}

init();
