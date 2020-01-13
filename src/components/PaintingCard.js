import React from "react";
import { Divider } from "semantic-ui-react";

const PaintingCard = drawing => {
  const centerImage = {
    width: "90vw",
    margin: "0 auto",
    padding: "3px"
  };

  return (
    <div>
      <img
        key={drawing.id}
        src={"http://localhost:3001/assets/" + drawing.drawing.url}
        style={centerImage}
      />
      <p>
        {drawing.drawing.exhibited_at &&
          "Exhibited at: " + drawing.drawing.exhibited_at}
      </p>
      <Divider />
    </div>
  );
};

export default PaintingCard;
