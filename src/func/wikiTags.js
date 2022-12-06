import React, { useState } from "react";
import { loadLS, saveLS } from "./localStorage";
import { Navigate, useNavigate } from "react-router-dom";

import {
    BrowserRouter as Router, Link,
    useLocation, redirect
} from "react-router-dom";
import "../css/showAllWikis.css"


export default function WikiTag(props){
    const [title, setTitle] = useState(props.title);
    const [wID, setWID] = useState(props.wID);
    const navigate = useNavigate();

    const handler = () => {
        saveLS("wID", wID, 1, "/");
        navigate("/WikiPage");
    }


    return(
        <div id="wikiHandler">
            <h1>hi</h1>
            <button id="title" onClick={() => handler()}>{title}</button>
        </div>
    )
}


