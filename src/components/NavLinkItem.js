import React from "react";
import { NavLink } from "react-router-dom";
//semantic-ui components
import { Divider } from "semantic-ui-react";

const NavLinkItem = props => {
  const link = {
    color: "black"
  };


  return (
    <>
      <NavLink
        to={"/" + props.linkName}
        exact
        style={link}
        activeStyle={{
          textDecoration: "underline overline white"
        }}
        onClick={props.close}
      >
        {props.titleName.toUpperCase()}
      </NavLink>
    </>
  );
};

export default NavLinkItem;
