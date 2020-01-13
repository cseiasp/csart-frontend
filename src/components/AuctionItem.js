import React, { useState, useEffect } from "react";

const centerImage = {
  width: "90vw",
  margin: "0 auto"
};

const AuctionItem = props => {
  const [difference, setDifference] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const timeLeft = timeStamp => {
    const difference = Number(timeStamp) - Date.now();
    const secs = Math.floor(difference / 1000);
    const mins = Math.floor(secs / 60);
    const hrs = Math.floor(mins / 60);

    setSeconds(secs % 60);
    setMinutes(mins % 60);
    setHours(hrs % 24);
    setDays(Math.floor(hrs / 24));
    setDifference(difference);
  };

  useEffect(() => {
    if (props.item !== undefined) {
      const time = props.auctionStarted ? props.item.end : props.item.start;
      if (difference === 0) return;

      setInterval(() => timeLeft(time), 1000);
    }
  }, [seconds, props.item]);

  return (
    <div>
      {props.item === undefined ? (
        ""
      ) : (
        <img
          src={"http://localhost:3001/assets/" + props.item.painting.url}
          style={centerImage}
        />
      )}
      <p>
        {props.auctionStarted ? "Ends" : "Starts"} in {days} days, {hours}{" "}
        hours, {minutes} minutes, {seconds} seconds
      </p>
    </div>
  );
};

export default AuctionItem;
