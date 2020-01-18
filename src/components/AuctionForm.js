import React, { useEffect } from "react";
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
          <Grid centered>
            <img
              src={"http://localhost:3001/assets/" + currentItem.painting.url}
              style={centerImage}
            />
          </Grid>

          <div className="centered-over-img-top">
            <h2 style={{ fontFamily: "Simplifica" }}>
              " {currentItem.painting.name} "
            </h2>
            {placeBidForm()}
            <h2>Highest Bid:</h2>

            {allBids[0] !== undefined && allBids[0].display_text}
            <h2 onClick={() => setDisplayBids(!displayBids)}>All Bids</h2>
            {displayBids && <AllBids allBids={allBids} />}
            {!loading && (
              <button onClick={endOfAuction}>Demo: End of Auction</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AuctionForm;
