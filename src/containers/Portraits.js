import React from "react";

const Portraits = props => {
  return (
    <div>
      {!!props.navbar && props.navbarDisplay}
      <h1>PORTRAITS</h1>
    </div>
  );
};

export default Portraits;
