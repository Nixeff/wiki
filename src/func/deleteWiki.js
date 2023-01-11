import React, { useState } from "react";
import { loadLS } from "./localStorage";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "../css/deleteWiki.css";
import checkToken from "./checkToken.js";

export default function DeleteWiki(props) {
    const [wID, setwID] = useState(props.wID);
    const uID = loadLS("uID");
    const token = loadLS("token");

    const submit = () =>{
        confirmAlert({
            title: 'Bekräfta för att skicka in',
            message: 'Är du säker på att du vill ta bort wikin?',
            buttons: [
                {
                label: 'Ja',
                onClick: () => deleteWiki()
                },
                {
                label: 'Nej'
                }
            ]
            });
        };


    const deleteWiki = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_delete.php?wiki_id="+wID+"&user_id="+uID+"&token="+token;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then((data) => {
            checkToken(data.Data)
        })
    }

    return(
        <div>
            <input type="button" value="Ta bort wiki" className="remove-wiki-btn" onClick={() => submit()}></input>
        </div>
    );
}
