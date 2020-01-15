import React, { useEffect, useState } from "react";
//authentication using Auth0
import { useAuth0 } from "../react-auth0-spa";
//stripe
import { CardElement, injectStripe, Elements } from "react-stripe-elements";
//my components
import Payment from "./Payment";
import WinningBid from "../components/WinningBid";
import API from "../adapters/API";
import NavLinkItem from "../components/NavLinkItem";

const Purchase = props => {
  const [myId, setMyId] = useState("");
  const [paymentOk, setPaymentOk] = useState(false);
  const { loading, user } = useAuth0();

  const getMyId = () => {
    if (loading || !user) {
      return <div>Loading...</div>;
    } else {
      API.saveUser(user.sub, false)
        .then(user => setMyId(user.id))
        .catch(errors => console.log(errors));
    }
  };

  const displayWinningBids = () => {
    const myWin = props.bidWinners.filter(win => win.sale.user_id === myId)[0];
    return (
      <>{myWin !== undefined && <WinningBid key={myWin.id} bid={myWin} />}</>
    );
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
        {props.bidWinners.length > 0 && displayWinningBids()}
        <Elements>
          <Payment setPaymentOk={setPaymentOk} />
        </Elements>
      </div>
    );
  };

  return <>{paymentOk ? paymentComplete() : paymentDue()}</>;
};

export default Purchase;
