import React, {Component} from 'react'
import Header from "../../components/Header/Header.js";
import './EnglishVocabulary.css'
import Footer from '../../components/Footer/Footer';
import EnglishVocabularyItem from '../../components/EnglishVocabularyItem/EnglishVocabularyItem.js';
import { withRouter, Redirect } from 'react-router-dom';
import { isLogin } from '../Login/Login.js';

class EnglishVocabulary extends Component{

    constructor(props){
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    title: "Type of Vocabulary",
                },
                {
                    id: 2,
                    title: "Type of Vocabulary",
                }
                ,
                {
                    id: 3,
                    title: "Type of Vocabulary",
                }
                ,
                {
                    id: 4,
                    title: "Type of Vocabulary",
                }
                ,
                {
                    id: 5,
                    title: "Type of Vocabulary",
                }
                ,
                {
                    id: 6,
                    title: "Type of Vocabulary",
                }
                ,
                {
                    id: 7,
                    title: "Type of Vocabulary",
                }
                ,
                {
                    id: 8,
                    title: "Type of Vocabulary",
                }
                ,
                {
                    id: 9,
                    title: "Type of Vocabulary",
                }
            ]
        }
    }

    render(){

        let cards = this.state.items.map((item)=>{
            return(
                <div className="Item" key={item.id}>
                    <EnglishVocabularyItem item={item}></EnglishVocabularyItem>
                </div>
            );
        })

        // let islogin = isLogin();
        
        // if(!isLogin)
        //     return  <Redirect path='/'></Redirect>

        return(
            <div className="Vocabulary">
                <div className="Vocabulary_Header">
                    <Header></Header>
                </div>
                <div className="Content">
                    <div className="Dock_Notification">
                        One of the most effective ways to improve your English Explorer a bit to find out what we do.
                    </div>
                   <div className="Content_Row">
                        <div className="Content_Row_Header">Learn English<div className="Header_Bold"> Vocabulary</div></div>
                        <div className="Content_Row_Title">Choose a Category</div>
                        <div className="Content_Row_Items">
                           {cards}
                        </div>
                   </div>
                   <div className="Vocabulary_Footer">
                       <Footer></Footer>
                   </div>
                </div>
         
            </div>
        );
    }

}

export default withRouter(EnglishVocabulary);