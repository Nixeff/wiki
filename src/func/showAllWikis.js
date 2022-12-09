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
            title: "",
            isShowLogin: false
        }
        
    }

    handleChangeUser = (event) => {
        this.setState({title: event.target.value});
        console.log('value is:', event.target.value);
        console.log('value is also:', this.state.title);
    };

    getWikis = async (event) => {
        event.preventDefault();
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki&title="+this.state.title;
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            this.setState({wikis: data.Data});
            console.log(this.state.wikis)
        });
    }

    check = () => {
        if (this.state.wikis.length === 0){
           return null; 
        } 
    }

    render(){
        const handleLoginClick = () => {
            this.setState(prevState => ({
                isShowLogin: !prevState.isShowLogin
              }));
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
                <form id="showWikis" type="submit" onSubmit={this.getWikis}>
                    <input id="showWikis" type="text" onChange={this.handleChangeUser} value={this.state.title}></input>
                </form>
                <div id="wikiList">
                <div>
                        {this.state.wikis.map( (wikis,index)=>
                            (
                                <div key={index}>
                                    <WikiTag location="/WikiPage" cookieName="wID" title={wikis.Title} value={wikis.ID}/>
                                </div>
                            ))}
                    </div>
                </div>
                
            </div>
        )
    }
}