import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkItem = props => {
  const link = {
    color: "white"
  };

  return (
    <div>
      <NavLink
        to={"/" + props.linkName}
        exact
        style={link}
        activeStyle={{
          textDecoration: "underline overline white"
        }}
      >
        {props.linkName.toUpperCase()}
      </NavLink>
    </div>
  );
};

export default NavLinkItem;
