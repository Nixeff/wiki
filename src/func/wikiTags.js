import React from "react";

export default class WikiTag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: "Hi",
            type: ""
        }
    }

    render(){
        return(
            <div>
                <h1>hej</h1>
                <h2>{this.state.title}</h2>
                <p>{this.state.type}</p>
            </div>
        )
    }
}

