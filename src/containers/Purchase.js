import React, { useEffect, useState } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//stripe
import { Elements } from "react-stripe-elements";
//modal
import Modal from "react-modal";
//semantic-ui components
import { Grid, Button, Icon } from "semantic-ui-react";
//my components
import "../App.css";
import Payment from "./Payment";
import WinningBid from "../components/WinningBid";
import API from "../adapters/API";

Modal.setAppElement("#root");

const Purchase = ({ winningBids, bidWinners }) => {
  const [myId, setMyId] = useState("");
  const [paymentOk, setPaymentOk] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, user } = useAuth0();

  //modal function
  const openOrCloseModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const checkoutButton = () => {
    if (paymentOk) {
      return (
        <Button icon style={{ marginTop: "10px" }}>
          <Icon name="shopping cart" style={{ paddingRight: "5px" }} />
          Checkout Complete
        </Button>
      );
    } else {
      return (
        <Button
          icon
          basic
          color="black"
          onClick={openOrCloseModal}
          style={{ marginTop: "10px" }}
        >
          <Icon name="shopping cart" style={{ paddingRight: "5px" }} />
          Proceed to Checkout
        </Button>
      );
    }
  };
  const getMyId = () => {
    if (loading || !user) {
      return <div>Loading...</div>;
    } else {
      API.saveUser(user.sub, false)
        .then(user => setMyId(user.id))
        .catch(errors => console.log(errors));
    }
  };

  const customStyles = {
    content: {
      width: "80vw",
      // height: "75vh",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  const displayBasket = () => {
    return (
      <>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column>
              {winningBids()}
              <div className="border-div">
                <h2>Order Summary</h2>

                <Grid divider>
                  <Grid.Column width={8} textAlign="left">
                    <p style={{ fontSize: "18px" }}>
                      Name of Artwork: {bidWinners[0].sale.painting.name}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={8} textAlign="right">
                    <p style={{ fontSize: "18px" }}>
                      Total: £{bidWinners[0].sale.bid_price}
                    </p>
                  </Grid.Column>
                </Grid>
              </div>

              {checkoutButton()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row only="tablet mobile">
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={openOrCloseModal}
              style={customStyles}
            >
              <Elements style={{ padding: "30px" }}>
                <Payment
                  setPaymentOk={setPaymentOk}
                  paymentOk={paymentOk}
                  amount={bidWinners[0].sale.bid_price}
                  close={openOrCloseModal}
                  saleId={bidWinners.length > 0 ? bidWinners[0].sale.id : ""}
                />
              </Elements>
            </Modal>
          </Grid.Row>
        </Grid>
      </>
    );
  };

  const emptyBasket = () => {
    return (
      <div
        style={{
          paddingTop: "50%",
          fontFamily: "Simplifica"
        }}
      >
        <Icon color="grey" name="shopping cart" size="massive" />
        <p style={{ fontSize: "25px" }}> You have no items in your basket</p>
      </div>
    );
  };

  useEffect(() => {
    getMyId();
  }, [loading]);

  return (
    <div>
      <h1>BASKET</h1>
      {bidWinners.length > 0 ? displayBasket() : emptyBasket()}
    </div>
  );
};

export default Purchase;
