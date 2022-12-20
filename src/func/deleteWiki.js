import React, { useState } from "react";
import { loadLS } from "./localStorage";

export default function DeleteWiki(props) {
    const [wID, setwID] = useState(props.wID);
    const uID = loadLS("uID");
    const token = loadLS("token");

    const deleteWiki = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_delete.php?wiki_id="+wID+"&user_id="+uID+"&token="+token;
        fetch(`${API_URL}`)
        console.log("hej")
    }

    return(
        <div>
            <input type="button" value="ta bort wiki" onClick={() => deleteWiki()}></input>
        </div>
    );
}
