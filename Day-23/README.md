# Addis Eats

Addis Eats is a single-page food ordering application for an Addis Ababa restaurant.

Users can browse Ethiopian dishes, search the menu, add dishes to a cart, change quantities, remove items, and see a live total in Ethiopian Birr (ETB).

The cart is saved in localStorage so it remains available after refreshing the page.

## Features

- Browse dishes from JSON data
- Live dish search
- Empty search-result state
- Add dishes to cart
- Increase quantity
- Decrease quantity
- Remove dishes
- Live ETB total
- localStorage persistence
- Responsive mobile and desktop layout
- Semantic HTML5 structure
- Loading and error states

## Data Source

The menu is loaded from:

data/menu.json

The application uses JavaScript fetch() to load the local JSON data.

## How to Run

Open the project using a local development server such as VS Code Live Server.

Do not open index.html directly with the file:// protocol because JavaScript fetch() may not be allowed to load the local JSON file.

## Project Structure

Addis-Eats/
├── index.html
├── styles.css
├── app.js
├── README.md
└── data/
    └── menu.json

## JavaScript Architecture

The application follows the pattern:

State → Render → Events → Update State → Render

The state object is the single source of truth for the menu, cart, and search text.

## Author

Daniel