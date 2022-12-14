import React from "react";
import { useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import LoginForm from './LoginForm';
import NavBar from "./NavBar";
import WikiTag from "./wikiTags";

export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ID: loadLS("pID"),
            wikis: [],
            isShowLogin: false
        }
    }

    getPages = async () => {
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_get_content.php?page_id="+this.state.ID;
        console.log(API_URL);
        fetch(`${API_URL}`)
        .then((data) => {return data.json()})
        .then(data => {
            this.setState({wikis: data.Data.page_data.page_content});
        });
    }

    render(){
        const handleLoginClick = () => {
            this.setState(prevState => ({
                isShowLogin: !prevState.isShowLogin
              }));
        }
        return(
            
            <div>
                {this.state.isShowLogin?(
                    <LoginForm isState={this.state.isShowLogin} />
                ):(
                    console.log("Nothing to see here")
                )}
                <NavBar handleLoginClick={handleLoginClick}/>
                <LoginForm isShowLogin={this.state.isShowLogin}/> 
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <input id="showWikis" type="button" onClick={() => this.getPages()} value="Show"></input>
                <div>
                    {this.state.wikis.map( (wikis,index)=>
                        (
                            <div key={index}>
                                <div>{wikis}</div>
                            </div>
                    ))}
            </div>
            </div>
        )
    }
}
