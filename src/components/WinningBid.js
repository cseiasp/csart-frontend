import React from "react";
//my components

const WinningBid = props => {
  const centerImage = {
    width: "65vw",
    marginTop: "10px",
    paddingTop: "25px",
    margin: "0 auto"
  };
  return (
    <>
      {props.bid !== undefined && (
        <>
          {console.log("winning bids", props.bid)}
          <img
            src={"http://localhost:3001/assets/" + props.bid.sale.painting.url}
            style={centerImage}
          />
          <p style={{ paddingBottom: "14px", fontFamily: "Simplifica" }}>
            Bid Placed: {props.bid.display_text}
          </p>
        </>
      )}
    </>
  );
};

export default WinningBid;
