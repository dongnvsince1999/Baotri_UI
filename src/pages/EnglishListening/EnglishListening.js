import React, {Component} from 'react'
import Header from "../../components/Header/Header.js";
import './EnglishListening.css'
import Footer from '../../components/Footer/Footer';
import EnglishVocabularyItem from '../../components/EnglishVocabularyItem/EnglishVocabularyItem.js';
import { withRouter } from 'react-router-dom';

class EnglishListening extends Component{

    constructor(props){
        super(props);
        this.state = {
            items: [
                {
                    id: 1,
                    name: "Type of Listening"
                },
                {
                    id: 2,
                    name: "Type of Listening"
                }
                ,
                {
                    id: 3,
                    name: "Type of Listening"
                }
                ,
                {
                    id: 4,
                    name: "Type of Listening"
                }
                ,
                {
                    id: 5,
                    name: "Type of Listening"
                }
                ,
                {
                    id: 6,
                    name: "Type of Listening"
                }
                ,
                {
                    id: 7,
                    name: "Type of Listening"
                }
                ,
                {
                    id: 8,
                    name: "Type of Listening"
                }
                ,
                {
                    id: 9,
                    name: "Type of Listening"
                }
            ]
        }
        // const path = window.location.pathname;
        // console.log('path: ' + path);
    }

    render(){

        let cards = this.state.items.map((item)=>{
            return(
                <div className="Item" key={item.id}>
                    <EnglishVocabularyItem item={item}></EnglishVocabularyItem>
                </div>
            );
        })

        return(
            <div className="Listening">
                <div className="Listening_Header">
                    <Header></Header>
                </div>
                <div className="Content">
                    <div className="Dock_Notification">
                        One of the most effective ways to improve your English Explorer a bit to find out what we do.
                    </div>
                   <div className="Content_Row">
                        <div className="Content_Row_Header">Learn English<div className="Header_Bold"> Listening</div></div>
                        <div className="Content_Row_Title">Choose a Category</div>
                        <div className="Content_Row_Items">
                           {cards}
                        </div>
                   </div>
                   <div className="Listening_Footer">
                       <Footer></Footer>
                   </div>
                </div>
         
            </div>
        );
    }

}

export default withRouter(EnglishListening);