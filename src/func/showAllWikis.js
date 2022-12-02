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
            test: "",
        }
        
    }

    getWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki";
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            this.setState({wikis: data.Data});
        });
    }

    render(){
        return(
            <div>     
                <NavBar />  
                <input id="showWikis" type="button" onClick={() => this.getWikis()} value="klcik"></input>
                <div id="wikiList">
                    <div>
                        {this.state.wikis.map( (wikis,index)=>
                            (
                                <div key={index}>
                                    <WikiTag title={wikis.Title} Type={wikis.Type} wID={wikis.ID}/>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )  
    }
}