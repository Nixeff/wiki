import React from "react";
import { useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import NavBar from "./NavBar";

export default class ShowWikiPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ID: loadLS("wID"),
        }
    }
    render(){
        return(
            
            <div>
                <NavBar />  
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>{this.state.ID}</p>
            </div>
        )
    }
}
