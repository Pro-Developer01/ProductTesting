import React, { useState, useEffect } from "react";
import "./NewIdea.css";
import { AnimatePresence, motion } from "framer-motion";
import Drawer from "@mui/material/Drawer";
import CreateIdeaCardPage from "../../pages/CreateIdeaCardPage/CreateIdeaCardPage";
import IdeaCardPage from "../../pages/IdeacardPage/IdeaCardPage";
import Filter from "../../pages/Filter";

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

    // console.log(open);
    return (
        <>
            <div className="NewIdeaParent">
                <div className="NewIdeaPosition">
                    {openOptions && (
                        <>
                            <IdeaOptions text={"Create idea"} icon={"tips_and_updates"} />
                            <IdeaOptions
                                text={"Identify idea"}
                                icon={"drive_file_rename_outline"}
                            />
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

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpen(open);
    };
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
    return (
        <>
            <button
                className="link IdeaOptions"
                // id={isOpen ? "active" : "activeCollapsible"}
                // id= "IdeaOptions"
                onClick={toggleDrawer("right", true)}
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

            <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
                <div>
                    <h1>helllo</h1>
                    <CreateIdeaCardPage />
                </div>
            </Drawer>
        </>
    );
};
