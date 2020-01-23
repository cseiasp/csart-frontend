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

  return (
    <div className="navbarColors transparent">
      {/* <NavLinkItem linkName="about" titleName=" about " close={props.close} /> */}
      <NavLinkItem
        linkName="portraits"
        titleName="   portraits   "
        close={props.close}
      />
      <NavLinkItem
        linkName="auctions"
        titleName="|   auctions   "
        close={props.close}
      />
      {!isAuthenticated && !loading && (
        <>
          <button
            onClick={() => loginWithRedirect({})}
            className="white-background navbarColors"
          >
            | LOG IN
          </button>
        </>
      )}
      {/* only show logout when user is logged in */}
      {isAuthenticated && (
        <>
          <NavLinkItem
            linkName="myauction"
            titleName="|   my profile  "
            close={props.close}
          />
          | <NavLinkItem linkName="purchase" titleName="basket" close={props.close}/>
        </>
      )}
      {isAuthenticated && (
        <button
          onClick={() => logout()}
          className="white-background navbarColors"
        >
          | LOG OUT
        </button>
      )}
    </div>
  );
};

export default NavBar;
