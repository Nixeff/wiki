import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import ShowAllWikis from "./func/showAllWikis";
import LoginForm from './func/LoginForm';
import NavBar from './func/NavBar';

export default class App extends Component() {
  render(){
    return (
      <BrowserRouter>
        <div>
          <Route path="/ShowAllWikis" component={<ShowAllWikis /> } />
        </div>
      </BrowserRouter>
    );
  }
}