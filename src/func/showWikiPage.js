import React from "react";
import { useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import WikiTag, {Back} from "./buttons";
import "../css/styles.css";
import "../css/showWikiPage.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import CreateWikiPage from "./createWikiPage";
import DeleteWikiPage from "./deletePage";

export default class ShowWikiPage extends React.Component {
    constructor(props){
        
        super(props);
        this.state = {
            token: loadLS("token"),
            user: loadLS("uID"),
            ID: loadLS("wID"),
            userType: loadLS("userType"),
            wikis: [],
            isShowLogin: false
        }
    }
    submit(){
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                label: 'Yes',
                onClick: () => alert('Click Yes')
                },
                {
                label: 'No',
                onClick: () => alert('Click No')
                }
            ]
            });
        };

    componentDidMount(){
        document.documentElement.style.setProperty('--bc-color', "rgb(233, 233, 233)");
        this.getPages();
    }

    getPages = async () => {
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?wiki_id="+this.state.ID;
        
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            let prevID;
            let prevIndex;
            let highestCID;
            let wikisList = [];
            // Lägger till en sak i slutet så att den fixar till sig själv???
            data.Data.push(data.Data[0]);
            // Tar bort de andra versionerna av en wiki sida
            data.Data.map((d,index)=>{
                
                if(index == 0){
                    prevID = d.ID;
                    highestCID = d.contentID;
                    prevIndex = index;
                } else if(d.ID != prevID){
                    wikisList.push(data.Data[prevIndex]);
                    prevID = d.ID;
                    highestCID = d.contentID;
                    prevIndex = index;
                } else if(d.contentID>highestCID){
                    highestCID = d.contentID;
                    prevIndex = index;
                    
                }
            })
            this.setState({wikis: wikisList});
        });
    }

    printThing(list){
        let maxLength = 3;
        let runs = 0;
        if(list.length >= maxLength){
            return(
                <div id="pages">
                    {list.splice(0,3).map( (wikis,index)=>{
                        let title = JSON.parse(wikis.Content);
                        
                        return(
                            <div id="page" key={index} >
                                <WikiTag location="/Page" cookieName="pID" title={title.summery.title} value={wikis.ID}/>
                                <p id="desc">{title.description}</p>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            let len = list.length;
            return(
                <div id="pages">
                    {list.splice(0,len).map( (wikis,index)=>{
                        let title = JSON.parse(wikis.Content);
                        
                        return(
                            <div id="page" key={index} >
                                <WikiTag location="/Page" cookieName="pID" title={title.summery.title} value={wikis.ID}/>
                                <p id="desc">{title.description}</p>
                            </div>
                        )
                    })}
                </div>
            )
        }
        
    }

    lineBreak(){
        let temp = Math.ceil(this.state.wikis.length/3); //ceil() rundar upp till närmsta int
        let wikiss = this.state.wikis;
        let test = [];
        for (let i = 0; i < 5; i++) {
            test.push(this.printThing(wikiss));
        }
        return test;
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
                <Back location="/ShowAllWikis"/>
                <LoginForm isShowLogin={this.state.isShowLogin}/>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {this.state.wikis?(
                    <div>
                        {this.state.userType?(
                            <CreateWikiPage wID={this.state.ID} uID={this.state.user} token={this.state.token}/>
                        ):(
                            null
                        )}
                        {this.lineBreak()}
                        
                    </div>
                    
                ):(
                    <div>
                        {this.state.userType?(
                            <CreateWikiPage wID={this.state.ID} uID={this.state.user} token={this.state.token}/>
                        ):(
                            null
                        )}
                    </div>
                )}

            </div>
        )
    }
} 
