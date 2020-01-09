import React, { Component } from "react";
//semantic-ui components
import { Divider } from "semantic-ui-react";
//my components
import API from "../adapters/API";
import PaintingCard from "../components/PaintingCard";
import "../App.css";

export class Portraits extends Component {
  state = {
    paintings: [],
    drawings: []
  };

  componentDidMount() {
    API.getPaintings().then(portraits =>
      this.setState({ drawings: portraits.drawings })
    );
  }

  render() {
    
    return (
      <div>
        {/* {!!this.props.navbar && this.props.navbarDisplay} */}
        <h1>PORTRAITS</h1>

        {this.state.drawings.map(
          drawing => (
            <PaintingCard drawing={drawing} key={drawing.id} />
          )

          //   <img
          //     key={drawing.id}
          //     src={"http://localhost:3001/assets/drawings/" + drawing.url}
          //     style={centerImage}
          //   />
        )}
      </div>
    );
  }
}

export default Portraits;
