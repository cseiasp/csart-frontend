import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink } from "react-router-dom";
//semantic-ui components
import { Divider } from "semantic-ui-react";
//my components
import NavLinkItem from "./NavLinkItem";

const NavBarMobile = props => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user
  } = useAuth0();

  const navbarColors = {
    backgroundColor: "white",
    color: "maroon",
    border: "none",
    fontSize: "40px",
    width: "80vw",
    padding: "5px",
    textAlign: "center"
  };

  return (
    <div style={navbarColors}>
      <NavLinkItem linkName="about" close={props.close} />

      <Divider />

      <NavLinkItem linkName="portraits" close={props.close} />

      <Divider />
      <NavLinkItem linkName="auctions" close={props.close} />

      <Divider />

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})} style={navbarColors}>
          LOG IN
        </button>
      )}
      {/* only show logout when user is logged in */}
      {isAuthenticated && (
        <NavLinkItem linkName="myauction" close={props.close} />
      )}
      {isAuthenticated && (
        <button onClick={() => logout()} style={navbarColors}>
          LOG OUT
        </button>
      )}
    </div>
  );
};

export default NavBarMobile;
