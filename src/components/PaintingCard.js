import React from "react";
import { Divider } from "semantic-ui-react";

const PaintingCard = ({ drawing, type }) => {
  const centerImage = {
    width: "92vw",
    margin: "0 auto",
    padding: "3px"
  };

  return (
    <div className="stickyPainting">
      <img
        key={drawing.id}
        src={"http://localhost:3001/assets/" + type + "/" + drawing.url}
        style={centerImage}
      />
      <p style={{ textIndent: "10px" }}>
        {drawing.name + ", " + drawing.medium}
      </p>
      <p style={{ textIndent: "10px" }}>
        {drawing.exhibited_at && "Exhibited at: " + drawing.exhibited_at}
      </p>
    </div>
  );
};

export default PaintingCard;
