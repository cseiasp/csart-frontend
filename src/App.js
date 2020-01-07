//react
import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
//semantic-ui components
import { Grid, Image } from "semantic-ui-react";
//auth0 components
import { useAuth0 } from "./react-auth0-spa";
//my components
import "./App.css";
import NavBarMobile from "./components/NavBarMobile";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Portraits from "./containers/Portraits";
import Auction from "./containers/Auction";
import Watercolours from "./containers/Watercolours";
import history from "./utils/history";

function App() {
  const [navbar, setNavbar] = useState(false);

  const centeredText = {
    textAlign: "center"
  };

  const navbarDisplay = () => {
    setNavbar(!navbar);
  };

  // const { loading } = useAuth0();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="background" style={centeredText}>
      <Router history={history}>
        <header>{navbar === true && <NavBarMobile />}</header>
        <h3 onClick={navbarDisplay}>MENU</h3>
        <Switch>
          <Route
            path="/"
            exact
            component={LandingPage}
            render={props => (
              <LandingPage
                {...props}
                navbarDisplay={navbarDisplay}
                navbar={navbar}
              />
            )}
          />
          <Route path="/profile" component={LandingPage} />
          <Route path="/portraits" component={Portraits} />
          <Route path="/watercolours" component={Watercolours} />
          <Route path="/auction" component={Auction} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
