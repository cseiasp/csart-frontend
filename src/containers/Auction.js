import React, { useState, useEffect } from "react";
import NavLinkItem from "../components/NavLinkItem";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import AuctionItem from "../components/AuctionItem";

const Auction = props => {
  const [auction, setAuction] = useState(false);
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
      <AuctionItem
        itemURL={
          props.currentItem.length > 0
            ? props.currentItem.painting.url
            : props.upcomingItems[0].painting.url
        }
      />
    </div>
  );
};

export default Auction;
