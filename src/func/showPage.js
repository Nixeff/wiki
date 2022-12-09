import React from "react";
import { json, useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import NavBar from "./NavBar";
import WikiTag from "./wikiTags";
import { convertXML } from "simple-xml-to-json";

export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
        const {convertXML, createAST} = require("simple-xml-to-json")
        this.state = {
            ID: loadLS("pID"),
            wikis: []
        }
    }

    getPages = async () => {
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_get_content.php?page_id="+this.state.ID;
        console.log(API_URL);
        fetch(`${API_URL}`)
        .then((data) => {return data.json()})
        .then(data => {
            this.setState({wikis: data.Data.page_data.page_content});
        });
    }

    render(){
        const myJson = convertXML(this.state.wikis);
        return(
            
            <div>
                <NavBar />  
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <input id="showWikis" type="button" onClick={() => this.getPages()} value="Show"></input>
                <div>
                    {this.state.wikis.map( (wikis,index)=>
                        (
                            <div key={index}>
                                <div>{myJson}</div>
                            </div>
                    ))}
            </div>
            </div>
        )
    }
}
