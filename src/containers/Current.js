import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";

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
  setAllBids
}) => {
  // defining state and auth
  const { loading, user } = useAuth0();
  const [displayBids, setDisplayBids] = useState(false);
  const placeBidForm = () => {
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

      <div>
        <ImgFlip
          currentItem={currentItem}
          allBids={allBids}
          placeBidForm = {placeBidForm}
          displayBids={displayBids}
          endOfAuction={endOfAuction}
          setDisplayBids={setDisplayBids}
          setAllBids={setAllBids}
          bidPlaced = {bidPlaced}
        />
        )}
        {placeBidForm()}
        <h1>Highest Bid:</h1>
        <h2 className="stickyPainting">
          {allBids[0] !== undefined && allBids[0].display_text}
        </h2>
        <h1 onClick={() => setDisplayBids(!displayBids)}>All Bids</h1>
        {displayBids && <AllBids allBids={allBids} />}
        {!loading && (
          <button onClick={endOfAuction}>Demo: End of Auction</button>
        )}
      </div>
    </div>
  );
};

export default Current;
