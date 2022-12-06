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
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?wiki_id="+this.state.ID;
        console.log(API_URL);
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
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <input id="showWikis" type="button" onClick={() => this.getPages()} value="Show"></input>
                <div>
                        {this.state.wikis.map( (wikis,index)=>
                            (
                                <div key={index}>
                                    <WikiTag location="/Page" title={wikis.Title} ID={wikis.ID}/>
                                </div>
                            ))}
                    </div>
            </div>
        )
    }
}
