import React from "react";
//semantic-ui components
import { Grid, Image } from "semantic-ui-react";
//mycomponents
import drawings from "../Pap.jpg";
import "../App.css";

const LandingPage = () => {
  const centerImage = {
    width: "93vw",
    margin: "0 auto"
  };
  return (
    <>
      <h1>CAROLINE SEILERN ART</h1>
      <br />
      <img src={drawings} style={centerImage} />
    </>
  );
};

export default LandingPage;
