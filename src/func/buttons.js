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
    const [value, setValue] = useState(props.value);
    const [location, setLocation] = useState(props.location);
    const [cookieName, setCookieName] = useState(props.cookieName);
    const navigate = useNavigate();

    const handler = (path) => {
        saveLS(cookieName, value, 1, "/");
        navigate(path);
    }


    return(
        <div id="wikiHandler">
            <button id="title" onClick={() => handler(location)}>{title}</button>
        </div>
    )
}

export function EditWikiPageButton(props){
    const [title, setTitle] = useState(props.title);
    //const [value, setValue] = useState(props.value);
    const [location, setLocation] = useState(props.location);
    //const [cookieName, setCookieName] = useState(props.cookieName);
    const navigate = useNavigate();

    const handler = (path) => {
        //saveLS(cookieName, value, 1, "/");
        navigate(path);
    }


    return(
        <div id="wikiHandler">
            <button id="title" onClick={() => handler(location)}>{title}</button>
        </div>
    )
}


