import React, { useState } from "react";
//stripe
import { CardElement, injectStripe, Elements } from "react-stripe-elements";
//my components

const Payment = props => {
  const [complete, setComplete] = useState(false);
  // const { user } = useAuth0();

  const submit = async event => {
    // User email is either user.email from Auth0 OR from some guest email field
    event.preventDefault();
    let { token } = await props.stripe.createToken({ name: "Name" });
    let body = { token: token.id };
    let response = await fetch("http://localhost:3000/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (response.ok) console.log("payment ok");
  };

  const style = {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  };

  return (
    <div className="checkout">
      <h1>ABOUT</h1>

      <CardElement style={style} />
      <button onClick={submit}>submit</button>
    </div>
  );
};

export default injectStripe(Payment);
