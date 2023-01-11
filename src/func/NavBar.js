import React from "react";
import { loadLS, saveLS } from "./localStorage";

function NavBar({ handleLoginClick }) {
  const handleClick = () => { // Updates the state
    if(userType){
      saveLS("userType", "", 1, "/");
      saveLS("uID", "", 1, "/");
      saveLS("uname", "", 1, "/");
      saveLS("token", "", 1, "/");
      window.location.reload(false);
    }
    else{
      handleLoginClick()
    }
  }
  const uname = loadLS("uname");
  const userType = loadLS("userType");

  return (
    <div className="navbar">
      <div>
        {userType ? (
          <span onClick={handleClick} className="loginicon">
            Logga ut
          </span>
        ) : (
          <span onClick={handleClick} className="loginicon">
            Logga in
          </span>
        )}
      </div>
      <div>
        <p className="user-info">
          Namn: {uname} <br></br>
          Användartyp: {userType}
        </p>
      </div>
    </div>
  );
}

export default NavBar;