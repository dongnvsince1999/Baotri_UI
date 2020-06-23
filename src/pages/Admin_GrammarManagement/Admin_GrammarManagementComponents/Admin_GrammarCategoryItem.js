import React, { Component } from 'react';
import "./Admin_GrammarCategoryItem.css"
import Admin_GrammarCategoryListItem from "./Admin_GrammarCategoryListItem.js"
import edit_btn from "../../../resources/edit_btn.png"
import delete_btn from "../../../resources/delete_btn.png"
import Popup from 'reactjs-popup'

//Sua, xoa mot grammar category - Them mot grammar content summary
class Admin_GrammarCategoryItem extends Component {

    constructor(props) {
        super(props);
        this.notifyContent = "";
        this.state = {
            GrammarCategory_UpdateDTO: {
                "id": "",
                "title": "",
                "description": "",
                "docGrammarContentSummary": [
                    {
                        "grammarID": "",
                        "grammarTitle": "",
                        "grammarDescription": ""
                    }
                ]
            },
            GrammarContentSummary_CreateDTO: {
                "grammarID": null,
                "grammarTitle": "",
                "grammarDescription": "",
            },
            "isUpdateGrammarCategoryPopupOpen": false,
            "isVerifyDeleteGrammarCategoryPopupOpen": false,
            "isAddGrammarContentSummaryPopupOpen": false,
            "isNotifyPopupOpen": false
        }
    }

    //set data from parent
    componentDidMount() {
        this.state.GrammarCategory_UpdateDTO = this.props.item;
        this.setState(this.state);
    }

    // PUT data to server: create an grammar category
    changeUpdateGrammarCategoryTitleHandler = e => {
        this.state.GrammarCategory_UpdateDTO.title = e.target.value;
        console.log(this.state.GrammarCategory_UpdateDTO);
    }

    changeUpdateGrammarCategoryDescriptionHandler = e => {
        this.state.GrammarCategory_UpdateDTO.description = e.target.value;
        console.log(this.state.GrammarCategory_UpdateDTO);
    }

    //PUT Grammar Category Item
    updateGrammarCategory = e => {
        e.preventDefault();
        let token = sessionStorage.getItem('token');
        console.log(this.state.GrammarCategory_UpdateDTO);
        fetch('/api/v1/grammarCategories/' + this.state.GrammarCategory_UpdateDTO.id,
            {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(this.state.GrammarCategory_UpdateDTO)
            }
        )
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.notifyContent = "Update grammar category success!";
                    this.openNotifyPopupHandler();
                }
                else {
                    this.notifyContent = "Update grammar category failed!";
                    this.openNotifyPopupHandler();
                }

            })
            .catch(error => {
                console.log(error);
            })
    }

    //DELETE the post
    deleteGrammarCategoryHandler = e => {
        e.preventDefault();
        // console.log(this.props.item.id);
        let token = sessionStorage.getItem('token');

        fetch('/api/v1/grammarCategories/' + this.state.GrammarCategory_UpdateDTO.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
            .then(response => {
                console.log(response);
                if (response.status === 200 || response.status === 204) {
                    this.notifyContent = "Delete grammar category success!";
                    this.openNotifyPopupHandler();
                }
                else {
                    this.notifyContent = "Delete grammar category failed!";
                    this.openNotifyPopupHandler();
                }
            })
            .catch(error => {
                console.log(error);
            })

        this.closeVerifyDeleteGrammarCategoryPopup();
        //delete xong có làm gì không thì không biết, đằng nào cũng delete xong đâu :D
    }

    //POST Grammar Content Summary // bug
    addGrammarContentSummary = e => {
        e.preventDefault();
        // console.log(this.props.item.id);
        let token = sessionStorage.getItem('token');
        this.state.GrammarContentSummary_CreateDTO.categoryID = this.props.item.id;
        console.log(this.state.GrammarContentSummary_CreateDTO);
        fetch('/api/v1/grammarCategories/' + this.props.item.id + '/grammar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(this.state.GrammarContentSummary_CreateDTO)
        })
            .then(response => {
                console.log(response);
                if (response.status === 200 || response.status === 204) {
                    this.notifyContent = "Add grammar content summary success!";
                    this.openNotifyPopupHandler();
                }
                else {
                    this.notifyContent = "Add grammar content summary failed!";
                    this.openNotifyPopupHandler();
                }
            })
            .catch(error => {
                console.log(error);
            })

        this.closeAddGrammarContentSummaryPopup();
    }


    render() {
        //
        let title = this.state.GrammarCategory_UpdateDTO.title;
        let description = this.state.GrammarCategory_UpdateDTO.description;

        //render grammar summary contents
        let grammarItemLists = this.state.GrammarCategory_UpdateDTO.docGrammarContentSummary.map(contentSummary =>
            <Admin_GrammarCategoryListItem key={contentSummary.grammarID} parent_ID={this.state.GrammarCategory_UpdateDTO.id} item={contentSummary}></Admin_GrammarCategoryListItem>
        )

        return (
            <div className="Admin_Grammar_Category_Item">
                <div className="Admin_Grammar_Category_Item_Name_Manage_Port">
                    <div className="Admin_Grammar_Category_Item_Name">
                        {this.props.item.title}
                        <div className="Description_Tooltip_Text">{this.props.item.description}</div>
                    </div>
                    <div className="Edit_Delete_Btn_Group">

                        {/* Popup for Updating Grammar Category */}

                        <Popup modal trigger={
                            <img className="Edit_Btn" src={edit_btn} />}
                            open={this.state.isUpdateGrammarCategoryPopupOpen}
                            onOpen={this.openUpdateGrammarCategoryPopupHandler}
                            closeOnDocumentClick={false}
                        >
                            <React.Fragment>
                                <div className="Customize_Popup">
                                    <div className="Popup_Title_Bar">
                                        <div className="Popup_Title">UPDATE GRAMMAR CATEGORY:</div>
                                        <img className="Delete_Btn" src={delete_btn} onClick={this.closeUpdateGrammarCategoryPopupHandler} />
                                    </div>
                                </div>
                                <form className="Popup_Form_Max_Size" onSubmit={this.updateGrammarCategory} >

                                    <div className="Simple_Label">Title:</div>
                                    <input className="Simple_Changable_Text_Input" defaultValue={title} name={title} type="text" onChange={this.changeUpdateGrammarCategoryTitleHandler} />
                                    <div className="Simple_Label">Description:</div>
                                    <textarea className="Simple_Text_Area" defaultValue={description} name={description} onChange={this.changeUpdateGrammarCategoryDescriptionHandler} />
                                    <div className="Align_Center">
                                        <input className="Blue_Button" type="submit" value="Update" />
                                    </div>
                                </form>
                            </React.Fragment>
                        </Popup>


                        {/* Popup for Deleting Grammar Category  */}
                        <div className="Delete_Port">
                            <Popup modal trigger={
                                <img className="Delete_Btn" src={delete_btn} />}
                                open={this.state.isVerifyDeleteGrammarCategoryPopupOpen}
                                onOpen={this.openVerifyDeleteGrammarCategoryPopup}
                                closeOnDocumentClick={false}
                            >
                                <React.Fragment>
                                    <div className="Align_Center">
                                        <div className="Align_Right">
                                            <img className="Delete_Btn" src={delete_btn} onClick={this.closeVerifyDeleteGrammarCategoryPopup} />
                                        </div>
                                        <div className="Height_30px"></div>
                                        <div className="Simple_Label">  Do you want to delete this grammar category?</div>
                                        <div className="Height_30px"></div>
                                        <div className="Justify_Content_Space_Between">
                                            <button className="Blue_Button" onClick={this.deleteGrammarCategoryHandler}>
                                                Verify
                                    </button>
                                            <button className="Red_Button" onClick={this.closeVerifyDeleteGrammarCategoryPopup}>
                                                Cancel
                                    </button>
                                        </div>
                                        <div className="Height_10px"></div>
                                    </div>
                                </React.Fragment>
                            </Popup>
                        </div>
                    </div>
                </div >

                {/* for showing all Grammar Content Summary */}
                {grammarItemLists}

                {/* for Adding Grammar Content Summary*/}
                <div className="Admin_Add_Grammar_Category_List_Item">

                    {/* Popup to fill info of new Grammar category: title, description */}
                    <Popup modal trigger={
                        <div className="Admin_Add_Grammar_Category_List_Item_Name">+ Add Grammar Lesson</div>
                    }
                        open={this.state.isAddGrammarContentSummaryPopupOpen}
                        onOpen={this.openAddGrammarContentSummaryPopup}
                        closeOnDocumentClick={false}
                    >
                        <React.Fragment>
                            <div className="Customize_Popup">
                                <div className="Popup_Title_Bar">
                                    <div className="Popup_Title">ADD A GRAMMAR LESSON:</div>
                                    <img className="Delete_Btn" src={delete_btn} onClick={this.closeAddGrammarContentSummaryPopup} />
                                </div>
                            </div>
                            <form className="Popup_Form_Max_Size" onSubmit={this.addGrammarContentSummary} >
                                <div className="Simple_Label">Title:</div>
                                <input className="Simple_Changable_Text_Input" name='title' type="text" onChange={this.changeAddGrammarContentSummaryTitleHandler} />
                                <div className="Simple_Label">Description:</div>
                                <textarea className="Simple_Text_Area" name='description' onChange={this.changeAddGrammarContentSummaryDescriptionHandler} />
                                <div className="Align_Center">
                                    <input className="Blue_Button" type="submit" value="Save"></input>
                                </div>
                            </form>
                        </React.Fragment>
                    </Popup>
                </div>

                {/* Notify Popup */}
                <Popup modal
                    open={this.state.isNotifyPopupOpen}
                    onOpen={this.openNotifyPopup}
                    closeOnDocumentClick={false}
                >
                    <React.Fragment>
                        <Popup modal
                            open={this.state.isNotifyPopupOpen}
                            onOpen={this.openNotifyPopupHandler}
                            closeOnDocumentClick={false}
                        >
                            <div className="Align_Center">
                                <div className="Height_30px"></div>
                                <div className="Simple_Label">{this.notifyContent}</div>
                                <div className="Height_30px"></div>
                                <div className="Justify_Content_Space_Between">
                                    <button className="Blue_Button" onClick={this.closeNotifyPopupHandlerAndReload}>
                                        OK
                                </button>
                                </div>
                                <div className="Height_10px"></div>
                            </div>
                        </Popup>
                    </React.Fragment>
                </Popup>
            </div >
        );
    }

    //handler open close popup
    //handle close and open close add Grammar Category Popup:
    openUpdateGrammarCategoryPopupHandler = () => {
        this.state.isUpdateGrammarCategoryPopupOpen = true;
        this.setState(this.state);
    }

    closeUpdateGrammarCategoryPopupHandler = () => {
        this.state.isUpdateGrammarCategoryPopupOpen = false;
        this.setState(this.state);
    }

    //handle close and open close verify popup
    openVerifyDeleteGrammarCategoryPopup = () => {
        this.state.isVerifyDeleteGrammarCategoryPopupOpen = true;
        this.setState(this.state);
    }
    closeVerifyDeleteGrammarCategoryPopup = () => {
        this.state.isVerifyDeleteGrammarCategoryPopupOpen = false;
        this.setState(this.state);
    }

    //handle close and open add grammar lesson popup:
    openAddGrammarContentSummaryPopup = () => {
        this.state.isAddGrammarContentSummaryPopupOpen = true;
        this.setState(this.state);
    }
    closeAddGrammarContentSummaryPopup = () => {
        this.state.isAddGrammarContentSummaryPopupOpen = false;
        this.setState(this.state);
    }

    changeAddGrammarContentSummaryTitleHandler = e => {
        this.state.GrammarContentSummary_CreateDTO.grammarTitle = e.target.value;
        console.log(this.state.GrammarContentSummary_CreateDTO);
    }

    changeAddGrammarContentSummaryDescriptionHandler = e => {
        this.state.GrammarContentSummary_CreateDTO.grammarDescription = e.target.value;
        console.log(this.state.GrammarContentSummary_CreateDTO);
    }

    openNotifyPopupHandler = () => {
        this.state.isNotifyPopupOpen = true;
        this.setState(this.state);
    }

    closeNotifyPopupHandler = () => {
        this.state.isNotifyPopupOpen = false;
        this.setState(this.state);
    }

    closeNotifyPopupHandlerAndReload = () => {
        this.state.isNotifyPopupOpen = false;
        this.setState(this.state);
        window.location.reload();
    }

}

export default Admin_GrammarCategoryItem;