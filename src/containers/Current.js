import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//semantic-ui components
import { Grid } from "semantic-ui-react";

//my components
import "../App.css";
import API from "../adapters/API";
import AllBids from "../components/AllBids";
import ImgFlip from "../components/ImgFlip";
import CountdownTimer from "../components/CountdownTimer";
import BidForm from "../components/BidForm";

const Current = ({
  placeBidAndSaveUser,
  setBidWin,
  currentItem,
  endOfAuction,
  bid,
  bidPlaced,
  setBid,
  allBids,
  setAllBids,
  error
}) => {
  // defining state and auth
  const { loading, user } = useAuth0();
  const [displayBids, setDisplayBids] = useState(false);
  const placeBidForm = (size ) => {
    if (loading) {
      return <div>Loading...</div>;
    } else if (!user) {
      return <div>Please log in to place a bid</div>;
    } else {
      return (
        <BidForm
          placeBidAndSaveUser={placeBidAndSaveUser}
          painting_id={currentItem.painting_id}
          user={user.sub}
          bid={bid}
          setBid={setBid}
          size = {size}
        />
      );
    }
  };

  return (
    <div className="vertical-scroll-snap">
      <h1>LIVE AUCTION</h1>

      <div className="border">
        <CountdownTimer
          item={currentItem}
          auctionStarted={true}
          setBidWin={setBidWin}
          fontSize="20px"
          padding="5pz"
          lineHeight="30px"
          endOfAuction={endOfAuction}
        />
      </div>

      <Grid centered>
        <ImgFlip
          currentItem={currentItem}
          allBids={allBids}
          placeBidForm={placeBidForm}
          displayBids={displayBids}
          endOfAuction={endOfAuction}
          setDisplayBids={setDisplayBids}
          setAllBids={setAllBids}
          bidPlaced={bidPlaced}
          error={error}
        />
      </Grid>
    </div>
  );
};

export default Current;
