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
            wikis: "",
            summeryTitle: "",
            summeryImg: "",
            summeryTags: [],
            contents: [],
            description: "",
            content: [],
            refrences
        }
    }

    getPages = async () => {
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_get_content.php?page_id="+this.state.ID;
        console.log(API_URL);
        fetch(`${API_URL}`)
        .then((data) => {return data.json()})
        .then((data) => {
            this.setState({
                wikis: JSON.parse(data.Data.page_data.page_content),
            });
            this.setState({
                summeryTitle: this.state.wikis.summery.title,
                summeryImg: this.state.wikis.summery.img,
                summeryTags: this.state.wikis.summery.tags,
            });
            console.dir(this.state.summeryTitle);
        });
    }

    render(){
        return(
            
            <div>
                <NavBar />  
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <input id="showWikis" type="button" onClick={() => this.getPages()} value="Show"></input>
                <div>
                    {this.state.summeryTitle}
            </div>
            </div>
        )
    }
}
