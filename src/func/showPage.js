import React from "react";
import { json, useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import NavBar from "./NavBar";
import WikiTag from "./wikiTags";
import {Parser} from 'xml2js';

export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
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
        let parser = new xml2js.Parser();
        parser.parseStringPromise(this.state.wikis).then((result)=>{
            console.dir(result);
        })
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
                                <div>{wikis.summery}</div>
                            </div>
                    ))}
            </div>
            </div>
        )
    }
}
