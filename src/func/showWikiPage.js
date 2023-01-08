import React from "react";
import { useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";
import WikiTag, {Back} from "./buttons";
import "../css/styles.css";
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
        this.getPages();
    }

    getPages = async () => {
        console.log(this.state.ID);
        let API_URL = "https://acesoft.ntigskovde.se/Ace-Software/search.php?wiki_id="+this.state.ID;
        
        fetch(`${API_URL}`)
        .then((data) => data.json())
        .then(data => {
            let prevID;
            let prevIndex;
            let highestCID;
            let wikisList = [];
            
            data.Data.map((d,index)=>{
                console.log(d);
                
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
                <Back location="/ShowAllWikis"/>
                <LoginForm isShowLogin={this.state.isShowLogin}/>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {this.state.wikis?(
                <div>
                        {this.state.wikis.map( (wikis,index)=>{
                                let title = JSON.parse(wikis.Content);
                                console.log(title);
                                return(
                                    <div key={index}>
                                        <WikiTag location="/Page" cookieName="pID" title={title.summery.title} value={wikis.ID}/>
                                        <DeleteWikiPage pID={wikis.ID}/>
                                    </div>
                                )
                            })}
                        <CreateWikiPage wID={this.state.ID} uID={this.state.user} token={this.state.token}/>
                </div>
                ):(
                    <CreateWikiPage wID={this.state.ID} uID={this.state.user} token={this.state.token}/>
                )}

            </div>
        )
    }
} 
