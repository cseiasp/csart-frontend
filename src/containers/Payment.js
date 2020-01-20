import React, { useState } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//stripe
import { CardElement, injectStripe } from "react-stripe-elements";
//semantic-ui components
import { Label, Button, Icon } from "semantic-ui-react";
//my components
import "../App.css";

const Payment = props => {
  const { user } = useAuth0();

  const submit = async event => {
    // User email is either user.email from Auth0 OR from some guest email field
    event.preventDefault();
    let { token } = await props.stripe.createToken({ name: "Name" });
    let body = { token: token.id, email: user.email, amount: props.amount };
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
      borderColor: "black",
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
      <h2 style={{ fontSize: "45px" }}>CHECKOUT</h2>
      <Icon name="shopping cart" size="large" />
      <div style={{ padding: "20px 0px 75px 0px" }}>
        <Label style={{ fontSize: "15px", marginBottom: "10px" }}>
          Payment details
        </Label>
        <CardElement style={style} />
      </div>
      <Button basic color="black" onClick={submit}>
        Purchase
      </Button>
      <p style={{ fontSize: "10px", paddingTop: "10px" }}>
        * Payments will be controlled and processed securely by Stripe
      </p>
    </div>
  );
};

export default injectStripe(Payment);
