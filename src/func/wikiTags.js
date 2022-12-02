import React from "react";
import "../css/showAllWikis.css"
import {
    BrowserRouter as Router, Link,
    useLocation, redirect
} from "react-router-dom";

export default class WikiTag extends React.Component{
    constructor(props){
        
        super(props);
        this.state = {
            title: props.title,
            type: props.Type,
            wID: props.wID
        }
    }

    render(){
        return(
            <div id="wikiHandler">
                <Link id="title" to={"/wikiPage?ID="+this.state.wID}>{this.state.title}</Link>
                <p>{this.state.type}</p>
            </div>
        )
    }
}

