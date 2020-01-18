import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import NavLinkItem from "../components/NavLinkItem";

const AuctionNav = ({ myId, auctionStarted }) => {
  return (
    <div style={{ margin: "15px", fontSize: "25px", fontFamily: "Simplifica" }}>
      <br />
      {auctionStarted && (
        <NavLinkItem linkName="auctions/current" titleName={" live auction "} />
      )}
      {/* <NavLinkItem linkName="auctions/upcoming" titleName={" upcoming "} />|
      <NavLinkItem linkName="auctions/past" titleName=" past " /> */}
      {myId !== "" && (
        <NavLinkItem linkName="myauction" titleName="| my auction " />
      )}
      {myId === 5 && (
        <NavLinkItem linkName="auctions/setup" titleName="| set up " />
      )}
    </div>
  );
};

export default AuctionNav;
