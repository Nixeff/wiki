import React, { Component } from "react";
import App from "../App";
import LoginForm, {isShowLogin} from "./LoginForm";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function NavBar({ handleLoginClick }) {
  const handleClick = () => {
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

/*
export default class NavBar extends React.Component {
    onClose = e => {
      this.props.onClose && this.props.onClose(e);
    };
    
    render(){
      if (!this.props.show){
        return null;
      }
      return (
        <div className="navbar">
          <div>
            <span onClick={this.onClose} className="loginicon">
              Sign In
            </span>
          </div>
        </div>
      );
    }
  }

  NavBar.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };*/