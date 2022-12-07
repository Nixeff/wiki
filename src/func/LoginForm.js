import React from "react";
import { useState } from "react";
import "../css/styles.css";
// Message to check with
const messages = [
  {
    adminMessage: "You logged in as an admin"
  }

];

const LoginForm = ({ isShowLogin }) => {

  const [data, setData] = useState({
    username: '',
    password: '',
    loginMessage: ''
  });
  const getLogin = async () => {
    let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/login.php?name=" + {uname} + "&password=" +  {pass};
    fetch(`${API_URL}`)
    .then((data) => data.json())
    .then(data => {
        this.setState({loginMessage: data.Data.message});
    });
  }

  const {uname, pass} = data;
  const checkUser = () => {
    //const usercheck = users.find(data => (data.username === uname && data.password === pass));
    console.log("BEGIN");
    console.log(data.loginMessage);
    console.log(messages.adminMessage);
    console.log("END");
    const usercheck = messages.find(data => (data.loginMessage === messages.adminMessage));
    if(usercheck) {
      console.log("Login successful");
    }else {
      console.log("Wrong password or username");
    }
    // console.log(uname);
    console.log(usercheck);
  }

  const changeHandler = (e) => {
    setData({...data, [e.target.name]:[e.target.value]})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getLogin();
    checkUser();
    console.log(checkUser());
  }
  console.log("Message 1 " + isShowLogin)
  return (
    <div className={`${!isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form onSubmit={handleSubmit}>
            <h1 className="login-text">Sign In</h1>
            <label>Username</label>
            <br></br>
            <input type="text" onChange={changeHandler} value={uname} name="username" className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" onChange={changeHandler} value={pass} name="password" className="login-box" />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
