import { useEffect, useState } from "react";

function showAllWikis(){
    const [wikis, setWikis] = useState();
    const getWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki";
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        setWikis(data.data);
    }
    useEffect(() => {
        //getWikis();
    });

    return(
        <div className={wikis} >
        
        </div>
    )
}

export default showAllWikis;