import React from "react";
import { Divider } from "semantic-ui-react";

const PaintingCard = ({ drawing, type, size, computer }) => {
  const centerImage = {
    objectFit: "cover",
    width: size,
    height: computer && size,
    margin: "0 auto",
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
    <div className="stickyPainting" >
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
      {console.log(
        "http://localhost:3001/assets/" +
          checkComputer() +
          type +
          "/" +
          drawing.url
      )}

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
