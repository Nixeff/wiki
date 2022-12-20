import React from "react";
import { loadLS } from "./localStorage";

export default class CreateWiki extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wName: "",
            visibility: "public",
            uID: loadLS("uID"),
            token: loadLS("token"),
            
        }
    }

    handleWName = (event) => {
        this.setState({wName: event.target.value});
    }

    createWiki = async (event) => {
        event.preventDefault();
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/Wiki/create_wiki.php?wiki_name="+this.state.wName+"&visibility="+this.state.visibility+"&user_id="+this.state.uID+"&token="+this.state.token;
        fetch(`${API_URL}`)
        this.setState({reload: true})
    }

    render(){
        return(
            <form id="createWiki" onSubmit={this.createWiki}>
                <input id="handleWName" type="text" onChange={this.handleWName} value={this.state.wName}/>
                <input id="submitWName" type="submit" value="create wiki"/>
            </form>
        )
    }
}