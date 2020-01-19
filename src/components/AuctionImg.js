import React, { useState, useEffect } from "react";
//semantic-ui components
import { Grid, Button } from "semantic-ui-react";
//my components
import "../App.css";

const AuctionImg = ({ currentItem, handleClick }) => {
  const centerImageMobile = {
    height: "75vh",
    margin: "0 auto",
    top: "15rem"
  };
  const centerImage = {
    width: "30vw",
    margin: "0 auto",
    top: "15rem"
  };

  return (
    <div className="stickyPaintingAuction">
      {currentItem !== undefined && (
        <>
          <Grid centered>
            <Grid.Row only="mobile" style={{ padding: "0px" }}>
              <img
                src={"http://localhost:3001/assets/" + currentItem.painting.url}
                style={centerImageMobile}
              />
            </Grid.Row>
          </Grid>

          <Grid centered>
            <Grid.Row only="tablet computer">
              <img
                src={"http://localhost:3001/assets/" + currentItem.painting.url}
                style={centerImage}
              />
            </Grid.Row>
          </Grid>

          <Grid centered>
            <Button
              basic
              color="black"
              style={{ margin: "2px 0px 0px 0px" }}
              onClick={handleClick}
            >
              Make a Bid
            </Button>
          </Grid>
        </>
      )}
    </div>
  );
};

export default AuctionImg;
