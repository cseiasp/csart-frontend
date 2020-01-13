import React from "react";

const centerImage = {
  width: "90vw",
  margin: "0 auto"
};

const AuctionItem = props => {
  return (
    <div>
      {console.log(props.itemURL)}
      <img
        src={"http://localhost:3001/assets/" + props.itemURL}
        style={centerImage}
      />
    </div>
  );
};

export default AuctionItem;
