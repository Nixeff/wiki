import React, { useState } from "react";
import { loadLS, saveLS } from "./localStorage";
import "../css/createWiki.css";
import checkToken from "./checkToken.js";

export default function CreateWiki ({isAdmin}) {
    const [wName, setwName] = useState("")
    const [visibility, setVisibility] = useState("public")
    const uID = loadLS("uID")
    const token = loadLS("token")

    const handleWName = (event) => {
        setwName(event.target.value);
    }

    const createWiki = async (event) => {
        event.preventDefault();
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/Wiki/create_wiki.php?wiki_name="+wName+"&visibility="+visibility+"&user_id="+uID+"&token="+token;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then((data) => {
            checkToken(data.Data)
        })
    }
    
    return(
        <form id="createWiki" onSubmit={createWiki}>
            <input id="handleWName" type="text" className="create-wiki" placeholder="Wiki namn..." onChange={handleWName} value={wName}/>
            <input id="submitWName" type="submit" className="create-wiki-btn" value="Skapa wiki"/>
        </form>
    );
}