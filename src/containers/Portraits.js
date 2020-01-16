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
    drawings: [],
    drawingsShowing: true,
    scrollPosition: ""
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

  portraitsNav = (colour, type) => {
    return (
      <>
        <p
          className={type}
          style={{ color: colour }}
          onClick={() => this.setState({ drawingsShowing: true })}
        >
          DRAWINGS |&nbsp;
        </p>
        <p
          className={type}
          style={{ color: colour }}
          onClick={() => this.setState({ drawingsShowing: false })}
        >
          PAINTINGS
        </p>
      </>
    );
  };

  displayTitle = () => {
    if (this.state.scrollPosition < 30) {
      return <h1>PORTRAITS</h1>;
    } else if (this.state.scrollPosition < 40) {
      return <h1 style={{ color: "white" }}>PORTRAITS</h1>;
    } else if (this.state.scrollPosition < 4880) {
      return (
        <div className="border">
          {this.portraitsNav("black", "portraitHeaderP")}
        </div>
      );
    } else {
      return (
        <h1 style={{ color: "white", borderColor: "white" }}>PORTRAITS</h1>
      );
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
        {this.displayTitle()}

        {this.state.scrollPosition < 30
          ? this.portraitsNav("black", "portraitSmallP")
          : this.portraitsNav("white", "portraitSmallP")}
        {this.displayPortraits()}
      </div>
    );
  }
}

export default Portraits;
