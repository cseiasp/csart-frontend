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

  displayPortraits = () => {
    if (this.state.drawingsShowing) {
      return this.state.drawings.map(drawing => (
        <PaintingCard drawing={drawing} key={drawing.id} type="Drawings" />
      ));
    } else {
      return this.state.paintings.map(drawing => (
        <PaintingCard drawing={drawing} key={drawing.id} type="paintings" />
      ));
    }
  };

  portraitsNav = type => {
    return (
      <div className="border">
        <p
          className={type}
          onClick={() => this.setState({ drawingsShowing: true })}
        >
          DRAWINGS |&nbsp;
        </p>
        <p
          className={type}
          onClick={() => this.setState({ drawingsShowing: false })}
        >
          PAINTINGS
        </p>
      </div>
    );
  };

  displayTitle = () => {
    if (this.state.scrollPosition < 30) {
      return (
        <div className="border">
          <p
            className="portraitHeaderP"
            style={{ fontWeight: "bold", fontSize: "55px" }}
          >
            PORTRAITS
          </p>
        </div>
      );
    } else if (this.state.scrollPosition < 4750) {
      return this.portraitsNav("portraitHeaderP");
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", () =>
      this.setState({ scrollPosition: window.pageYOffset })
    );
    API.getPaintings().then(portraits =>
      this.setState({
        drawings: portraits.drawings,
        paintings: portraits.paintings
      })
    );
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () =>
      this.setState({ scrollPosition: window.pageYOffset })
    );
  }

  render() {
    return (
      <div>
        <div className="vertical-scroll-snap">
          <h1>PORTRAITS</h1>
          {this.portraitsNav("portraitHeaderP")}
          {/* {this.state.scrollPosition < 30 && this.portraitsNav("portraitSmallP")} */}
          <Grid centered>{this.displayPortraits()}</Grid>
        </div>
      </div>
    );
  }
}

export default Portraits;
