import React, { Component } from "react";
//semantic-ui components
import { Grid } from "semantic-ui-react";
//my components
import API from "../adapters/API";
import PaintingCard from "../components/PaintingCard";
import "../App.css";

export class Portraits extends Component {
  state = {
    paintings: [],
    drawings: [],
    drawingsShowing: true,
    scrollPosition: 5
  };

  displayPortraits = (size, computer) => {
    if (this.state.drawingsShowing) {
      return this.state.drawings.map(drawing => (
        <PaintingCard
          drawing={drawing}
          key={drawing.id}
          type="Drawings"
          size={size}
          computer={computer}
          total={this.state.drawings.length}
        />
      ));
    } else {
      return this.state.paintings.map(drawing => (
        <PaintingCard
          drawing={drawing}
          key={drawing.id}
          type="paintings"
          size={size}
          computer={computer}
          total={this.state.drawings.length}
        />
      ));
    }
  };

  portraitsNav = type => {
    return (
      <div
        className="h2-border"
        // style={{ borderBottom: "1px solid", borderColor: "black" }}
      >
        <p
          className={type}
          style={{
            fontSize: "25px",
            cursor: "pointer",
            textDecoration: this.state.drawingsShowing && "underline"
          }}
          onClick={() => this.setState({ drawingsShowing: true })}
        >
          DRAWINGS&nbsp;
        </p>
        <p
          className={type}
          style={{
            fontSize: "25px",
            cursor: "pointer",
            textDecoration: !this.state.drawingsShowing && "underline"
          }}
          onClick={() => this.setState({ drawingsShowing: false })}
        >
          | &nbsp;PAINTINGS
        </p>
      </div>
    );
  };

  componentDidMount() {
    API.getPaintings().then(portraits =>
      this.setState({
        drawings: portraits.drawings,
        paintings: portraits.paintings
      })
    );
  }

  render() {
    return (
      <div className="vertical-scroll-snap">
        <h1>PORTRAITS</h1>
        {this.portraitsNav("portraitHeaderP")}
        {/* {this.state.scrollPosition < 30 && this.portraitsNav("portraitSmallP")} */}
        <Grid centered>
          <Grid.Row only="mobile">
            {this.displayPortraits("90vw", false)}
          </Grid.Row>
        </Grid>
        <Grid centered>
          <Grid.Row only="tablet">
            {this.displayPortraits("75vw", false)}
          </Grid.Row>
        </Grid>
        <Grid centered column={1}>
          <Grid.Column only="computer" style={{ width: "480px" }}>
            {this.displayPortraits("480px", true)}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Portraits;
