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

  return (
    <div className="checkout">
      <h1>ABOUT</h1>

      <CardElement />
      <button onClick={submit}>submit</button>
    </div>
  );
};

export default injectStripe(Payment);
