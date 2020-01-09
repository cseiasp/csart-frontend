import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkItem = props => {
  const link = {
    color: "maroon"
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
        {props.linkName.toUpperCase()}
      </NavLink>
    </>
  );
};

export default NavLinkItem;
