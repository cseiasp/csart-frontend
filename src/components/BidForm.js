import React from "react";
// semantic
import { Form, Button, Input, Label } from "semantic-ui-react";

const BidForm = props => {
  return (
    <Form
      className="formClass"
      style={{ marginLeft: props.size }}
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
      <Label as="a" tag style={{ fontSize: "15px", marginBottom: "10px" }}>
        {" "}
        Bid Amount{" "}
      </Label>
      <Input
        icon="tags"
        iconPosition="left"
        type="text"
        name="bid"
        placeholder="Bid Amount"
        onChange={e => props.setBid(e.target.value)}
      />
      <Button basic color="black" type="submit" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </Form>
  );
};

export default BidForm;
