import React from "react";
import { json, useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import LoginForm from './LoginForm';
import NavBar from "./NavBar";
import "../css/Three.css";
import { Navigate, useNavigate } from "react-router-dom";
import { EditWikiPageButton } from "./buttons";
import { Back } from "./buttons";

export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ID: loadLS("pID"),
            isShowLogin: false,
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
        

    }

    getPages = async () => {
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_get_content.php?page_id="+this.state.ID;
        fetch(`${API_URL}`)
        .then((data) => {return data.json()})
        .then((data) => {
            
            let wikis = JSON.parse(data.Data.page_data.page_content);
            console.table(wikis);
            this.setState({
                summeryTitle: wikis.summery.title,
                summeryImg: wikis.summery.img,
                summeryTags: wikis.summery.tags,
                description: wikis.description,
                contents: wikis.contents,
                content: wikis.content,
                refrences: wikis.refrences,
            });
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
                <Back location="/WikiPage"/>
                <LoginForm isShowLogin={this.state.isShowLogin}/> 
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div id="data">
                    <div id="areaOne">
                        <div id="descriptionBG">
                            <p id="contentTitle"> Beskrivning</p>
                            <p id="description">{this.state.description}</p>
                        </div>
                        <div id="contents">
                            <p id="contentTitle"> Innehåll</p>
                            {console.log(this.state.content)}
                            {this.state.content.map( (contents,index)=>
                                {  
                                    if(contents != null){
                                    if(contents.type == "title" && contents != null){
                                        let idLink = "#contentsItem"+index;
                                        return(
                                            <div id="contentsItem" key={index}>
                                                <a href={idLink}>{contents.text}</a>
                                            </div>
                                        )
                                    }
                                }
                                    
                                })}
                        </div>
                    </div>
                    <div id="areaTwo">
                        <div id="summery">
                            <p id="summeryTitle">{this.state.summeryTitle}</p>
                            <img id="summeryImg" src={this.state.summeryImg} alt="Bild" width="490" height="490"></img>
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
                                if(content != null){
                                if(content.type == "title" && content != null){
                                    let idTag = "contentsItem"+index;
                                    return(
                                        <div id={idTag} key={index}>
                                            <p id="contentTitle">{content.text}</p>
                                        </div>
                                    )
                                }
                                else if(content.type == "underTitle" && content != null){
                                    return(
                                        <div key={index}>
                                            <p id="contentUnderTitle">{content.text}</p>
                                        </div>
                                    )
                                }
                                else if(content.type == "text" && content != null){
                                    return(
                                        <div key={index}>
                                            <p id="contentText">{content.text}</p>
                                        </div>
                                    )
                                }
                                else if(content.type == "list" && content != null){
                                    return(
                                        <div key={index}>
                                            {content.text.map((item, index)=>(
                                                <li key={index} id="contentListText">{item}</li>
                                            ))}
                                        </div>
                                    )
                                }
                                else if(content.type == "img" && content != null){
                                    return(
                                        <div key={index}>
                                            <img id="summeryImg" src={content.text} alt="Bild" width="500" height="500"></img>
                                        </div>
                                    )
                                }
                            }
                                
                            })}
                        </div>
                        <div id="refrences">
                            <p id="contentUnderTitle">Källor</p>
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
