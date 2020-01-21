import React from "react";
import { NavLink } from "react-router-dom";
//semantic-ui components
import { Icon } from "semantic-ui-react";

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
        {props.icon ? (
          <Icon color="grey" name="shopping cart" size="small" />
        ) : (
          props.titleName.toUpperCase()
        )}
      </NavLink>
    </>
  );
};

export default NavLinkItem;
