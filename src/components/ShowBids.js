import React from "react";
//semantic-ui components
import { Grid } from "semantic-ui-react";

const ShowBids = ({ bids }) => {
  const definePaintingElementIds = () => {
    const paintingElementIds = [];
    if (bids !== undefined) {
      bids.map(bid => {
        if (!paintingElementIds.includes(bid.sale.painting_id)) {
          paintingElementIds.push(bid.sale.painting_id);
        }
      });
    }

    return paintingElementIds;
  };

  const filterPaintingElements = id => {
    const filteredBids = bids.filter(bid => bid.sale.painting_id === id);
    return (
      <>
        <Grid centered>
          <Grid.Row only="tablet mobile">
            <img
              src={
                "http://localhost:3001/assets/" +
                filteredBids[0].sale.painting.url
              }
              className="show-bid-pics-mobile"
            />
          </Grid.Row>
        </Grid>
        <Grid centered>
          <Grid.Row only="computer">
            <img
              src={
                "http://localhost:3001/assets/" +
                filteredBids[0].sale.painting.url
              }
              className="show-bid-pics-web"
            />
          </Grid.Row>
        </Grid>
        <div className="centered-over-img-top">
          <h2 className = "padding-bottom-ten">{filteredBids[0].sale.painting.name}</h2>
          <h2>{filteredBids.length} Bid{filteredBids.length = 1 ? "" : "s"} Placed</h2>
          <p>{filteredBids.map(bid => bid.display_text)}</p>
        </div>
      </>
    );
  };

  const displayPaintingElements = () => {
    if (bids !== undefined && bids.length > 0) {
      return definePaintingElementIds().map(id => filterPaintingElements(id));
    } else {
      return <p>You have not placed any bids</p>;
    }
  };

  return (
    <Grid>
      <Grid.Column>
        {console.log("showBids", definePaintingElementIds())}
        {displayPaintingElements()}
      </Grid.Column>
    </Grid>
  );
};

export default ShowBids;
