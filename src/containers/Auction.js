import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import AuctionNav from "../components/AuctionNav";
import AuctionItem from "../components/AuctionItem";

const Auction = props => {
  console.log("auction", props.auctionItems().items);
  return (
    <div>
      <h1>AUCTIONS</h1>
      <AuctionNav auctionStarted={props.auctionItems().auctionOn} />
      <AuctionItem
        item={props.auctionItems().items[0]}
        auctionStarted={props.auctionItems().auctionOn}
      />
    </div>
  );
};

export default Auction;
