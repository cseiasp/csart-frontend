import React, { useState, useEffect } from "react";
//my components
import API from "../adapters/API";
import { Grid } from "semantic-ui-react";

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
        props.endOfAuction();
        return;
      } else if (difference === 0) {
        return;
      }
      // show time countdown
      const handle = setInterval(() => timeLeft(time), 1000);
      return () => {
        clearInterval(handle);
      };
    }
  }, [seconds, props.item]);

  return (
    <>
      <table className="center" style={{ lineHeight: props.lineHeight }}>
        <tbody>
          <tr>
            <td>{days}</td>
            <td> : </td>
            <td>{hours}</td>
            <td> : </td>
            <td>{minutes}</td>
            <td> : </td>
            <td>{seconds}</td>
          </tr>

          <tr style={{ fontSize: props.fontSize }}>
            <td>{days === 1 ? "DAY" : "DAYS"}</td>
            <td> </td>
            <td>HOURS</td>
            <td> </td>
            <td>MINUTES</td>
            <td> </td>
            <td>SECONDS</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AuctionItem;
