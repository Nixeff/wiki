import React from "react";
import WikiTag from "./buttons";
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import CreateWiki from "./createWiki";
import "../css/styles.css";
import "../css/showAllWikis.css";
import { loadLS } from "./localStorage";

export default class ShowAllWikis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wikis: [],
            title: "",
            isShowLogin: false,
            userType: loadLS("userType")
        }
    }
    componentDidMount(){
        this.onLoadGetWikis();
    }

    onLoadGetWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki&title="+this.state.title;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then((data) => {
            this.setState({wikis: data.Data});
        });
    }

    handleChangeUser = (event) => {
        this.setState({title: event.target.value});
    };

    getWikis = async (event) => {
        event.preventDefault();
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki&title="+this.state.title;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then((data) => {
            this.setState({wikis: data.Data});
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
                <form id="showWikis" onSubmit={this.getWikis}>
                    <input id="showWikis" type="text" onChange={this.handleChangeUser} value={this.state.title}/>
                    <input id="submitShowWikis" type="submit" value="sök"/>
                </form>
                <div id="wikiList">
                    {this.state.wikis.map( (wikis,index)=>(
                        <div key={index}>
                            <WikiTag location="/WikiPage" cookieName="wID" title={wikis.Title} value={wikis.ID}/>
                        </div>
                    ))}
                </div>
                <div id="cwbutton">
                    <CreateWiki/>
                </div>
            </div>
        )
    }
}