import React from "react";

const AllBids = props => {
  return (
    <div>
      {props.allBids.slice(0, 5).map(bid => (
        <p
          key={bid.id}
          style={{ margin: "0px", padding: "0px", fontSize: "15px" }}
        >
          {bid.display_text}
        </p>
      ))}
    </div>
  );
};

export default AllBids;
