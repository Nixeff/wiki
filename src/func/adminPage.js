import React from "react";
import { loadLS } from "./localStorage";
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import "../css/styles.css";

export default class AdminPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isShowLogin: false,
            userType: loadLS("userType")
        }
        
    }

    render(){
        const handleLoginClick = () => {
            this.setState(prevState => ({
                isShowLogin: !prevState.isShowLogin
              }));
        }
        return(
            <div>
                {this.state.isShowLogin?(
                    <LoginForm isState={this.state.isShowLogin} />
                ):(
                    console.log("Nothing to see here")
                )}
                <NavBar handleLoginClick={handleLoginClick}/>
                <LoginForm isShowLogin={this.state.isShowLogin}/> 
            </div>
        )
    }
}