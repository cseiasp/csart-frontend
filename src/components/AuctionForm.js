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
    marginTop: "-35%",
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
        <div className="height-crop-current ">
          <img
            src={"http://localhost:3001/assets/" + currentItem.painting.url}
            style={centerImage}
          />

          <div className="centered-over-img-current">
            <>
              <h2
                style={{
                  fontFamily: "Simplifica",
                  textAlign: "center",
                  margin: "20px"
                }}
              >
                " {currentItem.painting.name} "
              </h2>
              <Grid
                divided
                centered
                columns={2}
                textAlign="right"
                style={{
                  width: "95vw",
                  fontFamily: "Simplifica"
                }}
              >
                <Grid.Row>
                  <Grid.Column textAlign="right">
                    <h2>
                      {allBids[0] !== undefined &&
                        "£" + allBids[0].sale.bid_price}
                    </h2>
                    <p style={{ fontSize: "18px" }}>HIGHEST BID</p>
                  </Grid.Column>
                  <Grid.Column textAlign="left">
                    <h2>
                      {allBids[0] !== undefined && allBids.length}
                      <p style={{ fontSize: "18px" }}> TOTAL BIDS</p>
                    </h2>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <h2></h2>
                </Grid.Row>
                <Grid.Row>
                  <h1></h1>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column only="tablet computer" textAlign="right">
                    <p style={{ color: "red" }}>{error !== "" ? error : ""}</p>
                    {placeBidForm("31vw")}
                  </Grid.Column>
                  <Grid.Column only="mobile" textAlign="right">
                    <p style={{ color: "red" }}>{error !== "" ? error : ""}</p>
                    {placeBidForm()}
                  </Grid.Column>
                  <Grid.Column textAlign="left">
                    <h2>Last 5 Bids:</h2>
                    <AllBids allBids={allBids} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionForm;
