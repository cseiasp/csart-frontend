import React from "react";
//semantic-ui components
import { Grid, Image } from "semantic-ui-react";
//mycomponents
import drawings from "../Pap.jpg";
import LandingPageImg from "../LandingPage.jpg";
import "../App.css";

const LandingPage = () => {
  const centerImageMobile = {
    width: "93vw",
    margin: "0 auto"
  };
  const centerImage = {
    width: "80vw",
    margin: "0 auto",
    paddingTop: "14px"
  };
  return (
    <>
      <h1>CAROLINE SEILERN ART</h1>
      <br />
      <Grid>
        <Grid.Row only="tablet mobile">
          <img src={drawings} style={centerImageMobile} />
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row only=" computer" style={{ padding: "0px" }}>
          <img src={LandingPageImg} style={centerImage} />
        </Grid.Row>
      </Grid>
    </>
  );
};

export default LandingPage;
