import React, { useState, useEffect } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//my components
import "../App.css";
import API from "../adapters/API";
import AllBids from "../components/AllBids";

const Upcoming = () => {
  const centerImage = {
    width: "90vw",
    margin: "0 auto",
    padding: "3px"
  };

  const placeBidAndSaveUser = (
    event,
    painting_id,
    bid_price,
    status,
    email,
    newsletter
  ) => {
    event.preventDefault();
    API.saveUser(email, newsletter)
      .then(user => API.placeBid(painting_id, user.id, bid_price, status))
      .then(console.log);
  };

  // defining state and auth
  const { loading, user } = useAuth0();
  const [bid, setBid] = useState("");
  const [allBids, setAllBids] = useState([]);
  const [displayBids, setDisplayBids] = useState(false);

  useEffect(() => {
    API.getBids().then(bids => setAllBids(bids));
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>UPCOMING AUCTIONS</h1>
      <img src={"http://localhost:3001/assets/Bunmi.jpg"} style={centerImage} />
      <button>Bid on this piece</button>
      <form
        onSubmit={e =>
          placeBidAndSaveUser(e, 1, bid, "bid placed", user.email, true)
        }
      >
        <label>
          Bid:
          <input
            type="text"
            name="bid"
            onChange={e => setBid(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1>Highest Bid:</h1>
      <h2> {allBids[0]}</h2>
      <h1 onClick={() => setDisplayBids(!displayBids)}>All Bids</h1>
      {displayBids && <AllBids allBids={allBids} />}
    </div>
  );
};

export default Upcoming;
