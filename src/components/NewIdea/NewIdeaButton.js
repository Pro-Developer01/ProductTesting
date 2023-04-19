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
    const clickHandler = (type) => {
        console.log(type, type === 'Create idea');
        if (type === 'Create idea') {
            setOpen(true)
        }
        else if (type === 'Identify idea') {
            dispatch(updateIdeacardData(dummyData))
        }
    }
    return (
        <>
            <button
                className="link IdeaOptions"
                // id={isOpen ? "active" : "activeCollapsible"}
                // id= "IdeaOptions"
                onClick={() => clickHandler(text)}
            >
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
                    <span className="material-symbols-outlined">{icon}</span>
                </AnimatePresence>
            </button>

            <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
                <div>
                    <h1>helllo</h1>
                    <CreateIdeaCardPage />
                </div>
            </Drawer>
        </>
    );
};
