import React, { useState } from "react";
//stripe
import { CardElement, injectStripe, Elements } from "react-stripe-elements";
//my components
import Payment from "./Payment";

const About = props => {
  return (
    <div>
      <h1>ABOUT</h1>
      <Elements>
        <Payment />
      </Elements>
    </div>
  );
};

export default About;
