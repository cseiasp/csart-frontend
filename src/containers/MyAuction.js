import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import API from "../adapters/API";
import WinningBid from "../components/WinningBid";
import NavLinkItem from "../components/NavLinkItem";

const MyAuction = props => {
  const [myBids, setMyBids] = useState([]);
  const [myId, setMyId] = useState("");
  const [displayAllBids, setDisplayAllBids] = useState(false);
  const { loading, user } = useAuth0();

  const setUserAndBids = user => {
    setMyBids(user.bids);
    setMyId(user.user.id);
  };

  const getMyIdAndBids = () => {
    if (loading || !user) {
      console.log(loading);
      return <div>Loading...</div>;
    } else {
      API.saveUser(user.sub, false)
        .then(userInfo => API.getMyBids(userInfo.id))
        .then(user => setUserAndBids(user))
        .catch(errors => console.log(errors));
    }
  };

  useEffect(() => {
    getMyIdAndBids();
  }, [loading]);

  const displayAllMyBids = () => {
    return (
      <div>
        {myBids.length !== 0
          ? showAllBids()
          : "You have not made any bids yet. To place a bid click here."}
      </div>
    );
  };

  const displayWinningBids = () => {
    if (loading) {
      return <div>loading...</div>;
    } else {
      const myWins = props.bidWinners.filter(win => win.sale.user_id === myId);
      return (
        <>
          <p>You have a winning bid</p>
          {myWins.map(win => (
            <WinningBid key={win.id} bid={win} />
          ))}
          <NavLinkItem linkName="purchase" titleName={"purchase now"} />
        </>
      );
    }
  };

  const pendingOrWinningBids = () => {
    if (props.currentItem === undefined && props.bidWinners.length > 0) {
      return <>{displayWinningBids()}</>;
    } else {
      displayAllMyCurrentBids();
    }
  };

  const displayAllMyCurrentBids = () => {
    return !props.currentItem || props.currentItem.length === 0
      ? "You have not made any bids yet. To place a bid click here."
      : showCurrentBids();
  };

  const showAllBids = () => {
    if (props.currentItem === undefined) {
      return myBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
    } else {
      const pastBids = myBids.filter(
        bid => bid.sale.painting_id !== props.currentItem.painting_id
      );
      return pastBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
    }
  };

  const showCurrentBids = () => {
    const currentBids = myBids.filter(
      bid => bid.sale.painting_id === props.currentItem.painting_id
    );
    return currentBids.map(bid => <p key={bid.id}> {bid.display_text} </p>);
  };

  return (
    <div>
      {console.log(props.bidWinners)}
      <h1>My Auction Bids</h1>
      <h2>Pending Bids</h2>
      {props.currentItem !== undefined
        ? displayAllMyCurrentBids()
        : pendingOrWinningBids()}

      <h2 onClick={() => setDisplayAllBids(!displayAllBids)}> Past Bids</h2>
      {displayAllBids && displayAllMyBids()}
    </div>
  );
};

export default MyAuction;
