'use strict';

const subtotal = (...prices) =>
    prices.reduce((sum, price) => sum + price, 0);

const discountBy = rate =>
    amount => amount * (1 - rate);

const withVat = amount =>
    amount * 1.15;

const toETB = amount =>
    `${amount.toFixed(2)} ETB`;

function makeReceiptMaker() {
    let orderNo = 0;

    const memberOff = discountBy(0.10);

    return function (...items) {
        orderNo++;

        const gross = subtotal(...items);
        const net = withVat(memberOff(gross));

        return `#${orderNo}: ${toETB(net)}`;
    };
}

const receipt = makeReceiptMaker();

module.exports = {
    subtotal,
    discountBy,
    withVat,
    toETB,
    makeReceiptMaker,
    receipt
};