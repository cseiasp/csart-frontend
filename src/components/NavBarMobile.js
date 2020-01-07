import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink } from "react-router-dom";
//my components
import NavLinkItem from "./NavLinkItem";

const NavBarMobile = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const navbarColors = {
    backgroundColor: "maroon",
    color: "white",
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
    </div>
  );
};

export default NavBarMobile;
