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
    textAlign: "center"
    // backgroundColor: "rgba(0, 0, 0, .01)"
  };

  return (
    <div style={navbarColors}>
      <br />
      <br />
      <br />
      <NavLinkItem linkName="about" titleName="about" close={props.close} />
      <br />
      <br />
      {/* <Divider /> */}
      <br />
      <NavLinkItem
        linkName="portraits"
        titleName="portraits"
        close={props.close}
      />
      <br />
      <br />
      {/* <Divider /> */}
      <br />
      <NavLinkItem
        linkName="auctions"
        titleName="auctions"
        close={props.close}
      />
      <br />
      {/* <Divider /> */}
      <br />
      {!isAuthenticated && (
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
            titleName="my auction"
            close={props.close}
          />
          <br />
          {/* <Divider /> */}
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
