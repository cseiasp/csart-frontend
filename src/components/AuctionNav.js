import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import NavLinkItem from "../components/NavLinkItem";

const AuctionNav = props => {
  const [myId, setMyId] = useState("");
  const { loading, user } = useAuth0();

  const getMyId = () => {
    if (loading || !user) {
      console.log(loading);
      return <div>Loading...</div>;
    } else {
      API.saveUser(user.sub, false)
        .then(user => setMyId(user.id))
        .catch(errors => console.log(errors));
    }
  };

  useEffect(() => {
    getMyId();
  }, [loading]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {props.auctionStarted && (
        <NavLinkItem linkName="auctions/current" titleName={" current |"} />
      )}
      <NavLinkItem linkName="auctions/upcoming" titleName={" upcoming "} />|
      <NavLinkItem linkName="auctions/past" titleName=" past " /> |
      <NavLinkItem linkName="auctions/about" titleName=" about " />
      {myId === 5 && (
        <NavLinkItem linkName="auctions/setup" titleName="| set up " />
      )}
    </div>
  );
};

export default AuctionNav;
