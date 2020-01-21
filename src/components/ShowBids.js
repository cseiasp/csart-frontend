import React from "react";

const ShowBids = ({ bids }) => {
  return (
    <div>
      <img src={"http://localhost:3001/assets/" + bid.sale.painting.url} />
      <div className="centered-over-img"></div>
    </div>
  );
};

export default ShowBids;
