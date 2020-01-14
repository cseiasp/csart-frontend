import React from "react";

const BidForm = props => {
  return (
    <form
      onSubmit={e =>
        props.placeBidAndSaveUser(
          e,
          props.painting_id,
          props.bid,
          "bid placed",
          props.user,
          true
        )
      }
    >
      <label>
        Bid:
        <input
          type="text"
          name="bid"
          onChange={e => props.setBid(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default BidForm;
