import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";

const MyAuction = ({
  bidWinners,
  myBids,
  myId,
  currentItem,
  displayWinningBids
}) => {
  const [displayAllBids, setDisplayAllBids] = useState(false);

  const displayAllMyBids = () => {
    return (
      <div>
        {myBids.length !== 0
          ? showAllBids()
          : "You have not made any bids yet. To place a bid click here."}
      </div>
    );
  };

  const pendingOrWinningBids = () => {
    if (currentItem === undefined && bidWinners.length > 0) {
      return <>{displayWinningBids()}</>;
    } else {
      displayAllMyCurrentBids();
    }
  };

  const displayAllMyCurrentBids = () => {
    return !currentItem || currentItem.length === 0
      ? "You have not made any bids yet. To place a bid click here."
      : showCurrentBids();
  };

  const showAllBids = () => {
    if (currentItem === undefined) {
      return myBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
    } else {
      const pastBids = myBids.filter(
        bid => bid.sale.painting_id !== currentItem.painting_id
      );
      return pastBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
    }
  };

  const showCurrentBids = () => {
    const currentBids = myBids.filter(
      bid => bid.sale.painting_id === currentItem.painting_id
    );
    return currentBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
  };

  return (
    <div>
      <h1>My Auction Bids</h1>
      <h2>Pending Bids</h2>
      {currentItem !== undefined
        ? displayAllMyCurrentBids()
        : pendingOrWinningBids()}

      <h2 onClick={() => setDisplayAllBids(!displayAllBids)}> Past Bids</h2>
      {displayAllBids && displayAllMyBids()}
    </div>
  );
};

export default MyAuction;
