import { useEffect, useState } from "react";
import React from "react";


const LoginForm = ({ isShowLogin }) => {
  const [name, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [login, setLogin] = useState([{},]);
  console.log("hej");
  function HandleSubmit() {
      const getLogin = async () => {
          let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/login.php?name=" + name + "&password=" + password;
          const response = await fetch(`${API_URL}`);
          const data = await response.json();
          setLogin(data.Data); 
          console.log(name);
      }
      
      useEffect(() => {
          getLogin();
      });
      return(
        <div>
          {console.log(name)};
            {login.map( (login,index)=>
                (
                    <div key={index}>
                        <h3>{login.message}</h3>
                        <p>{login.token}</p>
                    </div>
                )
                )}
        </div>
    )
  }

  return (
    <div className={`${isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form onSubmit={HandleSubmit}>
            <h1 className="login-text">Sign In</h1>
            <label>Username</label>
            <br></br>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} name="username" className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="login-box" />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

/*

const LoginForm = ({ isShowLogin }) => {
  const [name, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [login, setLogin] = useState([{},]);
  console.log("hej");
  function HandleSubmit() {
      const getLogin = async () => {
          let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/login.php?name=" + name + "&password=" + password;
          const response = await fetch(`${API_URL}`);
          const data = await response.json();
          setLogin(data.Data); 
          console.log(name);
      }
      
      useEffect(() => {
          getLogin();
      });
      return(
        <div>
          {console.log(name)};
            {login.map( (login,index)=>
                (
                    <div key={index}>
                        <h3>{login.message}</h3>
                        <p>{login.token}</p>
                    </div>
                )
                )}
        </div>
    )
  }

  return (
    <div className={`${isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form onSubmit={HandleSubmit}>
            <h1 className="login-text">Sign In</h1>
            <label>Username</label>
            <br></br>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} name="username" className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="login-box" />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

*/

/*
const LoginForm = ({ isShowLogin }) => {
  const [name, setUsername]=useState("");
  const [password, setPassword]=useState("");
  return (
    <div className={`${isShowLogin ? "active" : ""} show`}>
      <div className="login-form">
        <div className="form-box solid">
          <form onSubmit={this.handleSubmit}>
            <h1 className="login-text">Sign In</h1>
            <label>Username</label>
            <br></br>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} name="name" className="login-box" />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="login-box" />
            <br></br>
            <input type="submit" value="LOGIN" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;*/

/*
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: [{"name":"test","password":"Peter"}]};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
        <div className="login-form">
          <div className="form-box solid">
            <form onSubmit={this.handleSubmit}>
              <h1 className="login-text">Sign In</h1>
              <label>Username</label>
              <br></br>
              <input type="text" value={this.state.value} onChange={this.handleChange} name="name" className="login-box" />
              <br></br>
              <label>Password</label>
              <br></br>
              <input type="password" value={this.state.value} onChange={this.handleChange} name="password" className="login-box" />
              <br></br>
              <input type="submit" value="LOGIN" className="login-btn" />
            </form>
          </div>
        </div>
    );
  }
}
*/