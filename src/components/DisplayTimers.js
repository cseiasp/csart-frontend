import React from "react";
//my components
import CountdownTimer from "../components/CountdownTimer";
import { Grid } from "semantic-ui-react";

const DisplayTimers = ({ item, auctionStarted }) => {
  const centerImageMobile = {
    width: "90vw",
    margin: "0 auto",
    marginTop: "-15%",
    opacity: "0.5",
    paddingTop: "40px"
  };
  const centerImage = {
    width: "90vw",
    margin: "0 auto",
    marginTop: "-35%",
    opacity: "0.5",
    padding: "20px"
  };

  return (
    <div>
      <div className="height-crop" style={{ padding: "10px" }}>
        {console.log(item)}

        {item !== null && (
          <>
            <Grid>
              <Grid.Row only="tablet mobile">
                <img
                  src={"http://localhost:3001/assets/" + item.painting.url}
                  style={centerImageMobile}
                />
              </Grid.Row>
            </Grid>
            <Grid>
              <Grid.Row only="computer">
                <img
                  src={"http://localhost:3001/assets/" + item.painting.url}
                  style={centerImage}
                />
              </Grid.Row>
            </Grid>
            <div className="centered-over-img">
              <h2 style={{ padding: "30px" }}>
                {auctionStarted
                  ? "LIVE BIDDING ENDING IN"
                  : "LIVE BIDDING STARTS IN:"}
              </h2>
              <CountdownTimer
                item={item}
                auctionStarted={auctionStarted}
                fontSize="25px"
                lineHeight="35px"
              />
            </div>
          </>
        )}
      </div>
      <br />
    </div>
  );
};

export default DisplayTimers;
