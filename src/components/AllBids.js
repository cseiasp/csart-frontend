import React from "react";

const AllBids = props => {
  return (
    <div className="stickyPainting">
      {props.allBids.map(bid => (
        <p key={bid.id}>{bid.display_text}</p>
      ))}
    </div>
  );
};

export default AllBids;
