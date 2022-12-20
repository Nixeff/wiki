import React from "react";
import { loadLS } from "./localStorage";

export default class CreateWikiPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wID: loadLS(wID),
            uID: loadLS(uID),
            token: loadLS(token),
        }
    }
    getWikis = async (event) => {
        event.preventDefault();
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_create_page.php?wiki_id="+this.state.wID+"&page_title= &user_id="+this.state.uID+"&token="+this.state.token;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then((data) => {
            this.setState({wikis: data.Data});
            console.log(this.state.wikis);
        });
    }
}