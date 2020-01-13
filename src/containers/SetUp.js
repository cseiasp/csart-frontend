import React, { useState } from "react";
//my components
import API from "../adapters/API";

const SetUp = () => {
  const [day, setDay] = useState(14);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2020);
  const [time, setTime] = useState(11);
  const [endDay, setEndDay] = useState(17);
  const [endMonth, setEndMonth] = useState(0);
  const [endYear, setEndYear] = useState(2020);
  const [endTime, setEndTime] = useState(11);
  const [painting, setPainting] = useState(1);
  const [status, setStatus] = useState("upcoming");

  const setNewAuction = event => {
    event.preventDefault();
    const startDate = new Date(year, month, day, time);
    const start = startDate.getTime();
    const endDate = new Date(endYear, endMonth, endDay, endTime);
    const end = endDate.getTime();
    console.log(status);
    API.setAuction(painting, start, end, status).then(console.log);
  };

  return (
    <div>
      <form onSubmit={event => setNewAuction(event)}>
        <h1>Painting</h1>
        <label>
          Painting ID:
          <input
            placeholder="1"
            type="text"
            name="painting"
            onChange={e => setPainting(e.target.value)}
          />
        </label>
        <h1>Start</h1>
        <label>
          Day:
          <input
            placeholder="15"
            type="text"
            name="day"
            onChange={e => setDay(e.target.value)}
          />
        </label>
        <label>
          Month:
          <input
            placeholder="0"
            type="text"
            name="month"
            onChange={e => setMonth(e.target.value)}
          />
        </label>
        <label>
          Year:
          <input
            placeholder="2020"
            type="text"
            name="year"
            onChange={e => setYear(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            placeholder="11"
            type="text"
            name="time"
            onChange={e => setTime(e.target.value)}
          />
        </label>
        <h1>End</h1>
        <label>
          Day:
          <input
            placeholder="17"
            type="text"
            name="endDay"
            onChange={e => setEndDay(e.target.value)}
          />
        </label>
        <label>
          Month:
          <input
            placeholder="0"
            type="text"
            name="endMonth"
            onChange={e => setEndMonth(e.target.value)}
          />
        </label>
        <label>
          Year:
          <input
            placeholder="2020"
            type="text"
            name="endYear"
            onChange={e => setEndYear(e.target.value)}
          />
        </label>
        <label>
          Time:
          <input
            placeholder="11"
            type="text"
            name="endTime"
            onChange={e => setEndTime(e.target.value)}
          />
        </label>
        <h1>Status</h1>
        <label>
          Auction Status:
          <select onChange={e => setStatus(e.target.value)}>
            <option selected value="select">
              Select One
            </option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="current">Current</option>
          </select>
        </label>
        <h1>
          <input type="submit" value="Submit" />
        </h1>
      </form>
    </div>
  );
};

export default SetUp;
