import React, { useEffect } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ErrorIcon from '@mui/icons-material/Error';
import HelpIcon from '@mui/icons-material/Help';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
const myNotes = [
    {
        bullet: 'neutral',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet omnis asperiores, ad soluta inventore harum temporibus sit fugit officia beatae molestias saepe quisquam, ut, eius itaque cumque. Reiciendis, quas aspernatur!'
    },
    {
        bullet: 'question',
        content: 'Willpower and motivati on is not the onlyingredient you will need. A good systemthat channels your future self is importanttoo'
    },
    {
        bullet: 'claim',
        content: 'Work hard on the things that come easy'
    },
    {
        bullet: 'neutral',
        content: 'Change your habits to change your identity'
    },

]
const topics = ['Personal Development', 'Habits', 'Productivity']
const recommendation = ['Erwin', 'Mauro']

const Topics = () => {
    const [tags, setTags] = useState('');
    const [tagsData, setTagsData] = useState(topics);
    const handleKeyDown = (event) => {
        console.log('A key was pressed', event.key);
        if (event.key === 'Enter' && tags !== '') {
            let tempTags = [...tagsData];
            tempTags.push(tags);
            setTagsData(tempTags);
            setTags('')
        }
    };
    const handleTags = (event) => {
        setTags(event.target.value)
    }
    return (
        <>


            <AccordionDetails>
                {tagsData.map((item, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', gap: '8px' }}>
                            <p># {item}</p>
                        </div>
                    )
                })}
                <TextField
                    value={tags}
                    onChange={handleTags}
                    placeholder='#Write Here'
                    variant="standard"
                    sx={{ width: '100%' }}
                    onKeyDown={handleKeyDown}
                />
            </AccordionDetails>
        </>
    )

}
const Recommendation = () => {

    return (
        <>
            <AccordionDetails>
                {recommendation.map((item, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', gap: '8px', margingTop: '10px' }}>
                            <Avatar sx={{ bgcolor: 'purple', width: 24, height: 24, fontSize: 10 }}>{item[0]}</Avatar>
                            <p>{item}</p>
                        </div>
                    )
                })}
            </AccordionDetails>
        </>
    )

}
const MyNotes = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [indexOfBullet, setIndexOfBullet] = useState(0);
    const [notesData, setNotesData] = useState(myNotes);
    const open = Boolean(anchorEl);
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
    const dynamicBulletHandler = (option) => {
        switch (option) {
            case 'neutral':
                return (<CircleIcon sx={{
                    color: '#FF6600', width: 22,
                    height: 22,
                }} />);

            case 'question':
                return (<HelpIcon sx={{
                    color: '#FF6600', width: 22,
                    height: 22,
                }} />)
            case 'claim':
                return (<ErrorIcon sx={{
                    color: '#FF6600', width: 22,
                    height: 22,
                }} />)

        }

    }
    const handleNotesChange = (event, i) => {
        const tempNotes = JSON.parse(JSON.stringify(notesData));
        tempNotes[i].content = ''
        tempNotes[i].content += event.target.value;
        setNotesData(tempNotes);
    }
    return (
        <>
            <AccordionDetails>
                {notesData.map((item, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', gap: '8px', margin: '15px 0', }}>
                            <span id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(e) => { handleClick(e); setIndexOfBullet(index) }}
                                style={{ height: 'fit-content' }}>{dynamicBulletHandler(item.bullet)}</span>

                            <TextField
                                multiline
                                value={item.content}
                                onChange={(e) => handleNotesChange(e, index)}
                                variant="standard"
                                sx={{ width: '100%' }}
                            />
                        </div>
                    )
                })}
            </AccordionDetails>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose('neutral')}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleClose('neutral')}><CircleIcon sx={{
                    color: '#FF6600', width: 22,
                    height: 22,
                }} /> Neutral bullet</MenuItem>
                <MenuItem onClick={() => handleClose('question')}><HelpIcon sx={{
                    color: '#FF6600', width: 22,
                    height: 22,
                }} /> Question</MenuItem>
                <MenuItem onClick={() => handleClose('claim')}><ErrorIcon sx={{
                    color: '#FF6600', width: 22,
                    height: 22,
                }} /> Claim/Answer</MenuItem>
            </Menu>
        </>
    )

}

export default function LibraryAccordian() {
    return (
        <div>
            {/* //Mynotes */}
            <Accordion elevation={0} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    MY NOTES
                </AccordionSummary>
                <MyNotes />
            </Accordion>

            {/* //Topic */}
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    TOPICS
                </AccordionSummary>
                <Topics />
            </Accordion>

            {/* //Recommendation */}
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    RECOMMENDED BY
                </AccordionSummary>
                <Recommendation />
            </Accordion>

            {/* //Graphs */}
            <Accordion elevation={0}>
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
    )
}

export function IdeaCardAccordian() {
    return (
        <div>
            {/* //Mynotes */}
            <Accordion elevation={0} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    MY NOTES
                </AccordionSummary>
                <MyNotes />
            </Accordion>

            {/* //Topic */}
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    TOPICS
                </AccordionSummary>
                <Topics />
            </Accordion>

            {/* //LINKED HIGHLIGHTS */}
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    LINKED HIGHLIGHTS
                </AccordionSummary>
                <Recommendation />
            </Accordion>

            {/* //BOOK STRUCTURE */}
            <Accordion elevation={0}>
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
            <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    LINK STRUCTURE

                </AccordionSummary>
                <AccordionDetails>
                    <p>to be done later</p>
                </AccordionDetails>
            </Accordion>

        </div>
    )
}