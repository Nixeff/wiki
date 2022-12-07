import React, { useEffect, useState } from "react";
import WikiTag from "./wikiTags";
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import "../css/showAllWikis.css";

export default class ShowAllWikis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wikis: [],
            title: "",
        }
        
    }

    handleChangeUser = (event) => {
        this.setState({title: event.target.value});
        console.log('value is:', event.target.value);
        console.log('value is also:', this.state.title);
    };

    getWikis = async (event) => {
        event.preventDefault();
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki&title="+this.state.title;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            this.setState({wikis: data.Data});
            console.log(this.state.wikis)
        });
    }

    check = () => {
        if (this.state.wikis.length === 0){
           return null; 
        } 
    }

    render(){
        return(
            <div>     
                <NavBar />  
                <form id="showWikis" type="submit" onSubmit={this.getWikis}>
                    <input id="showWikis" type="text" onChange={this.handleChangeUser} value={this.state.title}></input>
                </form>
                
                <div id="wikiList">
                    <div>
                        {this.state.wikis.map( (wikis,index)=>
                            (
                                <div key={index}>
                                    <WikiTag location="/WikiPage" title={wikis.Title} ID={wikis.ID}/>
                                </div>
                            ))}
                    </div>
                </div>
                
            </div>
        )  
    }
}