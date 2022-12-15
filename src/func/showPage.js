import React from "react";
import { json, useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import LoginForm from './LoginForm';
import NavBar from "./NavBar";
import "../css/showPage.css";
import { Navigate, useNavigate } from "react-router-dom";
import { EditWikiPageButton } from "./buttons";

export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ID: loadLS("pID"),
            isShowLogin: false,
            wikis: "",
            summeryTitle: "",
            summeryImg: "",
            summeryTags: [],
            contents: [],
            description: "",
            content: [],
            refrences: [],
        }
    }

    componentDidMount(){
        this.getPages();
        this.getPages();
        
    }

    getPages = async () => {
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_get_content.php?page_id="+this.state.ID;
        console.log(API_URL);
        fetch(`${API_URL}`)
        .then((data) => {return data.json()})
        .then((data) => {
            console.log(data);
            this.setState({
                wikis: JSON.parse(data.Data.page_data.page_content),
            });
            this.setState({
                summeryTitle: this.state.wikis.summery.title,
                summeryImg: this.state.wikis.summery.img,
                summeryTags: this.state.wikis.summery.tags,
                description: this.state.wikis.description,
                contents: this.state.wikis.contents,
                content: this.state.wikis.content,
                refrences: this.state.wikis.refrences,
            });
            console.dir(this.state.summeryTitle);
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
                <div id="data">
                    <div id="areaOne">
                        <p id="contentTitle"> Beskrivning</p>
                        <p id="description">{this.state.description}</p>
                        <div id="contents">
                            <p id="contentTitle"> Innehåll</p>
                            {this.state.content.map( (contents,index)=>
                                {
                                    if(contents.type == "title"){
                                        let idLink = "#contentsItem"+index;
                                        return(
                                            <div id="tag" key={index}>
                                                <a href={idLink}>{contents.text}</a>
                                            </div>
                                        )
                                    }
                                    
                                })}
                        </div>
                    </div>
                    <div id="areaTwo">
                        <div id="summery">
                            <p id="summeryTitle">{this.state.summeryTitle}</p>
                            <img id="summeryImg" src={this.state.summeryImg} alt="Bild" width="500" height="500"></img>
                            {this.state.summeryTags.map( (tags,index)=>
                                (
                                    <div id="tag" key={index}>
                                        <p>{tags.name} | </p>
                                        <p> {tags.content}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div id="areaThree">
                    <div>
                        <div id="content">
                        {this.state.content.map( (content,index)=>
                            {
                                if(content.type == "title"){
                                    let idTag = "contentsItem"+index;
                                    return(
                                        <div id={idTag} key={index}>
                                            <p id="contentTitle">{content.text}</p>
                                        </div>
                                    )
                                }
                                else if(content.type == "underTitle"){
                                    return(
                                        <div key={index}>
                                            <p id="contentUnderTitle">{content.text}</p>
                                        </div>
                                    )
                                }
                                else if(content.type == "text"){
                                    return(
                                        <div key={index}>
                                            <p id="contentText">{content.text}</p>
                                        </div>
                                    )
                                }
                                else if(content.type == "list"){
                                    return(
                                        <div>
                                            {content.text.map((item, index)=>(
                                                <li id="contentListText">{item}</li>
                                            ))}
                                        </div>
                                    )
                                }
                                
                            })}
                        </div>
                        <div id="refrences">
                        {this.state.refrences.map( (refrences,index)=>
                            (
                                <div id="refrenceItem" key={index}>
                                    <a href={refrences.where}>{refrences.title}</a>
                                </div>
                            ))}
                        </div>
                        <EditWikiPageButton title="Edit" location="/EditPage"/>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}
