import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ErrorIcon from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import VpnKeySharpIcon from "@mui/icons-material/VpnKeySharp";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import HeightIcon from "@mui/icons-material/Height";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import "../../pages/MyLibrary/MyLibrary.css";
import AnchorIcon from '@mui/icons-material/Anchor';
// import { ReactComponent as Identify } from "../../Assets/Identify.svg";

const iconStyling = {
    color: "#FF6600",
    width: 22,
    height: 22,
};
const anchorIconStyle = {
    backgroundColor: 'var(--primaryColor)', borderRadius: '33px', color: 'white', width: 20,
    height: 20, padding: '2px'
}
const MyNotesTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    "& .MuiInputBase": {
        padding: 0,
    },
    "& .MuiInputBase-input": {
        fontFamily: "Gaegu, cursive",
        fontSize: "21px",
        fontWeight: 600,
    },
    "& .MuiInput-underline:after": {
        border: "none",
    },
    "& .MuiInput-underline:before": {
        border: "none",
    },
    "& .MuiInput-underline:hover:before": {
        border: "none !important",
    },
}));
const myNotes = [
    {
        bullet: "neutral",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis asperiores, ad soluta inventore harum temporibus sit fugit officia beatae molestias saepe quisquam, ut, eius itaque cumque. Reiciendis, quas aspernatur!",
    },
    {
        bullet: "question",
        content:
            "Willpower and motivation is not the only ingredient you will need. A good system that channels your future self is important too",
    },
    {
        bullet: "claim",
        content: "Work hard on the things that come easy",
    },
    {
        bullet: "neutral",
        content: "Change your habits to change your identity",
    },
];
const topics = ["Personal Development", "Habits", "Productivity"];
const linksInfo = [
    {
        bullet: "up",
        content: "Plateau of latent Potential",
    },
    {
        bullet: "down",
        content: "Plateau of latent Potential",
    },
    {
        bullet: "horizontal",
        content: "Plateau of latent Potential",
    },
];
const recommendation = ["Erwin", "Mauro"];
const accordianBorder = {
    borderTop: "1px solid var(--borderColors)",
    color: "var(--fontColor)",
};
const MenuItemStyles = {
    margin: "5px 1px",
    borderRadius: "30px",
};
const MyNotes = ({ myNotesData }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [indexOfBullet, setIndexOfBullet] = useState(0);
    const [newNotes, setNewNotes] = useState("");
    const [notesData, setNotesData] = useState(myNotesData);
    const open = Boolean(anchorEl);

    const inputFeildStyle = {
        width: "100%",
        padding: "3px 0px",
        fontWeight: 600,
        border: "none",
        marginLeft: "5px",
        fontFamily: "Gaegu,cursive",
        fontSize: "21px",
        fontWeight: 600,
    };

    const notesDataValidator = () => {
        if (myNotesData?.length && typeof myNotesData[0] === "string") {
            const updatedMyNotesData = [];
            myNotesData?.forEach((item) => {
                updatedMyNotesData.push({
                    bullet: "neutral",
                    content: item,
                });
            });
            setNotesData(updatedMyNotesData);
        } else setNotesData(myNotesData);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option) => {
        setAnchorEl(null);
        // setIconOption(option);
        const tempNotes = notesData;
        tempNotes[indexOfBullet].bullet = option;
        setNotesData(tempNotes);
    };
    const handleKeyDown = (event) => {
        console.log("A key was pressed", event.key);
        if (event.key === "Enter" && newNotes !== "") {
            let tempTags = JSON.parse(JSON.stringify(notesData));
            let newObj = {
                bullet: "neutral",
                content: newNotes,
            };
            tempTags.push(newObj);
            setNotesData(tempTags);
            setNewNotes("");
            console.log("tempTags", tempTags);
        }
    };
    const handleTags = (event) => {
        setNewNotes(event.target.value);
    };
    console.log("notesData", notesData);
    const dynamicBulletHandler = (option = "neutral") => {
        switch (option) {
            case "neutral":
                return (
                    <CircleIcon
                        sx={{
                            color: "#FF6600",
                            width: 22,
                            height: 22,
                        }}
                    />
                );

            case "question":
                return (
                    <HelpIcon
                        sx={{
                            color: "#FF6600",
                            width: 22,
                            height: 22,
                        }}
                    />
                );
            case "claim":
                return (
                    <ErrorIcon
                        sx={{
                            color: "#FF6600",
                            width: 22,
                            height: 22,
                        }}
                    />
                );
        }
    };
    const handleNotesChange = (event, i) => {
        const tempNotes = JSON.parse(JSON.stringify(notesData));
        tempNotes[i].content = "";
        tempNotes[i].content += event.target.value;
        setNotesData(tempNotes);
    };
    useEffect(() => {
        notesDataValidator();
    }, [myNotesData]);
    return (
        <>
            <AccordionDetails>
                {notesData?.length ? (
                    <>
                        {notesData.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{ display: "flex", gap: "8px", marginBottom: "15px" }}
                                >
                                    <span
                                        id="basic-button"
                                        aria-controls={open ? "basic-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={(e) => {
                                            handleClick(e);
                                            setIndexOfBullet(index);
                                        }}
                                        style={{ height: "fit-content", padding: "5px 0" }}
                                    >
                                        {dynamicBulletHandler(item.bullet)}
                                    </span>

                                    <MyNotesTextField
                                        multiline
                                        value={item.content}
                                        onChange={(e) => handleNotesChange(e, index)}
                                        variant="standard"
                                    />
                                </div>
                            );
                        })}
                        <div
                            style={{ display: "flex", alignItems: "center", gap: "2.7px" }}
                        >
                            {dynamicBulletHandler("neutral")} &nbsp;
                            <input
                                type="text"
                                className="myNotesInput"
                                value={newNotes}
                                onChange={handleTags}
                                placeholder="Write here"
                                style={inputFeildStyle}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </>
                ) : (
                    <div
                        style={{ display: "flex", alignItems: "center", gap: "2.7px" }}
                    >
                        {dynamicBulletHandler("neutral")} &nbsp;
                        <input
                            type="text"
                            className="myNotesInput"
                            value={newNotes}
                            onChange={handleTags}
                            placeholder="Write here"
                            style={inputFeildStyle}
                            onKeyDown={handleKeyDown}
                        />
                        {/* <Identify /> */}

                    </div>
                )}
            </AccordionDetails>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose("neutral")}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: 28,
                }}
            >
                <MenuItem sx={MenuItemStyles} onClick={() => handleClose("neutral")}>
                    <CircleIcon sx={iconStyling} />
                    &nbsp; Neutral bullet
                </MenuItem>
                <MenuItem sx={MenuItemStyles} onClick={() => handleClose("question")}>
                    <HelpIcon sx={iconStyling} />
                    &nbsp; Question
                </MenuItem>
                <MenuItem sx={MenuItemStyles} onClick={() => handleClose("claim")}>
                    <ErrorIcon sx={iconStyling} />
                    &nbsp; Claim/Answer
                </MenuItem>
            </Menu>
        </>
    );
};
const LinkedHighlights = ({ highlightId }) => {
    return (
        <>
            <AccordionDetails>
                <div
                    style={{ display: "flex", gap: "8px", marginBottom: "15px" }}
                >
                    <span
                        style={{ height: "fit-content", padding: "5px 0" }}
                    >
                        <AnchorIcon sx={anchorIconStyle} />
                    </span>

                    <span>
                        {document.getElementById(highlightId)?.outerText}
                    </span>
                </div>
            </AccordionDetails>

        </>
    );
};
const Topics = ({ tagData }) => {
    const [tags, setTags] = useState("");
    const [tagsData, setTagsData] = useState(tagData);
    const handleKeyDown = (event) => {
        console.log("A key was pressed", event.key);
        if (event.key === "Enter" && tags !== "") {
            let tempTags = [...tagsData];
            tempTags.push(tags);
            setTagsData(tempTags);
            setTags("");
        }
    };
    const handleTags = (event) => {
        setTags(event.target.value);
    };
    const textFeildStyle = {
        background: "#EBEBEB",
        borderRadius: "33px",
        width: "127px",
        padding: " 8px 11px",
        fontWeight: 600,
        border: "none",
    };
    const handleDelete = () => {
        console.log("willdo it latre");
    };
    return (
        <>
            <AccordionDetails>
                {tagsData?.length ? (
                    <>
                        {tagsData.map((item, index) => {
                            return (
                                <div key={index} style={{ margin: "3px 0" }}>
                                    <Chip
                                        sx={{ fontWeight: 600 }}
                                        label={`# ${item}`}
                                        onDelete={handleDelete}
                                        deleteIcon={<CloseIcon />}
                                    />
                                </div>
                            );
                        })}
                        <input
                            typr="text"
                            value={tags}
                            onChange={handleTags}
                            placeholder="# Write Here"
                            style={textFeildStyle}
                            onKeyDown={handleKeyDown}
                        />
                    </>
                ) : (
                    <input
                        typr="text"
                        value={tags}
                        onChange={handleTags}
                        placeholder="# Write Here"
                        style={textFeildStyle}
                        onKeyDown={handleKeyDown}
                    />
                )}
            </AccordionDetails>
        </>
    );
};
const LinkStructure = () => {
    const [link, setLink] = useState("");
    const [indexOfBullet, setIndexOfBullet] = useState(0);
    const [linkData, setLinkData] = useState(linksInfo);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const inputFeildStyle = {
        width: "auto",
        padding: "3px 0px",
        fontWeight: 600,
        border: "none",
        marginLeft: "5px",
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (option) => {
        setAnchorEl(null);
        // setIconOption(option);
        const tempNotes = linkData;
        tempNotes[indexOfBullet].bullet = option;
        setLinkData(tempNotes);
    };
    const handleKeyDown = (event) => {
        console.log("A key was pressed", event.key);
        if (event.key === "Enter" && link !== "") {
            let tempTags = JSON.parse(JSON.stringify(linkData));
            let newObj = {
                bullet: "horizontal",
                content: link,
            };
            tempTags.push(newObj);
            setLinkData(tempTags);
            setLink("");
            console.log("tempTags", tempTags);
        }
    };
    const handleTags = (event) => {
        setLink(event.target.value);
    };
    const dynamicBulletHandler = (option) => {
        switch (option) {
            case "up":
                return (
                    <UpgradeIcon
                        sx={{
                            backgroundColor: "grey",
                            borderRadius: "33px",
                            color: "white",
                            width: 19,
                            height: 19,
                        }}
                    />
                );

            case "down":
                return (
                    <UpgradeIcon
                        sx={{
                            backgroundColor: "grey",
                            borderRadius: "33px",
                            color: "white",
                            width: 19,
                            height: 19,
                            transform: "rotateZ(180deg)",
                        }}
                    />
                );
            case "horizontal":
                return (
                    <HeightIcon
                        sx={{
                            backgroundColor: "grey",
                            borderRadius: "33px",
                            color: "white",
                            width: 19,
                            height: 19,
                            transform: "rotateZ(90deg)",
                        }}
                    />
                );
        }
    };
    return (
        <>
            <AccordionDetails>
                <div style={{ display: "flex", alignItems: "center", gap: "2.7px" }}>
                    {dynamicBulletHandler("horizontal")} &nbsp;
                    <VpnKeySharpIcon
                        fontSize="small"
                        sx={{
                            backgroundColor: "#FF6600",
                            borderRadius: "33px",
                            color: "white",
                            width: 19,
                            height: 19,
                            padding: "3px",
                        }}
                    />
                    <input
                        type="text"
                        value={link}
                        onChange={handleTags}
                        placeholder="Write here"
                        style={inputFeildStyle}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {linkData.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                                margin: "3px 0px",
                            }}
                        >
                            <span
                                id="linkStructureButton"
                                aria-controls={open ? "linkStructureMenu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => {
                                    handleClick(e);
                                    setIndexOfBullet(index);
                                }}
                                style={{ height: "fit-content" }}
                            >
                                {dynamicBulletHandler(item.bullet)}
                            </span>

                            <VpnKeySharpIcon
                                fontSize="small"
                                sx={{
                                    backgroundColor: "#FF6600",
                                    borderRadius: "33px",
                                    color: "white",
                                    width: 19,
                                    height: 19,
                                    padding: "3px",
                                }}
                            />
                            <p style={{ fontWeight: 600 }}> {item.content}</p>
                        </div>
                    );
                })}
            </AccordionDetails>
            <Menu
                id="linkStructureMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose("up")}
                MenuListProps={{
                    "aria-labelledby": "linkStructureButton",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: 28,
                }}
            >
                <MenuItem sx={MenuItemStyles} onClick={() => handleClose("horizontal")}>
                    <HeightIcon
                        sx={{
                            backgroundColor: "grey",
                            borderRadius: "33px",
                            color: "white",
                            width: 19,
                            height: 19,
                            transform: "rotateZ(90deg)",
                        }}
                    />
                    &nbsp; Neutral Link
                </MenuItem>
                <MenuItem sx={MenuItemStyles} onClick={() => handleClose("down")}>
                    <UpgradeIcon
                        sx={{
                            backgroundColor: "grey",
                            borderRadius: "33px",
                            color: "white",
                            width: 19,
                            height: 19,
                            transform: "rotateZ(180deg)",
                        }}
                    />
                    &nbsp; Child link
                </MenuItem>
                <MenuItem sx={MenuItemStyles} onClick={() => handleClose("up")}>
                    <UpgradeIcon
                        sx={{
                            backgroundColor: "grey",
                            borderRadius: "33px",
                            color: "white",
                            width: 19,
                            height: 19,
                        }}
                    />
                    &nbsp; Parent link
                </MenuItem>
            </Menu>
        </>
    );
};
const Recommendation = ({ recommendationString }) => {
    return (
        <>
            <AccordionDetails>
                {recommendationString?.length ? (
                    recommendation.map((item, index) => {
                        return (
                            <div key={index} style={{ margin: "5px 0" }}>
                                <Chip
                                    avatar={
                                        <Avatar
                                            sx={{
                                                bgcolor: "purple",
                                                width: 24,
                                                height: 24,
                                                fontSize: 10,
                                                color: "white !important",
                                            }}
                                        >
                                            {item[0]}
                                        </Avatar>
                                    }
                                    label={item}
                                    sx={{ fontWeight: 600 }}
                                    variant="outlined"
                                />
                            </div>
                        );
                    })
                ) : (
                    <span>No Data Available</span>
                )}
            </AccordionDetails>
        </>
    );
};

export default function LibraryAccordian({ metaData }) {
    return (
        <div>
            {/* //Mynotes */}
            <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ color: "var(--fontColor)" }}
                >
                    MY NOTES
                </AccordionSummary>
                <MyNotes myNotesData={metaData[0]?.my_notes} />
            </Accordion>

            {/* //Topic */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    TOPICS
                </AccordionSummary>
                <Topics tagData={metaData[0]?.tags} />
            </Accordion>

            {/* //Recommendation */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    RECOMMENDED BY
                </AccordionSummary>
                <Recommendation recommendationString={metaData[0]?.recomendation} />
            </Accordion>

            {/* //Graphs */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    GRAPH
                </AccordionSummary>
                <AccordionDetails>
                    <p>to be done later</p>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export function IdeaCardAccordian({ data }) {
    console.log("data of Ideacard", data);
    return (
        <div>
            {/* //Mynotes */}
            <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ color: "var(--fontColor)" }}
                >
                    MY NOTES
                </AccordionSummary>
                <MyNotes myNotesData={data?.own_thoughts} />
            </Accordion>

            {/* //Topic */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    TOPICS
                </AccordionSummary>
                <Topics tagData={data?.tags} />
            </Accordion>

            {/* //LINKED HIGHLIGHTS */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    RECOMMENDED BY
                </AccordionSummary>
                <Recommendation recommendationString={recommendation} />
            </Accordion>

            {/* //BOOK STRUCTURE */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    BOOK STRUCTURE
                </AccordionSummary>
                <AccordionDetails>
                    <p>to be done later</p>
                </AccordionDetails>
            </Accordion>

            {/* //LINK STRUCTURE */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    LINK STRUCTURE
                </AccordionSummary>
                <LinkStructure />
            </Accordion>
        </div>
    );
}
export function CreateIdeaCardAccordian({ data }) {
    // console.log("data of Ideacard", data);
    return (
        <div>
            {/* //Mynotes */}
            <Accordion elevation={0} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ color: "var(--fontColor)" }}
                >
                    MY NOTES
                </AccordionSummary>
                <MyNotes myNotesData={data?.my_notes} />
            </Accordion>
            {/* //LINKED HIGHLIGHTS */}
            {data?.highlight_id && <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    LINKED HIGHLIGHTS
                </AccordionSummary>
                <LinkedHighlights highlightId={data?.highlight_id} />
            </Accordion>}
            {/* //Topic */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    TOPICS
                </AccordionSummary>
                <Topics tagData={data?.tags} />
            </Accordion>



            {/* //BOOK STRUCTURE */}
            {data?.highlight_id && <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    BOOK STRUCTURE
                </AccordionSummary>
                <AccordionDetails>
                    <p>to be done later</p>
                </AccordionDetails>
            </Accordion>}

            {/* //LINK STRUCTURE */}
            <Accordion elevation={0} sx={accordianBorder} defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    LINK STRUCTURE
                </AccordionSummary>
                <LinkStructure />
            </Accordion>
        </div>
    );
}
