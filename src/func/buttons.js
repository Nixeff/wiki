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

    if(title !== props.title){
        setTitle(props.title);
    }

    if(value !== props.value){
        setValue(props.value);
    }

    if(location !== props.location){
        setLocation(props.location);
    }

    if(cookieName !== props.cookieName){
        setCookieName(props.cookieName);
    }

    const handler = (path) => {
        saveLS(cookieName, value, 1, "/");
        navigate(path);
    }

    return(
        <div id="wikiHandler">
            <button id="title" className="title-wiki-btn" onClick={() => handler(location)}>{title}</button>
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
export function Back(props){
    const [location, setLocation] = useState(props.location);
    const navigate = useNavigate();

    const handler = (path) => {
        navigate(path);
    }

    return(
        <div id="backPage">
            <button id="back" className="returnClick" onClick={() => handler(location)}>Tillbaka</button>
        </div>
    )
}

