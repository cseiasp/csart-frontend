import React from "react";
//my components

const WinningBid = props => {
  const centerImage = {
    width: props.size,
    marginTop: "10px",
    paddingTop: "30px",
    margin: "0 auto"
  };
  return (
    <>
      {props.bid !== undefined && (
        <div>
          {console.log("winning bids", props.bid)}
          <img
            src={"http://localhost:3001/assets/" + props.bid.sale.painting.url}
            style={centerImage}
          />
          <p style={{ paddingBottom: "14px", fontFamily: "Simplifica" }}>
            Bid Placed: {props.bid.display_text}
          </p>
        </div>
      )}
    </>
  );
};

export default WinningBid;
