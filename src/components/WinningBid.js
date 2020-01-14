import React from "react";

const WinningBid = props => {
  const centerImage = {
    width: "50vw",
    margin: "0 auto"
  };
  return (
    <div>
      <img
        src={"http://localhost:3001/assets/" + props.bid.sale.painting.url}
        style={centerImage}
      />
      <p>Bid Placed: {props.bid.display_text}</p>
      <button>Purchase Now</button>
    </div>
  );
};

export default WinningBid;
