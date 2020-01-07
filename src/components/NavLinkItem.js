import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkItem = props => {
  const link = {
    color: "black"
  };

  return (
    <div>
      <NavLink
        to={"/" + props.linkName}
        exact
        style={link}
        activeStyle={{
          textDecoration: "underline overline"
        }}
      >
        {props.displayName}
      </NavLink>
    </div>
  );
};

export default NavLinkItem;
