import React, { Component } from 'react'
import Header from "../../components/Header/Header.js";
import './Admin.css'
import Footer from "../../components/Footer/Footer.js";
import PageTitle from "../../components/PageTitle/PageTitle.js"
import Admin_GrammarManagementComponent from "./Admin_GrammarManagementComponent/Admin_GrammarManagementComponent"
//default: account center

class Admin extends Component {
    constructor(props) {
        super();

        this.state = {
            info: {
                "avatarUrl": "https://i.imgur.com/q54xYo3.png",
                "displayName": "Nguyen Van Dong",
                "userName": "tesla",
                "gmail": "dongnv.since1999@gmail.com",
                "password_length": 10
            },
            //To choose which will be show in account center
            isUpdateInfo: false,
            isChangePass: false,

            //To choose which main component will be show
            isAccountCenter: false,
            isGrammarManager: true,
            isVocabularyManager: false,
            isListeningManager: false,
            isUserManager: false,
            isChatManager: false
        }
    }

    //main management logic

    //account
    handleAccountCenter = () => {
        this.state.isGrammarManager = false;
        this.state.isAccountCenter = true;
        this.setState(this.state);
    }

    //grammar
    handleGrammarManager = () => {
        this.state.isAccountCenter = false;
        this.state.isGrammarManager = true;
        this.setState(this.state);
    }

    //vocabulary
    handleVocabularyManager = () => {
        this.setState({
        });
    }

    //listening
    handleListeningManager = () => {

    }

    //user
    handleUserManager = () => {

    }

    //chat
    handleChatManager = () => {

    }

    render() {
        let mainManagementComponent = <div></div>;
        if (this.state.isGrammarManager) {
            mainManagementComponent = <Admin_GrammarManagementComponent />
        }
        return (
            <div className="Admin">
                {/* Header Area */}
                <div className="Admin_Header">
                    <Header></Header>
                </div>

                <div className="Admin_Dock_Notification">
                    One of the most effective ways to improve your English Explorer a bit to find out what we do.
                </div>

                {/* Body Area */}
                <div className="Admin_Main_Port">

                    {/* Page Title */}
                    <PageTitle prevTitle="Manage" mainTitle="Your page"></PageTitle>

                    {/* User Info and Menu*/}
                    <div className="Admin_Info_Port">
                        <div className="Admin_Avatar_Port">
                            <img className="Admin_Avatar" src={this.state.info.avatarUrl} />
                        </div>
                        <div className="Admin_User_Name_Gmail_Port">
                            <div className="Admin_User_Name">{this.state.info.displayName}</div>
                            <div className="Admin_Gmail">{this.state.info.gmail}</div>
                            <button className="Logout_Btn">Logout</button>
                        </div>
                    </div>

                    {/* Menu Main Port to show what will be manage*/}
                    <div className="Admin_Horizontal_Menu_Bar_Main_Management_Port">
                        {/* Menu bar */}
                        <div className="Admin_Horizontal_Menu_Bar">
                            <div className="First_Menu_Item" onClick={this.handleAccountCenter}> Account Center</div>
                            <div className="Menu_Item" onClick={this.handleGrammarManager}>Grammar Manager</div>
                            <div className="Menu_Item" onClick={this.handleVocabularyManager}>Vocabulary Manager</div>
                            <div className="Menu_Item" onClick={this.handleListeningManager}>Listening Manager</div>
                            <div className="Menu_Item" onClick={this.handleUserManager}>User Manager</div>
                            <div className="Menu_Item" onClick={this.handleChatManager}>Chat Manager</div>
                        </div>

                        {/* Menu_Main_Show_Port */}
                        <div className="Admin_Main_Management_Port">
                            {mainManagementComponent}
                        </div>
                    </div>
                </div>
                <div className="Admin_Footer">
                    <Footer ></Footer>
                </div>
            </div>
        );
    }
}

export default Admin;