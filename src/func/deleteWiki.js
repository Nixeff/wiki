import React, { useState } from "react";
import { loadLS } from "./localStorage";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default function DeleteWiki(props) {
    const [wID, setwID] = useState(props.wID);
    const uID = loadLS("uID");
    const token = loadLS("token");

    const submit = () =>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                label: 'Yes',
                onClick: () => deleteWiki()
                },
                {
                label: 'No'
                }
            ]
            });
        };


    const deleteWiki = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_delete.php?wiki_id="+wID+"&user_id="+uID+"&token="+token;
        fetch(`${API_URL}`);
    }

    return(
        <div>
            <input type="button" value="ta bort wiki" onClick={() => submit()}></input>
        </div>
    );
}
