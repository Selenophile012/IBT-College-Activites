import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>Review your order and complete checkout.</p>

      <nav>
        <Link href="/cart">Back to Cart</Link>
        {" | "}
        <Link href="/menu">Menu</Link>
      </nav>
    </main>
  );
}