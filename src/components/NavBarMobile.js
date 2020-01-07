import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink } from "react-router-dom";
//my components
import NavLinkItem from "./NavLinkItem";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const link = {
    color: "black"
  };

  return (
    <div>
      <NavLinkItem linkName="about" displayName="About" />
      <NavLinkItem linkName="portraits" displayName="Portraits" />
      <NavLinkItem linkName="auctions" displayName="Auctions" />

      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}
      {/* only show logout when user is logged in */}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;
