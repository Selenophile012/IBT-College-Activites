const form = document.querySelector("#search-form");
const countryInput = document.querySelector("#country-input");
const facts = document.querySelector("#facts");


function renderFact(label, value) {
    const div = document.createElement("div");

    div.classList.add("fact");

    const strong = document.createElement("strong");
    strong.textContent = label;

    const text = document.createElement("span");
    text.textContent = value;

    div.append(strong);
    div.append(text);

    facts.append(div);
}


async function showCountry(countryName) {

    facts.textContent = "Loading...";
    facts.className = "loading";

    try {

        const res = await fetch(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
        );

        if (!res.ok) {
            throw new Error("Country not found");
        }

        const countries = await res.json();

        const country = countries[0];

        facts.innerHTML = "";
        facts.className = "";


        renderFact(
            "Country",
            country.name.common
        );


        renderFact(
            "Capital",
            country.capital ? country.capital[0] : "N/A"
        );


        renderFact(
            "Population",
            country.population.toLocaleString()
        );


        renderFact(
            "Region",
            country.region
        );


        const currencies = country.currencies
            ? Object.values(country.currencies)
                .map(currency => `${currency.name} (${currency.symbol || ""})`)
                .join(", ")
            : "N/A";

        renderFact(
            "Currencies",
            currencies
        );


        const flag = document.createElement("img");

        flag.src = country.flags.svg;
        flag.alt = `Flag of ${country.name.common}`;
        flag.classList.add("flag");

        facts.append(flag);

    } catch (error) {

        facts.textContent = error.message;
        facts.className = "error";

    }
}


form.addEventListener("submit", event => {

    event.preventDefault();

    const countryName = countryInput.value.trim();

    if (!countryName) {
        facts.textContent = "Please enter a country name.";
        facts.className = "error";
        return;
    }

    showCountry(countryName);
});


showCountry("Ethiopia");