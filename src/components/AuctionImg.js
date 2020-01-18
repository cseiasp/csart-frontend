import React, { useState, useEffect } from "react";
//semantic-ui components
import { Grid, Button } from "semantic-ui-react";
//my components
import "../App.css";

const AuctionImg = ({ currentItem, handleClick }) => {
  const centerImage = {
    width: "95vw",
    margin: "0 auto",
    top: "15rem"
  };

  return (
      <div className="stickyPainting">
        {currentItem !== undefined && (
          <>
            <Grid centered>
              <img
                src={"http://localhost:3001/assets/" + currentItem.painting.url}
                style={centerImage}
              />
            </Grid>
            <Grid centered>
              <Button
                basic
                color="black"
                style={{ margin: "10px 0px 0px 0px" }}
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
