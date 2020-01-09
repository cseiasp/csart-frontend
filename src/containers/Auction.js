import React, { Component } from "react";
import NavLinkItem from "../components/NavLinkItem";

export class Auction extends Component {
  state = {
    auction: false
  };

  render() {
    return (
      <div>
        <h1>AUCTIONS</h1>
        <p>
          // {this.state.auction ? "CURRENT" : "UPCOMING"} |
          <NavLinkItem linkName="auctions/upcoming" /> |{" "}
          <NavLinkItem linkName="auctions/past" /> |{" "}
          <NavLinkItem linkName="auctions/about" />
        </p>
      </div>
    );
  }
}

export default Auction;
