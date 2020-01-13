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
    setAuction(auctionOn);
  };

  useEffect(() => {
    auctionOn();
  }, []);

  return (
    <div>
      <h1>AUCTIONS</h1>
      <AuctionNav auctionStarted={auction} />
      {/* <AuctionItem
        item={
          props.currentItem.length > 0
            ? props.currentItem[0]
            : props.upcomingItems[0]
        }
        auctionStarted={auction}
      /> */}
    </div>
  );
};

export default Auction;
