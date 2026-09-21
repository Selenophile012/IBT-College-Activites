import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Cart from "./Cart";
import Login from "./Login";
import NotFound from "./NotFound";
import RequireAuth from "./auth/RequireAuth";
import ErrorBoundary from "./ErrorBoundary";
import dishes from "./data";

const Checkout = lazy(() => import("./Checkout/Checkout"));
const Receipt = lazy(() => import("./orders/Receipt"));

function RouteSkeleton() {
  return (
    <section className="route-skeleton" aria-live="polite" aria-busy="true">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <p>Loading page...</p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteSkeleton />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="menu"
              element={
                <ErrorBoundary
                  title="Menu unavailable"
                  message="The menu could not be rendered. Your cart and the rest of the application are still available."
                >
                  <Menu dishes={dishes} />
                </ErrorBoundary>
              }
            />

            <Route path="menu/:id" element={<DishDetail />} />

            <Route
              path="cart"
              element={
                <ErrorBoundary
                  title="Cart unavailable"
                  message="The cart could not be rendered. You can return to the menu and continue browsing."
                >
                  <Cart />
                </ErrorBoundary>
              }
            />

            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />

            <Route path="orders/:id" element={<Receipt />} />

            <Route path="login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
