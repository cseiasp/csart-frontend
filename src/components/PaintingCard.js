import React from "react";
import { Divider } from "semantic-ui-react";

const PaintingCard = ({ drawing, type }) => {
  const centerImage = {
    width: "90vw",
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
      <p className="paragraph">{drawing.name + ", " + drawing.medium}</p>
      <p className="paragraph">
        {drawing.exhibited_at && drawing.exhibited_at}
      </p>
    </div>
  );
};

export default PaintingCard;
