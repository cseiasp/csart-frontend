import React, { useState } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//stripe
import { CardElement, injectStripe } from "react-stripe-elements";
//semantic-ui components
import { Label, Button, Icon, Grid } from "semantic-ui-react";
//my components
import "../App.css";
import API from "../adapters/API";

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
      API.endOfAuction(props.saleId, "paid");
      props.setPaymentOk(true);
    } else {
      alert("There was an error with your payment, please try again.");
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

  const paymentComplete = () => {
    if (props.paymentOk) {
      return (
        <p>
          Your payment was succesfully completed. You will shorty receive an
          email to confirm delivery details.
        </p>
      );
    } else {
      return (
        <>
          <Label style={{ fontSize: "15px", marginBottom: "10px" }}>
            Payment details
          </Label>
          <CardElement style={style} />
        </>
      );
    }
  };

  const displayButton = () => {
    if (props.paymentOk) {
      return <Button onClick={props.close}>Close</Button>;
    } else {
      return (
        <Button basic color="black" onClick={submit}>
          Purchase
        </Button>
      );
    }
  };

  return (
    <div className="checkout">
      <h2 style={{ fontSize: "45px" }}>CHECKOUT</h2>
      <Icon name="shopping cart" size="large" />

      <div style={{ padding: "20px 0px 50px 0px" }}>{paymentComplete()}</div>

      {displayButton()}
      <p style={{ fontSize: "10px", paddingTop: "10px" }}>
        * Payments will be controlled and processed securely by Stripe
      </p>
    </div>
  );
};

export default injectStripe(Payment);
