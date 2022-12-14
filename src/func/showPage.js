import React from "react";
import { json, useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import LoginForm from './LoginForm';
import NavBar from "./NavBar";
import WikiTag from "./wikiTags";
import { convertXML } from "simple-xml-to-json";
import "../css/showPage.css";
import { toHaveFocus } from "@testing-library/jest-dom/dist/matchers";

export default class ShowPage extends React.Component {
    constructor(props){
        super(props);
        const {convertXML, createAST} = require("simple-xml-to-json")
        this.state = {
            ID: loadLS("pID"),
            isShowLogin: false
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
                <input id="showWikis" type="button" onClick={() => this.getPages()} value="Show"></input>
                <div id="data">
                    <div id="areaOne">
                        <p id="description">{this.state.description}</p>
                        <div id="contents">
                            {this.state.content.map( (contents,index)=>
                                    (
                                        <div id="contentsItem+{index}" key={index}>
                                            <a href="#contentTitle">{contents.title}</a>
                                        </div>
                                    ))}
                        </div>
                    </div>
                    <div id="areaTwo">
                        <div id="summery">
                            <p id="summeryTitle">{this.state.summeryTitle}</p>
                            <img id="summeryImg" src={this.state.summeryTitle} alt="Image" width="500" height="500"></img>
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
                            (
                                <div id="contentItem+{index}" key={index}>
                                    <p id="contentTitle">{content.title}</p>
                                    <p> {content.text}</p>
                                </div>
                            ))}
                        </div>
                        <div id="refrences">
                        {this.state.refrences.map( (refrences,index)=>
                            (
                                <div id="refrenceItem" key={index}>
                                    <p>{refrences.title} | </p>
                                    <p> {refrences.where}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
