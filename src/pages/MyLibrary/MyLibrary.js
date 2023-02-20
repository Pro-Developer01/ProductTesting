import React from 'react'
import { useState } from 'react';

import './MyLibrary.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Rating from '@mui/material/Rating';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import LibraryAccordian from '../../components/AccordianCollections/AccordianCollections';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#FF6600',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#FF6600',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#FF6600',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#FF6600',
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
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

const steps = [
    'Read',
    'Highlights',
    'Idea Cards',
];
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

export default function MyLibrary() {
    const [data, setData] = useState(booksData)
    const socialToggleHandler = (index) => {
        let tempData = JSON.parse(JSON.stringify(data));
        tempData[index].state = !tempData[index].state;
        setData(tempData)
    }
    return (
        <div className='feedParentContainer'>
            <div className="breadcumContainer">
            > > > >
            </div>
            <div className='feedBoxLayout'>
                {data.map((item, i) => {
                    return (
                        <div className='libraryListsContainer'>
                            <Accordion rounded>
                                <AccordionSummary
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    sx={{ borderBottom: '1px Solid Grey' }}
                                >
                                    <div
                                        key={item.id}
                                        className='libraryLists'
                                        onClick={() => socialToggleHandler(i)}
                                    >
                                        <div>

                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className='libraryListsImg'
                                            />
                                            <div className="rating">
                                                <Rating name="read-only" value={4} readOnly />
                                            </div>

                                        </div>
                                        <div>
                                            {/* //CardHeaderTitle */}
                                            <div className="">
                                                {/* <Tooltip title={item.title} arrow> */}
                                                <h3 className="">{item.title}</h3>
                                                {/* </Tooltip> */}
                                                <span className="">By {item.author}</span>

                                            </div>

                                            {/* //Timline */}
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '9px' }}>
                                                        <div className="dots"><div class="container">
                                                            <div class="dot-typing"></div>
                                                        </div></div>
                                                        <div className="dots"><div class="container">
                                                            <div class="dot-typing"></div>
                                                        </div></div>
                                                        <div className="dots"><div class="container">
                                                            <div class="dot-typing"></div>
                                                        </div></div>
                                                    </div>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
                                                            {steps.map((label) => (
                                                                <Step key={label}>
                                                                    <StepLabel StepIconComponent={QontoStepIcon} sx={{ margin: 0 }}>{label}</StepLabel>
                                                                </Step>
                                                            ))}
                                                        </Stepper>
                                                    </Box>
                                                </div>
                                                <div className="fetchStatusIconContainer">
                                                    {/* <CachedIcon style={{color:'#FF6600'}}  /> */}
                                                    <CircularProgress style={{ color: '#FF6600', width: '22px', height: '22px' }} />
                                                </div>
                                            </div>

                                            {/* //SocialButtons */}
                                            {item.state && <div className="reactionButtonsContainer">
                                                <div className="socialButtons">
                                                    <Stack direction='row' spacing={3} >
                                                        <FavoriteBorder />
                                                        <ChatBubbleOutline />
                                                        <ShareIcon />
                                                    </Stack>
                                                </div>
                                                <div className="bookmarkButtons">
                                                    <Stack direction='row' spacing={3}>
                                                        <BookmarkBorderIcon />
                                                        <MoreVertIcon />
                                                    </Stack>
                                                </div>
                                            </div>}
                                        </div>

                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <div className="otherAccordians">
                                        <LibraryAccordian />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>


                    )
                })}
            </div>
        </div>
    )
}
