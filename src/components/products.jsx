import producimg from "./image.png";
import whiteTshirt from "./whiteTshirt.jpg";
import blackTshirt from "./blackTshirt.jpg";

const Products = () => {
  // const amount = 5000;
  // lets add currency dynamically based on the product price
  const currency = "INR";
  const receipt = "receipt#1";

  const paymentHandler = async (amount) => {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt,
        }),
      });

      const orderData = await response.json();
      console.log("Order created:", orderData);
      // console.log(orderData.id); // Log the order ID
      const orderId = orderData.id; // Store the order ID for later use

      // Adding razorpay hamdler

      const options = {
        key: "rzp_test_T8FDAxbRkMrTrn", // Enter the Key ID generated from the Dashboard
        amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: orderData.currency,
        name: "Rahul",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        // order_id: "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        order_id: orderId, // Use the order ID obtained from the server
        handler: async function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          const body = { ...response };

          const validateResponse = await fetch(
            "http://localhost:3000/orders/validate",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const jsonResponse = await validateResponse.json();
          console.log("Validation response:", jsonResponse);

          console.log("Complete Razorpay Response:", response);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "+919876543210",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <div className="products-container">
        <div className="products">
          <h2>Products</h2>
          <p>Blue T-shirt</p>
          <img src={producimg} alt="Blue T-shirt" />
          <p>Price RS</p>
          <h5>200</h5>
          <button onClick={() => paymentHandler(20000)}>Pay</button>
        </div>

        <div className="products">
          <h2>Products</h2>
          <p>Black T-shirt</p>
          <img src={blackTshirt} alt="Black T-shirt" />
          <p>Price RS</p>
          <h5>300</h5>
          <button onClick={() => paymentHandler(30000)}>Pay</button>
        </div>

        <div className="products">
          <h2>Products</h2>
          <p>White T-shirt</p>
          <img src={whiteTshirt} alt="White T-shirt" />
          <p>Price RS</p>
          <h5>400</h5>
          <button onClick={() => paymentHandler(40000)}>Pay</button>
        </div>
      </div>
    </>
  );
};

export default Products;
