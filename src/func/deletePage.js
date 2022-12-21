import React, { useState } from "react";
import { loadLS } from "./localStorage";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function DeleteWikiPage(props) {
    const [pID, setpID] = useState(props.pID);
    const uID = loadLS("uID");
    const token = loadLS("token");

    const submit = () =>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                label: 'Yes',
                onClick: () => deleteWikiPage()
                },
                {
                label: 'No'
                }
            ]
            });
        };


    const deleteWikiPage = async () => {
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_delete_page.php?page_id="+pID+"&user_id="+uID+"&token="+token;
        fetch(`${API_URL}`);
    }

    return(
        <div>
            <input type="button" value="ta bort wiki sida" onClick={() => submit()}></input>
        </div>
    );
}