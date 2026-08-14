# TeleBirr Transaction Report

This mini-project processes TeleBirr transactions for an Addis shop using modern JavaScript.

## transactions.js

This module contains the TeleBirr transaction data.

Each transaction contains:

- id
- customer
- amount
- type

The type can be either credit or debit.

## report.js

This module contains reusable functions for processing transactions.

It uses:

- filter() to separate credits and debits
- reduce() to calculate transaction totals
- map() to create formatted receipt strings
- destructuring to access object properties
- spread to create an updated transaction copy without changing the original

## app.js

This module imports the transaction data and report functions.

It calculates the total credits and debits, prints the formatted receipts, and demonstrates updating a transaction without mutating the original.

## Concepts Practiced

- map()
- filter()
- reduce()
- Object destructuring
- Spread operator
- ES modules
- import
- export
- Immutable updates