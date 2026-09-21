# Day 34 Performance Profile

## Interaction

The React DevTools Profiler was used while adding dishes from the Addis Eats menu.

## Before

The previous application structure kept duplicate cart state in App.jsx even though the cart was already managed by the Zustand store.

This meant cart updates could cause unnecessary work higher in the application tree.

## Fix

The duplicate local cart state was removed from App.jsx.

The application now reads cart state using narrow Zustand selectors.

Menu selects only the addItem action.

Cart selects only the items and removeItem values that it needs.

## Before / After Measurements

| Measurement | Before | After |
|---|---:|---:|
| App render | ____ ms | ____ ms |
| Menu render | ____ ms | ____ ms |
| DishList render | ____ ms | ____ ms |
| Slowest component | ____ | ____ |

## Profiling Steps

1. Open React DevTools.
2. Open Profiler.
3. Click Record.
4. Open the menu.
5. Add several dishes.
6. Stop recording.
7. Open Ranked view.
8. Record the slowest component.
9. Repeat after the fix.
10. Compare the measurements.

## Result

The duplicate App-level cart state was removed instead of adding unnecessary memoization.

The cart remains managed by the Zustand store and consumers use narrow selectors.