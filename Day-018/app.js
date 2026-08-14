import { transactions } from "./transactions.js";

import {
    getCredits,
    getDebits,
    totalTransactions,
    getReceipts,
    updateTransaction
} from "./report.js";


const credits = getCredits(transactions);
const debits = getDebits(transactions);

const totalCredits = totalTransactions(credits);
const totalDebits = totalTransactions(debits);

const receipts = getReceipts(transactions);

const correctedTransaction = updateTransaction(
    transactions[0],
    300
);


console.log("===== TeleBirr Transaction Report =====");

console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits: ${totalDebits} ETB`);

console.log("\nReceipts:");

receipts.forEach(receipt => {
    console.log(receipt);
});

console.log("\nOriginal Transaction:");
console.log(transactions[0]);

console.log("\nCorrected Transaction:");
console.log(correctedTransaction);