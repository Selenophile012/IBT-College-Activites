export const getCredits = transactions =>
    transactions.filter(({ type }) => type === "credit");

export const getDebits = transactions =>
    transactions.filter(({ type }) => type === "debit");

export const totalTransactions = transactions =>
    transactions.reduce((sum, { amount }) => sum + amount, 0);

export const getReceipts = transactions =>
    transactions.map(({ customer, amount }) =>
        `${customer}: ${amount} ETB`
    );

export const updateTransaction = (transaction, newAmount) => ({
    ...transaction,
    amount: newAmount
});