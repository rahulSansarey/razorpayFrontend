import { useLocation } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();

  const { amount, paymentId, orderId, signature } = location.state;

  return (
    <div>
      <h1> Thank You!</h1>

      <h3>Your order has been placed successfully.</h3>

      <p>Amount Paid: ₹{amount / 100}</p>

      <p>Order ID: {orderId}</p>

      <p>Payment ID: {paymentId}</p>

      <p>Signature: {signature}</p>
    </div>
  );
};

export default ThankYou;
