import React, { useState, useEffect } from "react";
//my components
import API from "../adapters/API";

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
      //if auction is ongoing, set countdown to end-date, otherwise set to start-date
      const time = props.auctionStarted ? props.item.end : props.item.start;
      //if auction is ongoing and end time has been hit, set auction bid winner
      if (props.auctionStarted && difference === 0) {
        API.endOfAuction(39, "successful")
          .then(bid => props.setBidWin(bid.win.sale))
          .then(() => API.setAuctionToPast(props.item.id, "past"))
          .then(console.log)
          .catch(error => console.log(error));
        clearInterval(time);
        return;
      } else if (difference === 0) {
        clearInterval(time);
        return;
      }
      // show time countdown
      setInterval(() => timeLeft(time), 1000);
      return () => {
        clearInterval(time);
      };
    }
  }, [seconds, props.item]);

  return (
    <div>
      <p>
        {props.auctionStarted ? "Ends" : "Starts"} in {days} days, {hours}{" "}
        hours, {minutes} minutes, {seconds} seconds
      </p>
    </div>
  );
};

export default AuctionItem;
