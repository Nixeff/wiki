import React, { useEffect, useState } from "react";

export default ShowAllWikis;

class ShowAllWikis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wikis: [{"ID":2,"Type":"wiki","Title":"asd"}],
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

    render(){
        return(
            <div>
                {this.state.wikis.map( (wikis,index)=>
                    (
                        <div key={index}>
                            <h3>{wikis.Title}</h3>
                            <p>{wikis.Type}</p>
                        </div>
                    ))}
            </div>
        )
        
    }
        

}
