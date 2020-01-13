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

const Auction = props => {
  console.log("auction", props.auctionItems().items);
  return (
    <div>
      <h1>AUCTIONS</h1>
      <AuctionNav auctionStarted={props.auctionItems().auctionOn} />
      <h2>
        {props.auctionItems().auctionOn
          ? "Live Auction Has Started"
          : "Next Auction:"}
      </h2>
      <CountdownTimer
        item={props.auctionItems().items[0]}
        auctionStarted={props.auctionItems().auctionOn}
      />
      {console.log(props.auctionItems().items[0])}
      {props.auctionItems().items[0] === undefined ? (
        ""
      ) : (
        <img
          src={
            "http://localhost:3001/assets/" +
            props.auctionItems().items[0].painting.url
          }
          style={centerImage}
        />
      )}
    </div>
  );
};

export default Auction;
