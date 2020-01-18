import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//semantic-ui components
import { Grid, Button } from "semantic-ui-react";
//action cable
import ActionCable from "actioncable";
//my components
import BidForm from "./BidForm";
import AllBids from "./AllBids";

const AuctionForm = ({
  currentItem,
  handleClick,
  placeBidForm,
  allBids,
  displayBids,
  endOfAuction,
  setDisplayBids,
  setAllBids,
  bidPlaced,
  error
}) => {
  const centerImage = {
    width: "95vw",

    margin: "0 auto",
    top: "15rem",
    opacity: "0.2"
  };

  const { loading, user } = useAuth0();

  useEffect(() => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

    cable.subscriptions.create("AuctionChannel", {
      received(data) {
        console.log("AuctionChannel received data", data);
        setAllBids(data.sales);
      }
    });
  }, [bidPlaced]);

  return (
    <div>
      {currentItem !== undefined && (
        <>
          <Grid floated="right">
            <img
              src={"http://localhost:3001/assets/" + currentItem.painting.url}
              style={centerImage}
            />
          </Grid>

          <div className="centered-over-img-top">
            <h2 style={{ fontFamily: "Simplifica" }}>
              " {currentItem.painting.name} "
            </h2>

            <p style={{ color: "red" }}>{error !== "" ? error : ""}</p>
            {placeBidForm()}
            <h2>
              Highest Bid:{" "}
              {allBids[0] !== undefined && "£" + allBids[0].sale.bid_price}
            </h2>
            <h2>Last 5 Bids:</h2>
            <AllBids allBids={allBids} />
          </div>
          {!loading && (
            <Grid centered>
              <Button
                basic
                color="black"
                onClick={endOfAuction}
                style={{ margin: "10px" }}
              >
                Demo: End of Auction
              </Button>
            </Grid>
          )}
        </>
      )}
    </div>
  );
};

export default AuctionForm;
