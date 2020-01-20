import React, { useState } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//stripe
import { CardElement, injectStripe } from "react-stripe-elements";
//semantic-ui components
import { Container, Button } from "semantic-ui-react";

const Payment = props => {
  const { user } = useAuth0();

  const submit = async event => {
    // User email is either user.email from Auth0 OR from some guest email field
    event.preventDefault();
    let { token } = await props.stripe.createToken({ name: "Name" });
    let body = { token: token.id, email: user.email };
    let response = await fetch("http://localhost:3000/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      props.setPaymentOk(true);
    }
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
      <CardElement style={style} />
      <Button basic color="black" onClick={submit}>
        submit
      </Button>
    </div>
  );
};

export default injectStripe(Payment);
