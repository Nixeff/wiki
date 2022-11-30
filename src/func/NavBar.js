import { Component } from "react";

export default class NavBar extends Component({handleLoginClick}) {
    constructor(props){
      super(props)
    }
    handleClick = () => {
      handleLoginClick();
    };
    render(){
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
  }



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