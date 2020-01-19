import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
//my components
import AuctionImg from "./AuctionImg";
import AuctionForm from "./AuctionForm";

const ImgFlip = ({
  currentItem,
  placeBidForm,
  allBids,
  displayBids,
  endOfAuction,
  setAllBids,
  bidPlaced,
  error
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <AuctionImg handleClick={handleClick} currentItem={currentItem} />
      <AuctionForm
        handleClick={handleClick}
        currentItem={currentItem}
        placeBidForm={placeBidForm}
        allBids={allBids}
        displayBids={displayBids}
        endOfAuction={endOfAuction}
        setAllBids={setAllBids}
        bidPlaced={bidPlaced}
        error={error}
      />
    </ReactCardFlip>
  );
};

export default ImgFlip;
