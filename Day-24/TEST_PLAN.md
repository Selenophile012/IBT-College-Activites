# Addis Eats - Manual Test Plan

## 1. Add, Change Quantity, Remove

- Open the application.
- Click "Add to Cart" on a dish.
- Confirm the dish appears in the cart.
- Click "+".
- Confirm the quantity increases.
- Confirm the total increases.
- Click "-".
- Confirm the quantity decreases.
- Click "Remove".
- Confirm the dish disappears from the cart.
- Confirm the total updates.

Expected result: PASS


## 2. Search for a Dish That Does Not Exist

- Click the search box.
- Type a dish name that does not exist.
- Example: `Pizza`

Expected result:

- Menu shows "No dishes found".
- Page does not become blank.
- No console error appears.

Expected result: PASS


## 3. Checkout With an Invalid Phone

- Add a dish to the cart.
- Enter a name.
- Enter an invalid phone such as:
  `12345`
- Submit the form.

Expected result:

- Order is not placed.
- Clear error appears:
  "Enter a valid Ethiopian phone."
- Cart remains unchanged.

Expected result: PASS


## 4. Checkout With Empty Cart

- Make sure the cart is empty.
- Enter a valid name.
- Enter a valid Ethiopian phone.
- Submit the form.

Expected result:

- Order is blocked.
- Error appears:
  "Your cart is empty."

Expected result: PASS


## 5. Place a Valid Order

- Add at least one dish.
- Enter a valid name.
- Enter a valid Ethiopian phone.
- Select a delivery area.
- Submit the form.

Expected result:

- Order is created.
- Confirmation message appears.
- ETB total is displayed.
- Cart becomes empty.
- Total becomes 0 ETB.
- No console error appears.

Expected result: PASS


## 6. Reload With Items in Cart

- Add one or more dishes.
- Refresh the browser.

Expected result:

- Cart is restored.
- Quantities are preserved.
- Total is preserved.

Expected result: PASS


## 7. Broken Data URL

- Temporarily change the menu URL in app.js to an invalid path.
- Reload the application.

Expected result:

- A calm error message appears:
  "Could not load the menu."
- The page does not crash.
- No unhandled console error occurs.

Expected result: PASS


## 8. Valid Ethiopian Phone Numbers

Test:

- 0912345678
- +251912345678

Expected result: accepted.


## 9. Invalid Ethiopian Phone Numbers

Test:

- 123456789
- 091234
- 251912345678
- abc1234567

Expected result: rejected.


## 10. Keyboard Navigation

- Use Tab to move through the page.
- Confirm search input can receive focus.
- Confirm Add buttons can receive focus.
- Confirm quantity buttons can receive focus.
- Confirm checkout fields can receive focus.
- Confirm Place Order can receive focus.

Expected result: PASS


## Final Check

- [ ] No console errors
- [ ] Menu loads
- [ ] Search works
- [ ] Empty search state works
- [ ] Add works
- [ ] Quantity increase works
- [ ] Quantity decrease works
- [ ] Remove works
- [ ] Total is correct
- [ ] Cart persists after reload
- [ ] Empty cart checkout is blocked
- [ ] Invalid phone is blocked
- [ ] Valid phone is accepted
- [ ] Order confirmation appears
- [ ] Cart clears after order
- [ ] Error state works
- [ ] Loading state works
- [ ] Mobile layout works
- [ ] Keyboard navigation works