import React from "react";
import { json, useParams } from "react-router-dom";
import { loadLS } from "./localStorage";
import LoginForm from './LoginForm';
import NavBar from "./NavBar";
import "../css/showPageEdit.css";
import { Navigate, useNavigate } from "react-router-dom";
import { EditWikiPageButton } from "./buttons";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Back } from "./buttons";
import ChangePath from "./changePathFunction";

export default class EditWikiPage extends React.Component {
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
            anwser: false,
        }
    }
    // Gör en är du säker check
    confirm = async(type,data) =>{
        if(type=="create"){ // Ska du skapa ett objekt
            confirmAlert({
                title: 'Är du säker?',
                message: 'Säker?',
                buttons: [
                    {
                    label: 'Ja',
                    onClick: () => {return true}
                    },
                    {
                    label: 'Nej',
                    onClick: () => {return false}
                    }
                ]
            });
        }
        if(type=="remove"){ // Ska du ta bort ett objekt
            console.log("hi");
            confirmAlert({
                title: 'Är du säker?',
                message: 'Säker?',
                buttons: [
                    {
                    label: 'Ja',
                    onClick: () => this.removeArea(data[0],data[1],data[2])
                    },
                    {
                    label: 'Nej',
                    onClick: () => console.log("hi")
                    }
                ]
            });
        }
    }


    componentDidMount(){ // Kör get pages när sidan laddar in en gång
        this.getPages();
    }

    sendData = async () => { // Sickar in data 
        let navigate = useNavigate();
        let uID = loadLS("uID");
        let token = loadLS("token");
        let pID = loadLS("pID");

        let wikiPage = '{"summery":{"title":"'+this.state.summeryTitle+'","img":"'+this.state.summeryImg+'","tags":'+JSON.stringify(this.state.summeryTags)+'},"description":"'+this.state.description+'","content":'+JSON.stringify(this.state.content)+',"refrences":'+JSON.stringify(this.state.refrences)+'}';
        console.log(wikiPage);
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_update_page.php";
        let postOptions = {
            "method": "POST",
            "headers": {"Content-Type":"application/x-www-form-urlencoded"}, // this line is important, if this content-type is not set it wont work
            "body": "user_id="+uID+"&token="+token+"&page_id="+pID+"&content="+wikiPage
        }
        fetch(`${API_URL}`,postOptions)
        .then((response) => {
            console.table(response);
            return response.json()})
        .then((data) => {
            navigate("/Page");
            
        });
    }

    getPages = async () => {
        let API_URL = "http://acesoft.ntigskovde.se/Ace-Software/Wiki/wiki_get_content.php?page_id="+this.state.ID;
        fetch(`${API_URL}`)
        .then((response) => {return response.json()})
        .then((data) => {
            let wikis= JSON.parse(data.Data.page_data.page_content);
            console.log(wikis);
            this.setState({
                summeryTitle: wikis.summery.title,
                summeryImg: wikis.summery.img,
                summeryTags: wikis.summery.tags,
                description: wikis.description,
                content: wikis.content,
                refrences: wikis.refrences,
            });
        });
    }

    handleChange = (event, name) => {
        if(name == "description"){
            this.setState({description: event.target.value});
        } 
        if(name == "title"){
            this.setState({summeryTitle: event.target.value});
        } 
        
    };
    handleChangeList = (event, name, index) => {
        let temp;
        if (name == "tagsName"){
            temp = this.state.summeryTags;
            temp[index] = JSON.parse('{"name":"'+event.target.value+'","content":"'+temp[index].content+'"}');
            this.setState({summeryTags: temp})
        } else if (name == "tagsContent"){
            temp = this.state.summeryTags;
            temp[index] = JSON.parse('{"name":"'+temp[index].name+'","content":"'+event.target.value+'"}');
            console.log(temp[index]);
            this.setState({summeryTags: temp})
        }else if (name == "contentTitle"){
            temp = this.state.content;
            temp[index] = JSON.parse('{"type":"title","text":"'+event.target.value+'"}');
            console.log(temp[index]);
            this.setState({content: temp})
            
        }else if (name == "contentUnderTitle"){
            temp = this.state.content;
            temp[index] = JSON.parse('{"type":"underTitle","text":"'+event.target.value+'"}');
            this.setState({content: temp})
        }else if (name == "contentText"){
            temp = this.state.content;
            temp[index] = JSON.parse('{"type":"text","text":"'+event.target.value+'"}');
            this.setState({content: temp})
        }
        console.log(temp);
    };
    handleChangeListList = (event, index, mapIndex)=>{
        let temp = this.state.content;
        console.log(temp[mapIndex].text[index]);
        temp[mapIndex].text[index] = event.target.value;
        this.setState({content: temp});
    }
    createArea(pos, type, index){
        let temp;
        if(pos == "tags"){
            temp = this.state.summeryTags;
            temp.push({"name":"Namn","content":"Innehåll"});
            this.setState({
                summeryTags: temp
            })
        }
        if(pos == "content"){
            if(type == "title"){
                temp = this.state.content;
                temp.push({"type":"title","text":"Titel"});
                console.log(temp);
                this.setState({
                content: temp
                })
            }
            if(type == "underTitle"){
                temp = this.state.content;
                temp.push({"type":"underTitle","text":"Under titel"});
                this.setState({
                content: temp
                })
            }
            if(type == "text"){
                temp = this.state.content;
                temp.push({"type":"text","text":"text"});
                this.setState({
                content: temp
                })
            }
            if(type == "list"){
                temp = this.state.content;
                temp.push({"type":"list","text":["text"]});
                this.setState({
                content: temp
                })
            }
        }
        if(pos == "list"){
            temp = this.state.content;
            temp[index].text.push("List objekt")
            this.setState({
            content: temp
            })
        }
    }
    removeArea(pos,listPos,listListPos){
                let temp;
                if(pos == "tags"){
                    temp = this.state.summeryTags;
                    delete temp[listPos];
                    this.setState({
                        summeryTags: temp
                    })
                }
                if(pos == "title"){
                    temp = this.state.content;
                    delete temp[listPos];
                    this.setState({
                        content: temp
                    })
                }
                if(pos == "underTitle"){
                    temp = this.state.content;
                    delete temp[listPos];
                    this.setState({
                        content: temp
                    })
                }
                if(pos == "text"){
                    temp = this.state.content;
                    delete temp[listPos];
                    this.setState({
                        content: temp
                    })
                }
                if(pos == "list"){
                    temp = this.state.content;
                    delete temp[listPos];
                    this.setState({
                        content: temp
                    })
                }
                if(pos == "listItem"){
                    temp = this.state.content;
                    let items = this.state.content[listPos].text;
                    delete items[listListPos];
                    temp[listPos].text = items;
                    this.setState({
                        content: temp
                    })
                }
                this.setState({anwser:false})
        
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
                <Back location="/Page"/>
                <LoginForm isShowLogin={this.state.isShowLogin}/> 
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div id="data">
                    <div id="areaOne">
                        <p id="contentTitle"> Beskrivning</p>
                        <textarea onChange={(event)=>this.handleChange(event,"description")} value={this.state.description} name='awesome' rows="5"  cols="60"></textarea>
                        <div id="contents">
                            <p id="contentTitle"> Innehåll</p>
                            {this.state.content.map( (contents,index)=>
                                {
                                    if(contents != null){
                                        if(contents.type == "title"){
                                            let idLink = "#contentsItem"+index;
                                            return(
                                                <div id="tag" key={index}>
                                                    <a href={idLink}>{contents.text}</a>
                                                </div>
                                            )
                                        }
                                    }
                                }
                            )}
                        </div>
                    </div>
                    <div id="areaTwo">
                        <div id="summery">
                        <textarea id="summeryTitle" onChange={(event)=>this.handleChange(event,"title")} value={this.state.summeryTitle} name='awesome' rows="1"  cols="41"></textarea>
                            <img id="summeryImg" src={this.state.summeryImg} alt="Bild" width="500" height="500"></img>
                            {this.state.summeryTags.map( (tags,index)=>
                                (
                                    <div id="tag" key={index}>
                                        <textarea onChange={(event)=>this.handleChangeList(event,"tagsName",index)} value={tags.name} name='awesome' rows="1"  cols="15"></textarea>
                                        <textarea onChange={(event)=>this.handleChangeList(event,"tagsContent",index)} value={tags.content} name='awesome' rows="1"  cols="15"></textarea>
                                        <button onClick={()=> this.confirm("remove",["tags",index,0])}>Ta bort tag</button>
                                    </div>
                                ))}
                            <button onClick={()=> this.createArea("tags")}>Lägg till tag</button>
                        </div>
                    </div>
                </div>
                <div id="areaThree">
                    <div>
                        <div id="content">
                        {this.state.content.map( (content,index)=>
                            {
                                if(content != null){
                                if(content.type == "title"){
                                    let idTag = "contentsItem"+index;
                                    return(
                                        <div id={idTag} key={index}>
                                            <textarea id="contentTitle" onChange={(event)=>this.handleChangeList(event,"contentTitle",index)} value={content.text} name='awesome' rows="1"  cols="20"></textarea>
                                            <button onClick={()=> this.confirm("remove",["title",index,0])}>Ta bort title</button>
                                        </div>
                                    )
                                }
                                else if(content.type == "underTitle"){
                                    return(
                                        <div key={index}>
                                            <textarea id="contentUnderTitle" onChange={(event)=>this.handleChangeList(event,"contentUnderTitle",index)} value={content.text} name='awesome' rows="1"  cols="20"></textarea>
                                            <button onClick={()=> this.confirm("remove",["underTitle",index,0])}>Ta bort under title</button>
                                        </div>
                                    )
                                }
                                else if(content.type == "text"){
                                    return(
                                        <div key={index}>
                                            <textarea onChange={(event)=>this.handleChangeList(event,"contentText",index)} value={content.text} name='awesome' rows="4"  cols="100"></textarea>
                                            <button onClick={()=> this.confirm("remove",["text",index,0])}>Ta bort text</button>
                                        </div>
                                    )
                                }
                                else if(content.type == "list"){
                                    let mapIndex = index;
                                    return(
                                        <div>
                                            {content.text.map((item, index)=>(
                                                <div>
                                                    <textarea onChange={(event)=>this.handleChangeListList(event,index,mapIndex)} value={item} name='awesome' rows="1"  cols="40"></textarea>
                                                    <button onClick={()=> this.confirm("remove",["listItem",mapIndex,index])}>Ta bort list object</button>
                                                </div>
                                                
                                            ))}
                                            <button onClick={()=> this.createArea("list","list",mapIndex)}>Lägg till list object</button>
                                            <button onClick={()=> this.confirm("remove",["list",mapIndex,index])}>Ta bort lista</button>
                                        </div>
                                    )
                                }
                            }
                                
                            })}
                            <button onClick={()=>this.createArea("content","title")}>Lägg till Titel</button>
                            <button onClick={()=>this.createArea("content","underTitle")}>Lägg till Under Titel</button>
                            <button onClick={()=>this.createArea("content","list")}>Lägg till Lista</button>
                            <button onClick={()=>this.createArea("content","text")}>Lägg till Text</button>
                        </div>
                        <div id="refrences">
                        {this.state.refrences.map( (refrences,index)=>
                            (
                                <div id="refrenceItem" key={index}>
                                    <a href={refrences.where}>{refrences.title}</a>
                                </div>
                            ))}
                        </div>
                        <button onClick={()=>this.sendData()}>Confirm Edit</button>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}