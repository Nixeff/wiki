import React, { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import "./css/styles.css";

import ShowAllWikis from "./func/showAllWikis";
import ShowWikiPage from "./func/showWikiPage";
import ShowPage from './func/showPage';
import AdminPage from './func/adminPage';
import CreateWiki from './func/createWiki';

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
        <Route exact path="/WikiPage" element={<ShowWikiPage /> } />
        <Route exact path="/Page" element={<ShowPage /> } />
        <Route exact path="/AdminPage" element={<AdminPage /> } />
        <Route exact path="/CreateWiki" element={<CreateWiki /> } />
      </Routes>
    );
  }
}