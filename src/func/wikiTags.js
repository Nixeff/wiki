import React from "react";

export default class WikiTag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            type: props.Type
        }
    }

    render(){
        return(
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.type}</p>
            </div>
        )
    }
}

