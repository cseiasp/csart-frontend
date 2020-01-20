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
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "grey"
    }
  };

  useEffect(() => {
    getMyId();
  }, [loading]);

  const paymentComplete = () => {
    return <div>Your payment was succesfully complete</div>;
  };

  const paymentDue = () => {
    return (
      <div>
        <h1>BASKET</h1>
        {bidWinners.length > 0 && (
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
                  <Button
                    icon
                    basic
                    color="black"
                    onClick={openOrCloseModal}
                    style={{ marginTop: "10px" }}
                  >
                    <Icon
                      name="shopping cart"
                      style={{ paddingRight: "5px" }}
                    />
                    Proceed to Checkout
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={openOrCloseModal}
              style={customStyles}
            >
              <Elements style={{ padding: "30px" }}>
                <Payment
                  setPaymentOk={setPaymentOk}
                  amount={bidWinners[0].sale.bid_price}
                />
              </Elements>
            </Modal>
          </>
        )}
      </div>
    );
  };

  return <>{paymentOk ? paymentComplete() : paymentDue()}</>;
};

export default Purchase;
