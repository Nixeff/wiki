import React from "react";
import WikiTag from "./buttons";
import LoginForm from './LoginForm';
import NavBar from './NavBar';
import CreateWiki from "./createWiki";
import "../css/styles.css";
import "../css/showAllWikis.css";
import { loadLS } from "./localStorage";
import DeleteWiki from "./deleteWiki";

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
                    <input id="showWikis" type="text" placeholder="Sök Wiki..." className="search-wiki" onChange={this.handleChangeUser} value={this.state.title}/>
                    <input id="submitShowWikis" className="search-wiki-btn" type="submit" value="Sök"/>
                </form>
                {console.log(this.state.wikis)}
                {this.state.wikis?(
                    <div id="wikiList">
                    {this.state.wikis.map( (wiki,index)=>(
                        <div key={index}>
                            <WikiTag location="/WikiPage" cookieName="wID" title={wiki.Title} value={wiki.ID}/>
                            <DeleteWiki wID={wiki.ID}/>
                        </div>
                    ))}
                </div>
                ):(
                    console.log("")
                )}
                <div id="cwbutton">
                    <CreateWiki/>
                </div>
            </div>
        )
    }
}