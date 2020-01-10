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
  }, []);

  return (
    <div>
      <h2>My Auction Bids</h2>
      <p>
        {myBids.length !== 0
          ? "bids"
          : "You have not made any bids yet. To place a bid click here."}
      </p>
    </div>
  );
};

export default MyAuction;
