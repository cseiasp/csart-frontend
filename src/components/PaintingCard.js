import React from "react";
import { Grid } from "semantic-ui-react";

const PaintingCard = ({ drawing, type, size, computer, total }) => {
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

  const idNumber = () => {
    const num = ((drawing.id % total) + 2) % total;
    if (num === 0) {
      return total;
    } else {
      return num;
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
        <Grid>
          <Grid.Column>
            <p style={{ textAlign: "left", backgroundColor: "white" }}>
              {idNumber()}/{total}&nbsp;
            </p>
          </Grid.Column>
          <Grid.Column width={14}>
            <p
              className="paragraph"
              style={{ fontSize: "11px", paddingTop: "8px" }}
            >
              {drawing.exhibited_at && drawing.exhibited_at}
            </p>
            <p
              className="paragraph"
              style={{ fontSize: "11px", paddingTop: "8px" }}
            >
              {drawing.award && drawing.award}
            </p>
          </Grid.Column>
        </Grid>
      </>
    </div>
  );
};

export default PaintingCard;
