import React from "react";
//semantic-ui components
import { Grid } from "semantic-ui-react";
//my components
import "../App.css";

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

  const renderImg = (type, filteredBids) => {
    return (
      <img
        style={{ padding: "0px", marginTop: "-30px" }}
        src={
          "http://localhost:3001/assets/" + filteredBids[0].sale.painting.url
        }
        className={type}
      />
    );
  };

  const filterPaintingElements = id => {
    const filteredBids = bids.filter(bid => bid.sale.painting_id === id);
    return (
      <div className="stickyPaintingBids">
        <Grid centered>
          <Grid.Row style={{ padding: "0px"}} only="tablet mobile">
            {renderImg("show-bid-pics-mobile", filteredBids)}
          </Grid.Row>
        </Grid>
        <Grid centered>
          <Grid.Row only="computer" style={{ padding: "0px" }}>
            {renderImg("show-bid-pics-web", filteredBids)}
          </Grid.Row>
        </Grid>
        <div className="centered-over-img-top">
          <h2 className="padding-bottom-ten">
            " {filteredBids[0].sale.painting.name} "
          </h2>
          <h2>
            {filteredBids.length} Bid{filteredBids.length > 1 ? "s " : " "}
            Placed
          </h2>
          {filteredBids.map(bid => (
            <p key={bid.id} >{bid.display_text}</p>
          ))}
        </div>
      </div>
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
    <Grid >
      <Grid.Column style= {{marginTop: "-40px"}}>
        {console.log("showBids", definePaintingElementIds())}
        {displayPaintingElements()}
      </Grid.Column>
    </Grid>
  );
};

export default ShowBids;
