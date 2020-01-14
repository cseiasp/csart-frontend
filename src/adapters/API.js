import { identifier } from "@babel/types";

const paintingURL = "http://localhost:3000/paintings/";
const salesURL = "http://localhost:3000/sales/";
const usersURL = "http://localhost:3000/users/";
const auctionURL = "http://localhost:3000/auctions/";
const winningsURL = "http://localhost:3000/winnings";

//get requests
const getPaintings = () => {
  return fetch(paintingURL).then(resp => resp.json());
};

const getBids = () => {
  return fetch(salesURL).then(resp => resp.json());
};

const getMyBids = id => {
  return fetch(usersURL + id).then(resp => resp.json());
};

const getAuction = () => {
  return fetch(auctionURL).then(resp => resp.json());
};

const getWinners = () => {
  return fetch(winningsURL).then(resp => resp.json());
};

//post requests
const placeBid = (painting_id, user_id, bid_price, status) => {
  return fetch(salesURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ painting_id, user_id, bid_price, status })
  }).then(resp => resp.json());
};

const saveUser = (email, newsletter) => {
  return fetch(usersURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, newsletter })
  }).then(resp => resp.json());
};

const setAuction = (painting, start, end, status) => {
  return fetch(auctionURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ painting_id: painting, start, end, status })
  }).then(resp => resp.json());
};

//patch requests
const endOfAuction = (id, status) => {
  return fetch(salesURL + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  }).then(resp => resp.json());
};

const setAuctionToPast = (id, status) => {
  return fetch(auctionURL + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  }).then(resp => resp.json());
};

export default {
  getPaintings,
  placeBid,
  saveUser,
  getBids,
  getMyBids,
  getAuction,
  setAuction,
  endOfAuction,
  setAuctionToPast,
  getWinners
};
