import React, { useEffect, useState } from "react";
import WikiTag from "./wikiTags";

export default class ShowAllWikis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wikis: "test",
            test: "",
        }
        
    }

    getWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki";
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            this.setState({wikis: data.Data[0].Title});
        })
        //alert(data.Data)
        .then(
            console.log(this.state.wikis)
        );
    }

    render(){
        return(
            <div>       
                <input type="button" onClick={() => this.getWikis()} value="klcik"></input>
                <div>{this.state.wikis}</div>
                {/* {this.state.wikis.map( (wikis,index)=>
                    (
                        <div key={index}>
                            <WikiTag title={wikis.Title} Type={wikis.Type} wID={wikis.ID}/>
                        </div>
                    ))} */}
            </div>
        )  
    }
        

}

