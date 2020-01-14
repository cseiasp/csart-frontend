import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";

const MyAuction = props => {
  const [myBids, setMyBids] = useState([]);
  const { loading, user } = useAuth0();

  const getMyIdAndBids = () => {
    if (loading || !user) {
      console.log(loading);
      return <div>Loading...</div>;
    } else {
      API.saveUser(user.sub, false)
        .then(userInfo => API.getMyBids(userInfo.id))
        .then(user => setMyBids(user.bids))
        .catch(errors => console.log(errors));
    }
  };

  useEffect(() => {
    getMyIdAndBids();
  }, [loading]);

  const showAllBids = () => {
    return myBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
  };
  const showCurrentBids = () => {
    const currentBids = myBids.filter(
      bid => bid.painting_id === props.currentItem.painting_id
    );
    return currentBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
  };

  return (
    <div>
      {console.log()}
      <h1>My Auction Bids</h1>
      <h2>My Current Bids</h2>
      {!props.currentItem || props.currentItem.length === 0
        ? "You have not made any bids yet. To place a bid click here."
        : showCurrentBids()}
      <h2>All My Bids</h2>
      <div>
        {myBids.length !== 0
          ? showAllBids()
          : "You have not made any bids yet. To place a bid click here."}
      </div>
    </div>
  );
};

export default MyAuction;
