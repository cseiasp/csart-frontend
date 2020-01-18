import React from "react";
// semantic
import { Form, Button, Input } from "semantic-ui-react";

const BidForm = props => {
  return (
    <Form
      className="formClass"
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
      <Input
        icon="tags"
        iconPosition="left"
        type="text"
        name="bid"
        placeholder="Your Bid Amount"
        onChange={e => props.setBid(e.target.value)}
      />
      <Button basic color="black" type="submit" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </Form>
  );
};

export default BidForm;
