import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import AuctionNav from "../components/AuctionNav";
import AuctionItem from "../components/AuctionItem";

const Auction = props => {
  const [auction, setAuction] = useState(false);

  const auctionOn = () => {
    const auctionOn = props.currentItem.length > 0;
    return auctionOn;
  };

  // useEffect(() => {
  //   auctionOn();
  // }, [props.currentItem]);
  console.log("auction", props.upcomingItems);
  return (
    <div>
      <h1>AUCTIONS</h1>
      <AuctionNav
        auctionStarted={props.currentItem.length > 0 ? true : false}
      />
      <AuctionItem
        item={
          props.currentItem.length > 0
            ? props.currentItem
            : props.upcomingItems[0]
        }
        auctionStarted={props.currentItem.length > 0 ? true : false}
      />
    </div>
  );
};

export default Auction;
