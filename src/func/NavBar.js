import React from "react";

function NavBar({ handleLoginClick }) {
  const handleClick = () => { // Updates the state
    console.log("Message 2")
    handleLoginClick()
  }
  return (
    <div className="navbar">
      <div>
        <span onClick={handleClick} className="loginicon">
          Sign In
        </span>
      </div>
    </div>
  );
}

export default NavBar;