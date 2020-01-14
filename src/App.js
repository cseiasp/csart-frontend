//react
import React, { useState } from "react";
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

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      auctionItems: [],
      bidWinners: []
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  auctionItems = () => {
    if (this.selectAuctionItemWithStatus("current").length > 0) {
      console.log(this.selectAuctionItemWithStatus("current"));
      return {
        items: this.selectAuctionItemWithStatus("current"),
        auctionOn: true
      };
    } else {
      console.log(this.selectAuctionItemWithStatus("upcoming"));
      return {
        items: this.selectAuctionItemWithStatus("upcoming"),
        auctionOn: false
      };
    }
  };

  selectAuctionItemWithStatus = status => {
    return this.state.auctionItems.filter(item => item.status === status);
  };

  setBidWin = bidWin => {
    const bidWinners = [bidWin, ...this.state.bidWinners];
    this.setState({ bidWinners });
  };

  componentDidMount() {
    API.getAuction()
      .then(auctionItems => this.setState({ auctionItems }))
      .then(() => API.getWinners())
      .then(bidWinners => this.setState({ bidWinners }));
  }

  render() {
    return (
      // <StripeProvider apiKey="pk_test_myvW8ymmcTyzOaUm8ljcy1fE00TO6LFJzY">
      <div style={centeredText}>
        <Container>
          <Router history={history}>
            {/* show navbar modal */}
            <h3 onClick={this.openModal}>MENU</h3>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
            >
              <NavBarMobile close={() => this.closeModal()} />
            </Modal>

            {/* defining routes */}
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/portraits" component={Portraits} />
              {/* <Route path="/purchase" component={Purchase} /> */}
              <Route
                path="/auctions"
                exact
                render={props => (
                  <Auction {...props} auctionItems={this.auctionItems} />
                )}
              />
              <Route
                path="/auctions/upcoming"
                render={props => (
                  <Upcoming
                    {...props}
                    upcomingItems={this.selectAuctionItemWithStatus("upcoming")}
                  />
                )}
              />
              <Route
                path="/auctions/current"
                render={props => (
                  <Current
                    {...props}
                    currentItem={this.selectAuctionItemWithStatus("current")[0]}
                    setBidWin={this.setBidWin}
                  />
                )}
              />
              <Route
                path="/myauction"
                render={props => (
                  <MyAuctions
                    {...props}
                    currentItem={this.selectAuctionItemWithStatus("current")[0]}
                    bidWinners={this.state.bidWinners}
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
      // </StripeProvider>
    );
  }
}

export default App;
