import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import "../App.css";
import API from "../adapters/API";
import AllBids from "../components/AllBids";
import CountdownTimer from "../components/CountdownTimer";
import BidForm from "../components/BidForm";

const Current = ({
  placeBidAndSaveUser,
  setBidWin,
  currentItem,
  endOfAuction,
  bid,
  setBid,
  allBids,
  setDisplayBids,
  displayBids
}) => {
  const centerImage = {
    width: "90vw",
    margin: "0 auto",
    padding: "3px"
  };

  // defining state and auth
  const { loading, user } = useAuth0();

  const placeBidForm = () => {
    if (loading) {
      return <div>Loading...</div>;
    } else if (!user) {
      return <div>Please log in to place a bid</div>;
    } else {
      return (
        <BidForm
          placeBidAndSaveUser={placeBidAndSaveUser}
          painting_id={currentItem.painting_id}
          user={user.sub}
          bid={bid}
          setBid={setBid}
        />
      );
    }
  };

  return (
    <div>
      <h1>LIVE AUCTION</h1>
      {!loading && <button onClick={endOfAuction}>Demo: End of Auction</button>}
      <CountdownTimer
        item={currentItem}
        auctionStarted={true}
        setBidWin={setBidWin}
      />
      <img src={"http://localhost:3001/assets/Bunmi.jpg"} style={centerImage} />
      <button>Bid on this piece</button>
      {placeBidForm()}
      <h1>Highest Bid:</h1>
      <h2> {allBids[0] !== undefined && allBids[0].display_text}</h2>
      <h1 onClick={() => setDisplayBids(!displayBids)}>All Bids</h1>
      {displayBids && <AllBids allBids={allBids} />}
    </div>
  );
};

export default Current;
