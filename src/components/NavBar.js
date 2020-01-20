import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { NavLink } from "react-router-dom";
//semantic-ui components
import { Divider } from "semantic-ui-react";
//my components
import NavLinkItem from "./NavLinkItem";

const NavBar = props => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user
  } = useAuth0();

  const navbarColors = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    fontSize: "25px",
    fontFamily: "Simplifica",
    textAlign: "center",
    outline: "none",
    zIndex: "11"
  };

  return (
    <div style={navbarColors}>
      <NavLinkItem linkName="about" titleName=" about " close={props.close} />
      <NavLinkItem
        linkName="portraits"
        titleName="|   portraits   "
        close={props.close}
      />
      <NavLinkItem
        linkName="auctions"
        titleName="|   auctions   "
        close={props.close}
      />
      {!isAuthenticated && !loading && (
        <>
          <button onClick={() => loginWithRedirect({})} style={navbarColors}>
            | LOG IN
          </button>
        </>
      )}
      {/* only show logout when user is logged in */}
      {isAuthenticated && (
        <>
          <NavLinkItem
            linkName="myauction"
            titleName="|   my auction  "
            close={props.close}
          />
        </>
      )}
      {isAuthenticated && (
        <button onClick={() => logout()} style={navbarColors}>
          | LOG OUT
        </button>
      )}
    </div>
  );
};

export default NavBar;
