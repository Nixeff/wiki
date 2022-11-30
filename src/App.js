import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import "./css/styles.css";

import ShowAllWikis from "./func/showAllWikis";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShowLogin: true
    };
  }
  handleLoginClick = () => {
    this.setState(prevState => ({
      isShowLogin: !prevState.isShowLogin
    }));
  }
  render(){
    return (
      <Routes>
        <Route exact path="/ShowAllWikis" element={<ShowAllWikis /> } />
      </Routes>
    );
  }
}