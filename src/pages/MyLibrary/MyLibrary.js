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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PortraitIcon from '@mui/icons-material/Portrait';
import CircularLoading from '../../Assets/circularLoadingANI/CircularLoading';
import LinearDotsLoading from '../../Assets/LinearDotsLoading/LinearDotsLoading';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

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
const stepLabelStyling = {
    margin: 0,
    '& .MuiStepLabel-labelContainer': {
        position: 'absolute',
        top: '-36px'
    }
}

const AccordionSummaryCustom = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        {...props}
    />
))(({ theme }) => ({
    '& .MuiAccordionSummary-content': {
        margin: 0,
    },
    '&& .Mui-expanded': {
        margin: 0,
        marginBottom: '23px',
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'column'

    },
}));

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
const socialButtonsStyle = { color: 'darkgrey' }
export default function MyLibrary() {
    const [data, setData] = useState(booksData)
    const currentLocation = window.location.pathname
    const [breadcrumbs, setBreadcrumbs] = useState([
        <Link underline="hover" key="1" color="inherit" href={currentLocation} onClick={handleClick}>
            <Chip avatar={<LibraryBooksIcon />} sx={{ fontWeight: 600 }} label={currentLocation.substring(1)} />
        </Link>,
    ])
    const breadcumAddition = (title) => {
        let template = (<Typography key="2" >
            {title}
        </Typography>)
        let tempData = [...breadcrumbs];
        tempData.push(template)
        setBreadcrumbs(tempData);
    }
    const socialToggleHandler = (index, title) => {
        let tempData = JSON.parse(JSON.stringify(data));
        tempData[index].state = !tempData[index].state;
        setData(tempData)

        // breadcumAddition(title);
    }

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
        console.info(window.location.pathname);

    }


    return (
        <div className='feedParentContainer'>
            <div className="breadcumContainer">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <div className='feedBoxLayout'>
                {data.map((item, i) => {
                    return (
                        <div key={item.id} className='libraryListsContainer'>
                            <Accordion elevation={0} style={{ border: '1px solid var(--borderColors)', padding: '13px', }} rounded>
                                <AccordionSummaryCustom
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ padding: 0, }}
                                >
                                    <div
                                        className='libraryLists'
                                        onClick={() => socialToggleHandler(i, item.title)}
                                    >
                                        <div>

                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className='libraryListsImg'
                                            />
                                            <div className="rating">
                                                <Rating name="read-only" sx={{ color: '#FF6600' }} value={4} readOnly />
                                            </div>

                                        </div>
                                        <Stack direction="column"
                                            justifyContent="space-between">
                                            {/* //CardHeaderTitle */}
                                            <div className="">
                                                {/* <Tooltip title={item.title} arrow> */}
                                                <Stack direction="row"
                                                    justifyContent="left" alignItems='center'
                                                    spacing={1} mb={1}> <PortraitIcon sx={{ fontSize: '14px' }} /><span style={{ fontSize: '12px' }} >Shared By: <b>Mauro Guerini</b> </span></Stack>
                                                <h3 className="">{item.title}</h3>
                                                {/* </Tooltip> */}
                                                <span className="">By {item.author}</span>

                                            </div>

                                            {/* //Timline */}
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div style={{ flex: 1 }}>

                                                    <Box sx={{ width: '100%', marginTop: '32px', }}>
                                                        <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
                                                            {steps.map((label) => (
                                                                <Step key={label}>
                                                                    <StepLabel StepIconComponent={QontoStepIcon} sx={stepLabelStyling}>{label}</StepLabel>
                                                                </Step>
                                                            ))}
                                                        </Stepper>
                                                    </Box>
                                                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
                                                        <LinearDotsLoading />
                                                        <LinearDotsLoading />
                                                        <LinearDotsLoading />
                                                    </div>
                                                </div>
                                                <div className="fetchStatusIconContainer">
                                                    < CircularLoading />
                                                </div>
                                            </div>

                                            {/* //SocialButtons */}

                                        </Stack>

                                    </div>
                                    {item.state && <div className="reactionButtonsContainer" onClick={(e) => { e.stopPropagation() }}>
                                        <div className="socialButtons">
                                            <Stack direction='row' spacing={3} >
                                                <FavoriteBorder sx={{ color: '#FF6600' }} />
                                                <ChatBubbleOutline sx={socialButtonsStyle} />
                                                <ShareIcon sx={socialButtonsStyle} />
                                            </Stack>
                                        </div>
                                        <div className="bookmarkButtons">
                                            <Stack direction='row' spacing={3}>
                                                <BookmarkBorderIcon sx={socialButtonsStyle} />
                                                <MoreVertIcon sx={socialButtonsStyle} />
                                            </Stack>
                                        </div>
                                    </div>}
                                </AccordionSummaryCustom>
                                <AccordionDetails sx={{ borderTop: '1px Solid var(--borderColors)' }}
                                >

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
