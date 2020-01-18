import React from "react";
//my components
import CountdownTimer from "../components/CountdownTimer";

const DisplayTimers = ({ item }) => {
  const centerImage = {
    width: "90vw",
    margin: "0 auto",
    marginTop: "-35%",
    opacity: "0.5"
  };

  return (
    <div>
      <div className="height-crop" style={{ padding: "10px" }}>
        {console.log(item)}

        {item !== null && (
          <>
            <img
              src={"http://localhost:3001/assets/" + item.painting.url}
              style={centerImage}
            />
            <div className="centered-over-img">
              <CountdownTimer
                item={item}
                auctionStarted={true}
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
