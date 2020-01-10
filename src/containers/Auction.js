import React, { useState, useEffect } from "react";
import NavLinkItem from "../components/NavLinkItem";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";

const Auction = () => {
  const { auction, setAuction } = useState(false);
  const { myId, setMyId } = useState({});
  const { loading, user } = useAuth0();

  const getMyId = () => {
    API.saveUser(user.sub, false)
      .then(setMyId)
      .catch(errors => console.log(errors));
  };

  useEffect(() => {
    getMyId();
  }, []);

  if (loading || !user) {
    console.log(loading);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>AUCTIONS</h1>
      {console.log(myId)}
      <p>
        <NavLinkItem
          linkName="auctions/upcoming"
          titleName={auction ? " current " : " upcoming "}
        />
        |
        <NavLinkItem linkName="auctions/past" titleName=" past " /> |
        <NavLinkItem linkName="auctions/about" titleName=" about " />
        {myId === 5 && (
          <NavLinkItem linkName="auctions/setup" titleName="| set up " />
        )}
      </p>
    </div>
  );
};

export default Auction;
