import React from "react";
//my components

const WinningBid = props => {
  const centerImage = {
    width: "50vw",
    margin: "0 auto"
  };
  return (
    <div>
      {props.bid !== undefined && (
        <>
          {console.log("winning bids", props.bid)}
          <img
            src={"http://localhost:3001/assets/" + props.bid.sale.painting.url}
            style={centerImage}
          />
          <p>Bid Placed: {props.bid.display_text}</p>
        </>
      )}
    </div>
  );
};

export default WinningBid;
