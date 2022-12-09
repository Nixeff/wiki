import React from "react";
import { useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import NavBar from "./NavBar";
import WikiTag from "./wikiTags";

export default class ShowWikiPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ID: loadLS("wID"),
            wikis: []
        }
    }

    getPages = async () => {
        console.log(this.state.ID);
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?wiki_id="+this.state.ID;
        
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            this.setState({wikis: data.Data});
            console.log(this.state.wikis);
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
                        {this.state.wikis.map( (wikis,index)=>
                            (
                                <div key={index}>
                                    <WikiTag location="/Page" cookieName="pID" title={wikis.Title} value={wikis.ID-10}/>
                                </div>
                            ))}
                    </div>
            </div>
        )
    }
} 