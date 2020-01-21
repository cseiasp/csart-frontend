import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import ShowBids from "../components/ShowBids";

const MyAuction = ({ bidWinners, myBids, currentItem, displayWinningBids }) => {
  const [displayAllBids, setDisplayAllBids] = useState(false);

  const displayAllMyBids = () => {
    return (
      <div>
        {myBids.length !== 0 ? showAllBids() : "There are no bids to display"}
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
      ? "You have not made any bids recently"
      : showCurrentBids();
  };

  const showAllBids = () => {
    if (currentItem === undefined) {
      return <ShowBids bid={myBids} />;
    } else {
      const pastBids = myBids.filter(
        bid => bid.sale.painting_id !== currentItem.painting_id
      );

      return <ShowBids bid={pastBids} />;
    }
  };

  const showCurrentBids = () => {
    const currentBids = myBids.filter(
      bid => bid.sale.painting_id === currentItem.painting_id
    );
    return <ShowBids bids={currentBids} />;
  };

  const displayBids = () => {
    if (!displayAllBids && currentItem !== undefined) {
      return displayAllMyCurrentBids();
    } else if (!displayAllBids) {
      return pendingOrWinningBids();
    } else {
      return displayAllMyBids();
    }
  };

  return (
    <>
      <h1>My Auction Bids</h1>
      <p
        className="margin-top-fifteen p-25"
        onClick={() => setDisplayAllBids(false)}
      >
        PENDING BIDS |&nbsp;
      </p>
      <p
        className=" margin-top-thirty p-25"
        onClick={() => setDisplayAllBids(true)}
      >
        PAST BIDS
      </p>
      {displayBids()}
    </>
  );
};

export default MyAuction;
