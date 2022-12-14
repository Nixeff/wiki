import React from "react";
import { useState } from "react";
import { loadLS, saveLS } from "./localStorage";
import { Redirect, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AdminPage from './adminPage';
import { useHistory } from "react-router-dom";
import "../css/styles.css";

const LoginForm = ({ isShowLogin }) => {
  const [username,setUname] = useState("");
  const [password,setPass] = useState("");
  const adminMessage = "You logged in as an admin";
  const endUserMessage = "You logged in as a user";
  const getLogin = async (uname, pass) => {
    let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/login.php?name=" + uname + "&password=" +  pass;
    fetch(`${API_URL}`)
    .then((data) => data.json())
    .then((data) => {
        checkUser(data.Data.message, data.Data.ID, uname, data.Data.token)
    })
  }

  function checkUser(loginMessage, uID, uname, token) {
    //const navigate = useNavigate();
    const usercheck = (loginMessage === adminMessage);
    if(usercheck) {
      console.log("Login successful (Admin)");
      saveLS("userType", "Admin", 1, "/");
      saveLS("uID", uID, 1, "/");
      saveLS("uname", uname, 1, "/");
      saveLS("token", token, 1, "/");
      console.log(usercheck);
      console.log("Wooah! Admin check WOAHH!")
      window.location.reload(false);
      //return(<Navigate to="/adminPage" />);
      //navigate('/adminPage');
    }else {
      const usercheck = (loginMessage === endUserMessage);
      if(usercheck){
        console.log("Login successful (End user)");
        saveLS("userType", "User", 1, "/");
        saveLS("uID", uID, 1, "/");
        saveLS("uname", uname, 1, "/");
        saveLS("token", token, 1, "/");
        console.log(usercheck);
        window.location.reload(false);
      } else{
        console.log("Wrong password or username");
        console.log(usercheck);
        alert("Fel användarnamn eller lösenord");
      }
    }
  }

  const changeUser = (e) => {
    setUname(e.target.value)
  }
  const changePass = (e) => {
    setPass(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getLogin(username, password);
  }
  return (
    <div className={`${!isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form onSubmit={handleSubmit}>
            <h1 className="login-text">Logga in</h1>
            <label>Användarnamn</label>
            <br></br>
            <input type="text" onChange={changeUser} name="username" id="name" className="login-box" />
            <br></br>
            <label>Lösenord</label>
            <br></br>
            <input type="password" onChange={changePass} name="password" id="pass" className="login-box" />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
