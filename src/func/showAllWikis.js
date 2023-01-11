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
            isAdmin: false,
            userType: loadLS("userType")
        }
    }
    componentDidMount(){
        document.documentElement.style.setProperty('--bc-color', "rgb(233, 233, 233)");
        this.onLoadGetWikis();
    }

    onLoadGetWikis = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki&title="+this.state.title;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then((data) => {
            this.setState({wikis: data.Data});
        });
        if (this.state.userType == "Admin"){
            this.setState({
                isAdmin: true
            })
        };
    }

    handleChangeUser = (event) => {
        this.setState({title: event.target.value});
        this.getWikis(event);
    };

    getWikis = async (event) => {
        if(event != undefined){
            event.preventDefault();
            let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki&title="+event.target.value;
            fetch(`${API_URL}`)
            .then((data) => data.json())
            .then((data) => {
            this.setState({wikis: data.Data});
            });
        } else{
            let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki&title=";
            fetch(`${API_URL}`)
            .then((data) => data.json())
            .then((data) => {
            this.setState({wikis: data.Data});
            })
        }
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
                    null
                )}
                <NavBar handleLoginClick={handleLoginClick}/>
                <LoginForm isShowLogin={this.state.isShowLogin}/>  
                <div>
                    <div id="showWikis">
                        <input id="showWikis" type="text" placeholder="Sök Wiki..." className="search-wiki" onChange={this.handleChangeUser} value={this.state.title}/>
                        <input id="submitShowWikis" className="search-wiki-btn" onClick={()=>this.getWikis()} type="button" value="Sök"/>
                    </div>
                    {this.state.isAdmin?(
                        <CreateWiki isState={this.state.isAdmin}/>
                        ):(
                        null
                    )}
                </div>
                {this.state.wikis?(
                    <div id="wikiList">
                    {this.state.wikis.map( (wiki,index)=>(
                        <div key={index}>
                            <WikiTag location="/WikiPage" cookieName="wID" title={wiki.Title} value={wiki.ID}/>
                            {this.state.isAdmin?(
                                <DeleteWiki wID={wiki.ID}/>
                            ):(
                                null
                            )}
                        </div>
                    ))}
                </div>
                ):(
                    null
                )}

                
            </div>
        )
    }
}