//react
import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
//stripe
import { StripeProvider } from "react-stripe-elements";
//semantic-ui components
import { Container } from "semantic-ui-react";
//auth0 components
import { useAuth0 } from "./react-auth0-spa";
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
import history from "./utils/history";
import Modal from "react-modal";
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
  // constructor() {
  //   super();

  //   this.state = {
  //     modalIsOpen: false,
  //     auctionItems: [],
  //     bidWinners: [],
  //     myWins: []
  //   };

  //   this.openModal = this.openModal.bind(this);
  //   this.closeModal = this.closeModal.bind(this);
  // }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [auctionItems, setAuctionItems] = useState([]);
  const [bidWinners, setBidWinners] = useState([]);
  const [myWins, setMyWins] = useState([]);

  const openOrCloseModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

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
    const bidWinners = [bidWin, ...bidWinners];
    setBidWinners(bidWinners);
  };

  const defineMyWins = myWins => {
    setMyWins(myWins);
  };

  useEffect(() => {
    API.getAuction()
      .then(auctionItems => setAuctionItems(auctionItems))
      .then(() => API.getWinners())
      .then(bidWinners => setBidWinners(bidWinners));
  }, []);

  return (
    <StripeProvider apiKey="pk_test_myvW8ymmcTyzOaUm8ljcy1fE00TO6LFJzY">
      <div style={centeredText}>
        <Container>
          <Router history={history}>
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
                    bidWinners={bidWinners}
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
                    setBidWin={defineBidWin}
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
                  />
                )}
              />
              <Route path="/auctions/setup" component={SetUp} />
              {/* <Route path="/auctions/past" component={Past} /> */}
              {/* <Route path="/auctions/about" component={About} /> */}
            </Switch>
          </Router>
        </Container>
      </div>
    </StripeProvider>
  );
};

export default App;
