import React from "react";

function NavBar({ handleLoginClick }) {
  const handleClick = () => { // Updates the state
    handleLoginClick()
  }
  return (
    <div className="navbar">
      <div>
        <span onClick={handleClick} className="loginicon">
          Logga in
        </span>
      </div>
    </div>
  );
}

export default NavBar;