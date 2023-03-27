import React, { useEffect } from "react";
import { useState } from "react";

import "./MyLibrary.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Rating from "@mui/material/Rating";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import LibraryAccordian from "../../components/AccordianCollections/AccordianCollections";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PortraitIcon from "@mui/icons-material/Portrait";
import CircularLoading from "../../Assets/circularLoadingANI/CircularLoading";
import LinearDotsLoading from "../../Assets/LinearDotsLoading/LinearDotsLoading";
import axios from "axios";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import loginAuths from "../../helperFunctions/logingFunction";
import SuggestedView from "../../components/SuggestedView/SuggestedView";
import { apiRoot } from "../../helperFunctions/apiRoot";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#FF6600",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#FF6600",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#FF6600",
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#FF6600",
        zIndex: 1,
        fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: "currentColor",
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <CheckCircleIcon className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};
const stepLabelStyling = {
    margin: 0,
    "& .MuiStepLabel-labelContainer": {
        position: "absolute",
        top: "-36px",
    },
};

const AccordionSummaryCustom = styled((props) => (
    <MuiAccordionSummary {...props} />
))(({ theme }) => ({
    "& .MuiAccordionSummary-content": {
        margin: 0,
    },
    "&& .Mui-expanded": {
        margin: 0,
        marginBottom: "23px",
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
    },
}));

const steps = ["Read", "Highlights", "Idea Cards"];
let booksData = [
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
    {
        title: "Hooked: How to Build Habit-Forming Products",
        author: "Unknown",
        img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
        id: "38383",
        state: false,
        index: 1,
    },
];
const titleStyle = {
    width: "359px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};
const socialButtonsStyle = { color: "darkgrey" };

const BookViewCard = ({ item, index, socialToggleHandler }) => {
    const [loadingFullData, setLoadingFullData] = useState(false);
    const [stepperCount, setStepperCount] = useState(-1);
    const [metaData, setMetaData] = useState([]);

    const cardClickHandler = (e, index, title, state) => {
        socialToggleHandler(index, title);
    };
    const timelineSpanStyle = {
        width: "119.666px",
    };
    const fetchFullData = (event, bookId) => {
        event.stopPropagation();
        setLoadingFullData(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        axios
            .get(
                `${apiRoot.endpoint}/api/library/metadata?title=&asin=&author=&book_id=${bookId}&user_id=${userId}`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then((res) => {
                console.log("fullData, ", res.data.data);
                console.log("fullData, ", res.data.data[0].progress);
                setMetaData(res.data.data);
                setLoadingFullData(false);
                setStepperCount(3);
            })
            .catch((err) => {
                console.log("err", err);
            });
    };
    const suggestedViewContainer = {
        position: "absolute",
        top: "0px",
        right: "-229px",
    };
    return (
        <>
            <div key={item.id} className="libraryListsContainer">
                <Accordion
                    elevation={0}
                    sx={{
                        border: "1px solid var(--borderColors)",
                        padding: "7px",
                        borderRadius: "12px !important",
                    }}
                    rounded
                >
                    <AccordionSummaryCustom
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ padding: 0 }}
                    >
                        <div
                            className="libraryLists"
                            onClick={(e) => {
                                cardClickHandler(e, index, item.title, item.state);
                            }}
                        >
                            <Stack direction="row" spacing={2}>
                                <div>
                                    <img
                                        src={item.img_path}
                                        alt={item.title}
                                        className="libraryListsImg"
                                    />
                                    <div className="rating">
                                        <Rating
                                            name="read-only"
                                            sx={{ color: "#FF6600" }}
                                            value={item.rating}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <Stack direction="column" justifyContent="space-between">
                                    {/* //CardHeaderTitle */}
                                    <div className="">
                                        {/* <Tooltip title={item.title} arrow> */}
                                        <Stack
                                            direction="row"
                                            justifyContent="left"
                                            alignItems="center"
                                            spacing={1}
                                            mb={1}
                                        >
                                            {" "}
                                            <PortraitIcon
                                                sx={{ fontSize: "14px", color: "lightslategrey" }}
                                            />
                                            <span
                                                style={{
                                                    fontSize: "12px",
                                                    color: "lightslategrey",
                                                }}
                                            >
                                                Shared By: <b>Mauro Guerini</b>{" "}
                                            </span>
                                        </Stack>
                                        <h3 style={titleStyle}>{item.title}</h3>
                                        {/* </Tooltip> */}
                                        <span className="">By {item.author}</span>
                                    </div>

                                    {/* //Timline */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "12px",
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <Box sx={{ width: "100%", marginTop: "32px" }}>
                                                <Stepper
                                                    alternativeLabel
                                                    activeStep={stepperCount}
                                                    connector={<QontoConnector />}
                                                >
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel
                                                                StepIconComponent={QontoStepIcon}
                                                                sx={stepLabelStyling}
                                                            >
                                                                {label}
                                                            </StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </Box>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-around",
                                                    textAlign: "center",
                                                    // marginTop: "16px",
                                                }}
                                            >
                                                {!metaData?.length ? (
                                                    loadingFullData ? (
                                                        <>
                                                            <LinearDotsLoading />
                                                            <LinearDotsLoading />
                                                            <LinearDotsLoading />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>...</span>
                                                            <span>...</span>
                                                            <span>...</span>
                                                        </>
                                                    )
                                                ) : (
                                                    <>
                                                        <span style={timelineSpanStyle}>
                                                            {metaData[0].progress
                                                                ? `${metaData[0].progress}%`
                                                                : "0%"}
                                                        </span>
                                                        <span style={timelineSpanStyle}>
                                                            {metaData[0].h_progress
                                                                ? `${metaData[0].h_progress}%`
                                                                : "0%"}
                                                        </span>
                                                        <span style={timelineSpanStyle}>
                                                            {metaData[0].idea?.length
                                                                ? `${metaData[0].idea?.length}%`
                                                                : "0"}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Stack>
                            </Stack>
                            <div className="fetchStatusIconContainer">
                                {loadingFullData ? (
                                    <CircularLoading />
                                ) : metaData.length ? (
                                    <PublishedWithChangesIcon sx={{ color: "lightgreen" }} />
                                ) : (
                                    <AutorenewIcon
                                        sx={{ color: "var(--primaryColor)" }}
                                        onClick={(e) => fetchFullData(e, item._id)}
                                    />
                                )}
                            </div>
                        </div>
                        {/* //SocialButtons */}

                        {item.state && (
                            <>
                                <div
                                    className="reactionButtonsContainer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <div className="socialButtons">
                                        <Stack direction="row" spacing={3}>
                                            <FavoriteBorder sx={{ color: "#FF6600" }} />
                                            <ChatBubbleOutline sx={socialButtonsStyle} />
                                            <ShareIcon sx={socialButtonsStyle} />
                                        </Stack>
                                    </div>
                                    <div className="bookmarkButtons">
                                        <Stack direction="row" spacing={3}>
                                            <BookmarkBorderIcon sx={socialButtonsStyle} />
                                            <MoreVertIcon sx={socialButtonsStyle} />
                                        </Stack>
                                    </div>
                                </div>
                            </>
                        )}
                    </AccordionSummaryCustom>
                    {metaData.length ? (
                        <AccordionDetails
                            sx={{
                                borderTop: "1px Solid var(--borderColors)",
                                color: "var(--fontColor)",
                            }}
                        >
                            <div className="otherAccordians">
                                <LibraryAccordian metaData={metaData} />
                            </div>
                        </AccordionDetails>
                    ) : null}
                </Accordion>
                {item.state && (
                    <div style={suggestedViewContainer}>
                        <SuggestedView bookId={item._id} userId={item.user_id} />
                    </div>
                )}
            </div>
        </>
    );
};

export default function MyLibrary() {
    // const [data, setData] = useState([]);
    const [data, setData] = useState(booksData);
    const currentLocation = window.location.pathname;
    const [breadcrumbs, setBreadcrumbs] = useState([
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href={currentLocation}
            onClick={handleClick}
        >
            <Chip
                avatar={<LibraryBooksIcon />}
                sx={{ fontWeight: 600 }}
                label={currentLocation.substring(1)}
            />
        </Link>,
    ]);
    const socialToggleHandler = (index, title) => {
        let tempData = JSON.parse(JSON.stringify(data));
        tempData[index].state = !tempData[index].state;
        setData(tempData);
        // breadcumAddition(title);
    };
    const fetchLibraryData = () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log("token, userId", token, userId);

        axios
            .get(`${apiRoot.endpoint}/api/library/fetch?user_id=${userId}`, {
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    authorization: token,
                },
            })
            .then((res) => {
                console.log("res, ", res.data.data);
                const datax = res.data.data;
                console.log("datax, ", datax);
                setData(datax);
            })
            .catch((err) => {
                console.log("err", err);
                loginAuths();
                setTimeout(() => {
                    alert("Token or UserId is Invalid Please Reload!");
                }, 4000);
            });
    };

    const breadcumAddition = (title) => {
        let template = <Typography key="2">{title}</Typography>;
        let tempData = [...breadcrumbs];
        tempData.push(template);
        setBreadcrumbs(tempData);
    };

    function handleClick(event) {
        event.preventDefault();
        console.info("You clicked a breadcrumb.");
        console.info(window.location.pathname);
    }
    useEffect(() => {
        fetchLibraryData();
    }, []);

    return (
        <div className="feedParentContainer">
            <div className="breadcumContainer">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <div className="feedBoxLayout">
                {!data.length ? (
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{ height: "100vh" }}
                    >
                        <CircularProgress sx={{ color: "var(--primaryColor)" }} />
                    </Stack>
                ) : (
                    data.map((item, i) => {
                        return (
                            <BookViewCard
                                item={item}
                                index={i}
                                socialToggleHandler={socialToggleHandler}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
