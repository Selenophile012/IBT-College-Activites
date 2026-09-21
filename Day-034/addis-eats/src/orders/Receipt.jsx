import { Link, useParams } from "react-router-dom";

function Receipt() {
  const { id } = useParams();

  return (
    <main className="receipt-page">
      <div className="receipt-card">
        <h1>Order confirmed</h1>

        <p role="status">Your Addis Eats order has been placed successfully.</p>

        <p>
          Order number: <strong>#{id}</strong>
        </p>

        <Link to="/menu" className="button">
          Order more food
        </Link>
      </div>
    </main>
  );
}

export default Receipt;
