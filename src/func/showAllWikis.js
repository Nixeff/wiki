import React, { useEffect, useState } from "react";
import WikiTag from "./wikiTags";

export default class ShowAllWikis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wikis: [],
        }
        
    }

    getWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki";
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        this.setState({
            wikis: data.Data
        })
    }

    useEffect(
        () => {
            if (times % 3 === 0) {
                setCounter(counter + 1);
            }
        },
        [times]  // <--- THIS RIGHT HERE IS THE KEY!
    );

    render(){
        return(
            <div>       
                <input type="button" onClick='this.getWikis()' value="klcik"></input>
                {this.state.wikis.map( (wikis,index)=>
                    (
                        <div key={index}>
                            <WikiTag title={wikis.Title} Type={wikis.Type} wID={wikis.ID}/>
                        </div>
                    ))}
            </div>
        )  
    }
        

}

