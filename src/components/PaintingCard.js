import React from "react";
import { Divider } from "semantic-ui-react";

const PaintingCard = ({ drawing, type, size, computer }) => {
  const centerImage = {
    objectFit: "cover",
    margin: "0 auto",
    width: size,
    height: computer && size,
    paddingBottom: computer && "5px"
  };

  const checkComputer = () => {
    if (computer) {
      return "Computer/";
    } else {
      return "";
    }
  };

  return (
    <div className="stickyPainting" style={{ width: size, zIndex: "-5" }}>
      <img
        key={drawing.id}
        src={
          "http://localhost:3001/assets/" +
          checkComputer() +
          type +
          "/" +
          drawing.url
        }
        style={centerImage}
      />
      <>
        <p className="paragraph">{drawing.name + ", " + drawing.medium}</p>
        <p className="paragraph">
          {drawing.exhibited_at && drawing.exhibited_at}
        </p>
      </>
    </div>
  );
};

export default PaintingCard;
