import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import "../App.css";
import AuctionNav from "../components/AuctionNav";
import DisplayTimers from "../components/DisplayTimers";

const Auction = ({ auctionItems, myId, upcomingItems }) => {
  return (
    <div>
      <h1>AUCTIONS</h1>
      {console.log("test", auctionItems)}
      {console.log("with ()", auctionItems().items[0])}
      <AuctionNav auctionStarted={auctionItems().auctionOn} myId={myId} />

      <h2>
        {auctionItems().auctionOn
          ? "Live Auction Has Started"
          : "Next Auction:"}
      </h2>

      {console.log(auctionItems().items[0])}
      {auctionItems().items[0] !== undefined &&
        auctionItems().items.map(item => <DisplayTimers item={item} />)}
    </div>
  );
};

export default Auction;
