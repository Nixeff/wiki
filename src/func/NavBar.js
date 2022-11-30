import React, { Component } from "react";
import App from "../App";

export default class NavBar extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        show: props.show
      }
    }
    render(){
      return (
        <div className="navbar">
          <div>
            <span onClick={() => this.handleClick()} className="loginicon">
              Sign In
            </span>
          </div>
        </div>
      );
    }
  }