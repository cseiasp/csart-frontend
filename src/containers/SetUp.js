import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// semantic
import { Form, Button, Input, Label } from "semantic-ui-react";
//my components
import API from "../adapters/API";

const SetUp = ({ setAuctionItems, auctionItems }) => {
  const [day, setDay] = useState(14);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2020);
  const [time, setTime] = useState(11);
  const [endDay, setEndDay] = useState(17);
  const [endMonth, setEndMonth] = useState(0);
  const [endYear, setEndYear] = useState(2020);
  const [endTime, setEndTime] = useState(11);
  const [painting, setPainting] = useState(76);
  const [status, setStatus] = useState("upcoming");
  const history = useHistory();

  const setNewAuction = event => {
    event.preventDefault();
    const startDate = new Date(year, month, day, time);
    const start = startDate.getTime();
    const endDate = new Date(endYear, endMonth, endDay, endTime);
    const end = endDate.getTime();
    console.log(status);
    API.setAuction(painting, start, end, status).then(item =>
      setAuctionItems([...auctionItems, item])
    );
    history.push("/auctions");
  };

  return (
    <Form onSubmit={event => setNewAuction(event)}>
      <h1 style={{ zIndex: "1" }}>Set up auction</h1>
      <Label>Painting ID:</Label>
      <Input
        placeholder="1"
        type="text"
        name="painting"
        onChange={e => setPainting(e.target.value)}
      />

      <h2>Start</h2>
      <Label>Day:</Label>
      <Input
        placeholder="15"
        type="text"
        name="day"
        onChange={e => setDay(e.target.value)}
      />
      <br />

      <Input
        placeholder="0"
        type="text"
        name="month"
        onChange={e => setMonth(e.target.value)}
      />
      <Label>:Month</Label>
      <br />
      <Label>Year:</Label>
      <Input
        placeholder="2020"
        type="text"
        name="year"
        onChange={e => setYear(e.target.value)}
      />
      <br />

      <Input
        placeholder="11"
        type="text"
        name="time"
        onChange={e => setTime(e.target.value)}
      />
      <Label>:Time</Label>
      <h2>End</h2>
      <Label>Day:</Label>
      <Input
        placeholder="17"
        type="text"
        name="endDay"
        onChange={e => setEndDay(e.target.value)}
      />
      <br />

      <Input
        placeholder="0"
        type="text"
        name="endMonth"
        onChange={e => setEndMonth(e.target.value)}
      />
      <Label>:Month</Label>
      <br />
      <Label>Year:</Label>
      <Input
        placeholder="2020"
        type="text"
        name="endYear"
        onChange={e => setEndYear(e.target.value)}
      />
      <br />

      <Input
        placeholder="11"
        type="text"
        name="endTime"
        onChange={e => setEndTime(e.target.value)}
      />
      <Label>:Time</Label>
      <h2>Status</h2>
      <Label>Auction Status:</Label>
      <select onChange={e => setStatus(e.target.value)}>
        <option defaultValue value="select">
          Select One
        </option>
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
        <option value="current">Current</option>
      </select>
      <Button basic color="black" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SetUp;
