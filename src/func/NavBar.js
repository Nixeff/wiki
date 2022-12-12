import React from "react";
import { loadLS } from "./localStorage";

function NavBar({ handleLoginClick }) {
  const handleClick = () => { // Updates the state
    handleLoginClick()
  }
  const uname = loadLS("uname");
  const userType = loadLS("userType");
  return (
    <div className="navbar">
      <div>
        <span onClick={handleClick} className="loginicon">
          Login
        </span>
      </div>
      <div>
        <p className="user-info">
          Namn: {uname}
        </p>
        <p className="user-info">
          Användartyp: {userType}
        </p>
      </div>
    </div>
  );
}

export default NavBar;