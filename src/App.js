//react
import React, { useState, useEffect } from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";
//modal
import Modal from "react-modal";
//authentication using Auth0
import { useAuth0 } from "./react-auth0-spa";
//stripe
import { StripeProvider } from "react-stripe-elements";
//semantic-ui components
import { Container } from "semantic-ui-react";
//my components
import "./App.css";
import NavBarMobile from "./components/NavBarMobile";
import LandingPage from "./components/LandingPage";
import Portraits from "./containers/Portraits";
import Auction from "./containers/Auction";
import MyAuctions from "./containers/MyAuction";
import SetUp from "./containers/SetUp";
import Upcoming from "./containers/Upcoming";
import Current from "./containers/Current";
import Watercolours from "./containers/Watercolours";
import Purchase from "./containers/Purchase";
import WinningBid from "./components/WinningBid";
import NavLinkItem from "./components/NavLinkItem";

import API from "./adapters/API";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const centeredText = {
  textAlign: "center"
};

Modal.setAppElement("#root");

const App = () => {
  // auth
  const { loading, user } = useAuth0();
  //state for myAuction
  const [myBids, setMyBids] = useState([]);
  const [myId, setMyId] = useState("");
  //state for current
  const [bid, setBid] = useState("");
  const [allBids, setAllBids] = useState([]);

  const history = useHistory();
  //state for App
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [auctionItems, setAuctionItems] = useState([]);
  const [bidWinners, setBidWinners] = useState([]);
  const [myWins, setMyWins] = useState([]);

  //modal function
  const openOrCloseModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  //auction functions
  const defineAuctionItems = () => {
    if (selectAuctionItemWithStatus("current").length > 0) {
      console.log(selectAuctionItemWithStatus("current"));
      return {
        items: selectAuctionItemWithStatus("current"),
        auctionOn: true
      };
    } else {
      console.log(selectAuctionItemWithStatus("upcoming"));
      return {
        items: selectAuctionItemWithStatus("upcoming"),
        auctionOn: false
      };
    }
  };

  const selectAuctionItemWithStatus = status => {
    return auctionItems.filter(item => item.status === status);
  };

  const defineBidWin = bidWin => {
    const newBidWinners = [bidWin, ...bidWinners];
    setBidWinners(newBidWinners);
  };

  const defineMyWins = myWins => {
    setMyWins(myWins);
  };

  //functions for current component
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
      // .then(bid => console.log(bid.new_bid));
      .then(bid => addBid(bid.new_bid));
  };

  const addBid = bid => {
    const newBids = [bid, ...allBids];
    setAllBids(newBids);
  };

  const setItemToPast = id => {
    const updatedItems = auctionItems.map(item =>
      item.id === id ? { ...item, status: "past" } : item
    );
    setAuctionItems(updatedItems);
  };

  const endOfAuction = () => {
    const currentItem = selectAuctionItemWithStatus("current")[0];
    API.endOfAuction(39, "successful")
      .then(bid => defineBidWin(bid.win.sale))
      .then(() => API.setAuctionToPast(currentItem.id, "past"))
      .then(item => setItemToPast(item.id))
      .then(history.push("/auctions"))
      .catch(error => console.log(error));
  };

  // functions for myAuction component
  const setUserAndBids = user => {
    setMyBids(user.bids);
    setMyId(user.user.id);
  };

  const getMyIdAndBids = () => {
    if (loading || !user) {
      return <div>Loading...</div>;
    } else {
      API.saveUser(user.sub, false)
        .then(userInfo => API.getMyBids(userInfo.id))
        .then(user => setUserAndBids(user))
        .catch(errors => console.log(errors));
    }
  };
  //for purchase and myAuction components

  const displayWinningBids = () => {
    if (loading) {
      return <div>loading...</div>;
    } else {
      return (
        <>
          <p>You have a winning bid</p>
          {winningBids()}
          <NavLinkItem linkName="purchase" titleName={"purchase now"} />
        </>
      );
    }
  };

  const winningBids = () => {
    const myWin = bidWinners.filter(win => win.sale.user_id === myId)[0];
    return (
      <>{myWin !== undefined && <WinningBid key={myWin.id} bid={myWin} />}</>
    );
  };

  useEffect(() => {
    API.getAuction().then(auctionItems => setAuctionItems(auctionItems));
    API.getWinners().then(bidWinners => setBidWinners(bidWinners));
    API.getBids().then(bids => setAllBids(bids));
    getMyIdAndBids();
  }, [loading]);

  return (
    <StripeProvider apiKey="pk_test_myvW8ymmcTyzOaUm8ljcy1fE00TO6LFJzY">
      <div style={centeredText}>
        <Container>
          {/* show navbar modal */}
          <h3 onClick={openOrCloseModal}>MENU</h3>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={openOrCloseModal}
            style={customStyles}
          >
            <NavBarMobile close={() => openOrCloseModal()} />
          </Modal>

          {/* defining routes */}
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/portraits" component={Portraits} />
            <Route
              path="/purchase"
              render={props => (
                <Purchase
                  {...props}
                  currentItem={selectAuctionItemWithStatus("current")[0]}
                  bidWinners= {bidWinners}
                  winningBids={winningBids}
                />
              )}
            />
            <Route
              path="/auctions"
              exact
              render={props => (
                <Auction {...props} auctionItems={defineAuctionItems} />
              )}
            />
            <Route
              path="/auctions/upcoming"
              render={props => (
                <Upcoming
                  {...props}
                  upcomingItems={selectAuctionItemWithStatus("upcoming")}
                />
              )}
            />
            <Route
              path="/auctions/current"
              render={props => (
                <Current
                  {...props}
                  currentItem={selectAuctionItemWithStatus("current")[0]}
                  placeBidAndSaveUser={placeBidAndSaveUser}
                  endOfAuction={endOfAuction}
                  bid={bid}
                  setBid={setBid}
                  allBids={allBids}
                />
              )}
            />
            <Route
              path="/myauction"
              render={props => (
                <MyAuctions
                  {...props}
                  currentItem={selectAuctionItemWithStatus("current")[0]}
                  bidWinners={bidWinners}
                  myBids={myBids}
                  myId={myId}
                  displayWinningBids={displayWinningBids}
                />
              )}
            />
            <Route
              path="/auctions/setup"
              render={props => (
                <SetUp
                  {...props}
                  setAuctionItems={setAuctionItems}
                  auctionItems={auctionItems}
                />
              )}
            />
            {/* <Route path="/auctions/past" component={Past} /> */}
            {/* <Route path="/auctions/about" component={About} /> */}
          </Switch>
        </Container>
      </div>
    </StripeProvider>
  );
};

export default App;
