import React from "react";
//semantic-ui components
import { Grid, Image } from "semantic-ui-react";
//mycomponents
import drawings from "../Pap.jpg";

const LandingPage = () => {
  const centerImage = {
    width: "90vw",
    margin: "0 auto"
  };
  return (
    <>
      <h1>CAROLINE SEILERN ART</h1>
      <br />
      <br />
      <Image src={drawings} style={centerImage} />
    </>
  );
};

export default LandingPage;
