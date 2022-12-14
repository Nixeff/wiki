import React, { useState } from "react";
import EditWikiPage from "./editWikiPage";
import { loadLS, saveLS } from "./localStorage";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/createWikiPage.css";
import checkToken from "./checkToken.js";

export default function CreateWikiPage(props){
    const [wID, setWID] = useState(props.wID);
    const [uID, setUID] = useState(props.uID);
    const [token, setToken] = useState(props.token);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const handleWName = (event) => {
        setTitle(event.target.value);
    }

    const createWikiPage = async (event) => {
        event.preventDefault();
        let pID;
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_create_page.php?wiki_id="+wID+"&page_title=a&user_id="+uID+"&token="+token;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then((data) => {
            checkToken(data.Data)
            pID = data.Data.id
        }).then(()=>{
            let template = '{"theme":"Three","summery":{"title":"Titel","img":"Bild Url","tags":[{"name":"Titel","content":"Innehåll"}]},"description":"Beskrivning","content":[{"type":"title","text":"Titel"},{"type":"text","text":"Text"},{"type":"list","text":["Objekt 1","Objekt 2"]},{"type":"underTitle","text":"Under titel"}],"refrences":[{"title":"temp","where":"google.se"}]}';
            API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_update_page.php?user_id="+uID+"&token="+token+"&page_id="+pID+"&content="+template;
            fetch(`${API_URL}`)
            .then((data)=>{
                saveLS("pID", pID, 1, "/");
                navigate("/EditPage");
            })
        });
    }

    return(
        <form id="createWiki" onSubmit={createWikiPage}>
            <input id="submitWName" type="submit" className="create-wiki-page-btn" value="Skapa wiki sida"/>
        </form>
    )
}