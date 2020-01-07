import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink } from "react-router-dom";
//semantic-ui components
import { Divider } from "semantic-ui-react";
//my components
import NavLinkItem from "./NavLinkItem";

const NavBarMobile = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const navbarColors = {
    backgroundColor: "snow",
    color: "maroon",
    border: "none",
    width: "100vw"
  };
  return (
    <div style={navbarColors}>
      <NavLinkItem linkName="about" />
      <NavLinkItem linkName="portraits" />
      <NavLinkItem linkName="auctions" />

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})} style={navbarColors}>
          LOG IN
        </button>
      )}
      {/* only show logout when user is logged in */}
      {isAuthenticated && (
        <button onClick={() => logout()} color="white">
          LOG OUT
        </button>
      )}
      <Divider />
    </div>
  );
};

export default NavBarMobile;
