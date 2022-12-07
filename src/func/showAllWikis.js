import React from "react";
import WikiTag from "./wikiTags";
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import "../css/styles.css";
import "../css/showAllWikis.css";

export default class ShowAllWikis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wikis: [],
            test: "",
            isShowLogin: false
        }
        
    }

    getWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki";
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            this.setState({wikis: data.Data});
        });
    }

    render(){
        const handleLoginClick = () => {
            console.log("Message 3 " + this.state.isShowLogin)
            this.setState(prevState => ({
                isShowLogin: !prevState.isShowLogin
              }));
        console.log("Message 3 " + this.state.isShowLogin)
        }
        return(
            <div>     {
                this.state.isShowLogin?(
                    <LoginForm isState={this.state.isShowLogin} />
                ):(
                    console.log("Nothing to see here")
                )}
                <NavBar handleLoginClick={handleLoginClick}/>
                <LoginForm isShowLogin={this.state.isShowLogin}/>  
                
                <input id="showWikis" type="button" onClick={() => this.getWikis()} value="Show"></input>
                <div id="wikiList">
                <div>
                        {this.state.wikis.map( (wikis,index)=>
                            (
                                <div key={index}>
                                    <WikiTag location="/WikiPage" title={wikis.Title} ID={wikis.ID}/>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}