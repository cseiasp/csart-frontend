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
import Auctions from "./containers/Auction";
import MyAuctions from "./containers/MyAuction";
import SetUp from "./containers/SetUp";
import Upcoming from "./containers/Upcoming";
import Watercolours from "./containers/Watercolours";
import About from "./containers/About";
import history from "./utils/history";
import Modal from "react-modal";

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
      modalIsOpen: false
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

  render() {
    return (
      <StripeProvider apiKey="pk_test_myvW8ymmcTyzOaUm8ljcy1fE00TO6LFJzY">
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
                <Route path="/about" component={About} />
                <Route path="/auctions" exact component={Auctions} />
                <Route path="/auctions/upcoming" component={Upcoming} />
                <Route path="/myauction" component={MyAuctions} />
                <Route path="/myauction/setup" component={SetUp} />
                {/* <Route path="/auctions/past" component={Past} /> */}
                {/* <Route path="/auctions/about" component={About} /> */}
              </Switch>
            </Router>
          </Container>
        </div>
      </StripeProvider>
    );
  }
}

export default App;
