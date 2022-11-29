import { useEffect, useState } from "react";

function ShowAllWikis(){
    const [wikis, setWikis] = useState([{"ID":2,"Type":"wiki","Title":"asd"},]);
    const getWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki";
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setWikis(data.Data); 
    }
    
    useEffect(() => {
        getWikis();
    });

    
    
    return(
        <div>
            {wikis.map( (wikis,index)=>
                (
                    <div key={index}>
                        <h3>{wikis.Title}</h3>
                        <p>{wikis.Type}</p>
                    </div>
                )
                )}
        </div>
    )
}

export default ShowAllWikis;

