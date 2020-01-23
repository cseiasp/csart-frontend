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
    color: "black",
    border: "none",
    fontSize: "60px",
    fontFamily: "Simplifica",
    width: "80vw",
    padding: "5px",
    textAlign: "center",
    outline: "none"
    // backgroundColor: "rgba(0, 0, 0, .01)"
  };

  return (
    <div style={navbarColors}>
      <br />
      <br />
      <br />
      <NavLinkItem
        linkName="portraits"
        titleName="portraits"
        close={props.close}
      />
      <br />
      <br />
      <br />
      <NavLinkItem
        linkName="auctions"
        titleName="auctions"
        close={props.close}
      />
      <br />
      <br />

      {!isAuthenticated && !loading && (
        <>
          <button onClick={() => loginWithRedirect({})} style={navbarColors}>
            LOG IN
          </button>
        </>
      )}
      {/* only show logout when user is logged in */}
      {isAuthenticated && (
        <>
          <br />
          <NavLinkItem
            linkName="myauction"
            titleName="my profile"
            close={props.close}
          />
          <br />
          <br />
          <br />
          <NavLinkItem
            linkName="purchase"
            titleName="basket"
            close={props.close}
          />

          <br />
          <br />
        </>
      )}
      {isAuthenticated && (
        <button onClick={() => logout()} style={navbarColors}>
          LOG OUT
        </button>
      )}
      <br />
      <br />
    </div>
  );
};

export default NavBarMobile;
