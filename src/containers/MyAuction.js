import React, { useState, useEffect } from "react";
//my components
import API from "../adapters/API";

const MyAuction = () => {
  const [myBids, setMyBids] = useState([]);

  useEffect(() => {
    API.getMyBids().then(bids => setMyBids(bids.bids));
  }, []);
  return <div></div>;
};

export default MyAuction;
