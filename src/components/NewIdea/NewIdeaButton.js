import React, { useState, useEffect } from "react";
import "./NewIdea.css";
import { AnimatePresence, motion } from "framer-motion";
import Drawer from "@mui/material/Drawer";
import CreateIdeaCardPage from "../../pages/CreateIdeaCardPage/CreateIdeaCardPage";
import IdeaCardPage from "../../pages/IdeacardPage/IdeaCardPage";
import Filter from "../../pages/Filter";
import highlightTester from "../../helperFunctions/highlightTester";
import { useSelector, useDispatch } from 'react-redux'
import { updateIdeacardData } from "../../Utils/Features/IdeacardSlice";
import {
    getLabelId
} from "../../helperFunctions/getIdeacardIcons";
import { updatePersistentDrawer } from "../../Utils/Features/persistentDrawerSlice";
import { updateIdentifyIdeaCardData } from "../../Utils/Features/IdentifyIdeaCardSlice";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};



export default function NewIdeaButton() {
    // const open = useState(false)[0]
    // const setOpen = useState(false)[1]
    const [openOptions, setopenOptions] = useState(false);
    let showIdentifyIC = highlightTester();
    const currentLocation = window.location.pathname;
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                console.log("Close");
                setopenOptions(false);
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, []);
    useEffect(() => {
        showIdentifyIC = highlightTester();
        console.log('showIdentifyIC', showIdentifyIC)
    }, [currentLocation]);

    // console.log(open);
    return (
        <>
            <div className="NewIdeaParent">
                <div className="NewIdeaPosition">
                    {openOptions && (
                        <>
                            <IdeaOptions text={"Create idea"} icon={"tips_and_updates"} />
                            {showIdentifyIC && <IdeaOptions
                                text={"Identify idea"}
                                icon={"drive_file_rename_outline"}
                            />}
                        </>
                    )}
                    {!openOptions && (
                        <div className="NewIdeaButton" onClick={() => setopenOptions(true)}>
                            <span className="material-symbols-outlined search_icon">add</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

const IdeaOptions = ({ text, icon }) => {
    const [open, setOpen] = React.useState(false);
    const [buttonState, setButtonState] = useState(null);
    const labelId = getLabelId('KEYWORDS')
    let dummyData = {
        "book_id": "630d2b9510cf9a1ca419ae5b",
        "label_id": labelId,
        "highlight_id": "345345345345",
        "title": "",
        "my_notes": [],
        "picture_link": "",
        "rating": 0,
        "tags": [],
        "level": 0,
        "start": 578072,
        "end": 578146
    };
    const dispatch = useDispatch()
    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.1,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0,
            },
        },
    };

    const handleEnter = (event) => {
        if (event.keyCode === 13 && window.getSelection().toString().length > 0) {
            const selection = window.getSelection();
            const title = selection.toString()
            const itemSelf = selection.anchorNode.parentElement
            const start = itemSelf.dataset.start;
            const book_id = itemSelf.dataset.book_id;
            const highlight_id = selection.anchorNode.parentElement.id;
            const ideacardObj = {
                book_id,
                "label_id": getLabelId('KEYWORDS'),
                highlight_id,
                title,
                start,
                "my_notes": [],
                "picture_link": "",
                "rating": 0,
                "tags": [],
                "level": 0,
                "end": null
            }
            dispatch(updateIdentifyIdeaCardData(ideacardObj));
            dispatch(updatePersistentDrawer('identify Ideacard'))
            console.log("selectedText", ideacardObj);
        }
    };
    

   const clickHandler = (type) => {
        if (type === buttonState) {
            setButtonState(null)
        }
        else {
            setButtonState(type)
        }
    }

    const setCursorClass = () => {
        const allItems = document.querySelectorAll('.highlightLi');
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.add('customCursor');
            allItems[i].children[0].children[1].classList.add('customCursor')
        }
    }

    const removeCursorClass = () => {
        const allItems = document.querySelectorAll('.highlightLi');
        for (let i = 0; i < allItems.length; i++) {
            allItems[i].classList.remove('customCursor');
            allItems[i].children[0].children[1].classList.remove('customCursor')
        }
    }

    const buttonStateHandler = () => { //this func will run after clickhandler
        if (buttonState) {
            if (buttonState === 'Create idea') {
                setOpen(true)
            }
            else if (buttonState === 'Identify idea') {
                document.addEventListener("keydown", handleEnter);
                setCursorClass();
                setOpen(false)
            }
        }
        else {
            dispatch(updatePersistentDrawer(null))
            dispatch(updateIdentifyIdeaCardData(null));
            setOpen(false)
            removeCursorClass();
            document.removeEventListener("keydown", handleEnter);
        }
    }

    const clossDoubleArrowStyle = {
        background: "var(--white)",
        borderRadius: "33px",
        border: "1px solid var(--borderColors)",
        position: "fixed",
        top: "38px",
        right: "32.8rem",
        cursor: "pointer",
        color: "var(--fontColor)",
    };
    const closeCrossButtonStyle = {
        borderRadius: "33px",
        position: "fixed",
        top: "25px",
        right: "25px",
        zIndex: 13,
        cursor: "pointer",
        color: "var(--fontColor)",
    };

    const Close = () => {
        dispatch(updatePersistentDrawer(null))
        dispatch(updateIdentifyIdeaCardData(null));
        setOpen(false); // dispatch the action when the button is clicked
      };

    useEffect(() => {
        return () => {
            console.log('removed')
            document.removeEventListener("keydown", handleEnter);
        };
    }, [])
    useEffect(() => {
        buttonStateHandler()
    }, [buttonState])

    useEffect(() => { //for create ideacard drawer only
        if (!open)
            setButtonState(open)
    }, [open])


    return (
        <>
            <button
                className="link IdeaOptions"
                // id={isOpen ? "active" : "activeCollapsible"}
                // id= "IdeaOptions"
                style={buttonState === text ? { backgroundColor: '#fc6606', color: 'white' } : null}
                onClick={() => clickHandler(text)}
            >  {buttonState === 'Identify idea' && (
                <style>
                    {`
                    ::selection {
                      background-color: #FFDAC1;
                    }
                  `}
                </style>
            )}
                <AnimatePresence>
                    <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                    >
                        {text}
                    </motion.div>
                    {text === 'Identify idea' ? <img src="../../Assets/Identify.svg" style={{ width: '27px' }} alt="newIdeaCard" /> : <span className="material-symbols-outlined">{icon}</span>}
                </AnimatePresence>
            </button>

            <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
                <div>
                    <KeyboardDoubleArrowRightIcon
                    fontSize="medium"
                    style={clossDoubleArrowStyle}
                    onClick={Close}
                    />
                   <CloseIcon
                    fontSize="medium"
                    style={closeCrossButtonStyle}
                    onClick={Close}
                    />
                    <CreateIdeaCardPage />
                </div>
            </Drawer>
        </>
    );
};
