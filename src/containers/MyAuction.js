import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";

const MyAuction = () => {
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

  const showBids = () => {
    return myBids.map(bid => <p key={bid.id}> {bid} </p>);
  };

  return (
    <div>
      {console.log()}
      <h2>My Auction Bids</h2>
      <div>
        {myBids.length !== 0
          ? showBids()
          : "You have not made any bids yet. To place a bid click here."}
      </div>
    </div>
  );
};

export default MyAuction;
