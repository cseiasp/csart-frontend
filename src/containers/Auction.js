import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import AuctionNav from "../components/AuctionNav";
import CountdownTimer from "../components/CountdownTimer";

const centerImage = {
  width: "90vw",
  margin: "0 auto"
};

const Auction = ({auctionItems, myId}) => {

  return (
    <div>
      <h1>AUCTIONS</h1>
      <AuctionNav auctionStarted={auctionItems().auctionOn} myId = {myId}/>
      
      <h2>
        {auctionItems().auctionOn
          ? "Live Auction Has Started"
          : "Next Auction:"}
      </h2>
      <CountdownTimer
        item={auctionItems().items[0]}
        auctionStarted={auctionItems().auctionOn}
      />
      {console.log(auctionItems().items[0])}
      {auctionItems().items[0] === undefined ? (
        ""
      ) : (
        <img
          src={
            "http://localhost:3001/assets/" +
            auctionItems().items[0].painting.url
          }
          style={centerImage}
        />
      )}
    </div>
  );
};

export default Auction;
