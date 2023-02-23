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
import VpnKeySharpIcon from '@mui/icons-material/VpnKeySharp';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import HeightIcon from '@mui/icons-material/Height';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


const iconStyling = {
    color: '#FF6600', width: 22,
    height: 22,
}
const MyNotesTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    color: 'red !important',
    '& .MuiInputBase': {
        padding: 0,
    },
    '& .MuiInputBase-input': {
        fontFamily: 'Gaegu, cursive',
        fontSize: '21px',
        fontWeight: 600,
    }
}));
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
const linksInfo = [{
    bullet: 'up',
    content: 'Plateau of latent Potential'
},
{
    bullet: 'down',
    content: 'Plateau of latent Potential'
},
{
    bullet: 'horizontal',
    content: 'Plateau of latent Potential'
},
]
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
    const handleDelete = () => {
        console.log('willdo it latre')
    }
    return (
        <>
            <AccordionDetails>
                {tagsData.map((item, index) => {
                    return (
                        <div style={{ margin: '3px 0' }}>
                            <Chip key={index} sx={{ fontWeight: 600 }} label={`# ${item}`} onDelete={handleDelete} />
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
const LinkStructure = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [link, setLink] = useState('');
    const [indexOfBullet, setIndexOfBullet] = useState(0);
    const [linkData, setLinkData] = useState(linksInfo);
    const open = Boolean(anchorEl);
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
        console.log('A key was pressed', event.key);
        if (event.key === 'Enter' && link !== '') {
            let tempTags = JSON.parse(JSON.stringify(linkData))
            let newObj = {
                bullet: 'horizontal',
                content: link
            }
            tempTags.push(newObj);
            setLinkData(tempTags);
            setLink('')
            console.log('tempTags', tempTags);
        }
    };
    const handleTags = (event) => {
        setLink(event.target.value)
    }
    const dynamicBulletHandler = (option) => {
        switch (option) {
            case 'up':
                return (<UpgradeIcon sx={{
                    backgroundColor: 'grey', borderRadius: '33px', color: 'white', width: 19,
                    height: 19,
                }} />);

            case 'down':
                return (<UpgradeIcon sx={{
                    backgroundColor: 'grey', borderRadius: '33px', color: 'white', width: 19,
                    height: 19, transform: 'rotateZ(180deg)'
                }} />)
            case 'horizontal':
                return (<HeightIcon sx={{
                    backgroundColor: 'grey', borderRadius: '33px', color: 'white', width: 19,
                    height: 19, transform: 'rotateZ(90deg)'
                }} />)

        }

    }
    return (
        <>
            <AccordionDetails>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2.7px' }}>
                    {dynamicBulletHandler('horizontal')} &nbsp;
                    <VpnKeySharpIcon fontSize="small" sx={{
                        backgroundColor: '#FF6600', borderRadius: '33px', color: 'white', width: 19,
                        height: 19, padding: '3px'
                    }} />
                    <TextField
                        value={link}
                        onChange={handleTags}
                        placeholder='Write here'
                        variant="standard"
                        sx={{ width: '186px', marginLeft: '5px' }}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {linkData.map((item, index) => {
                    return (
                        <div key={index} style={{
                            display: 'flex', gap: '8px', alignItems: 'center', margin: '3px 0px'
                        }}>
                            <span id="linkStructureButton"
                                aria-controls={open ? 'linkStructureMenu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(e) => { handleClick(e); setIndexOfBullet(index) }}
                                style={{ height: 'fit-content' }}>{dynamicBulletHandler(item.bullet)}</span>

                            <VpnKeySharpIcon fontSize="small" sx={{
                                backgroundColor: '#FF6600', borderRadius: '33px', color: 'white', width: 19,
                                height: 19, padding: '3px'
                            }} />
                            <p style={{ fontWeight: 600 }}> {item.content}</p>
                        </div>
                    )
                })}

            </AccordionDetails>
            <Menu
                id="linkStructureMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose('up')}
                MenuListProps={{
                    'aria-labelledby': 'linkStructureButton',
                }}
            >
                <MenuItem onClick={() => handleClose('up')}><UpgradeIcon sx={{
                    backgroundColor: 'grey', borderRadius: '33px', color: 'white', width: 19,
                    height: 19,
                }} />&nbsp; Neutral Link</MenuItem>
                <MenuItem onClick={() => handleClose('down')}><UpgradeIcon sx={{
                    backgroundColor: 'grey', borderRadius: '33px', color: 'white', width: 19,
                    height: 19, transform: 'rotateZ(180deg)'
                }} />&nbsp; Child link</MenuItem>
                <MenuItem onClick={() => handleClose('horizontal')}><HeightIcon sx={{
                    backgroundColor: 'grey', borderRadius: '33px', color: 'white', width: 19,
                    height: 19, transform: 'rotateZ(90deg)'
                }} />&nbsp; Parent link</MenuItem>
            </Menu>
        </>
    )

}
const Recommendation = () => {

    return (
        <>
            <AccordionDetails>
                {recommendation.map((item, index) => {
                    return (
                        <div key={index} style={{ margin: '5px 0' }}>

                            <Chip
                                avatar={<Avatar sx={{
                                    bgcolor: 'purple', width: 24, height: 24, fontSize: 10, color: 'white !important'
                                }}>{item[0]}</Avatar>}
                                label={item}
                                sx={{ fontWeight: 600 }}
                                variant="outlined"
                            />
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
                                style={{ height: 'fit-content', padding: '5px 0' }}>{dynamicBulletHandler(item.bullet)}</span>

                            <MyNotesTextField
                                multiline
                                value={item.content}
                                onChange={(e) => handleNotesChange(e, index)}
                                variant="standard"
                            // sx={{ width: '100%' }}
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
                <MenuItem onClick={() => handleClose('neutral')}><CircleIcon sx={iconStyling} />&nbsp; Neutral bullet</MenuItem>
                <MenuItem onClick={() => handleClose('question')}><HelpIcon sx={iconStyling} />&nbsp; Question</MenuItem>
                <MenuItem onClick={() => handleClose('claim')}><ErrorIcon sx={iconStyling} />&nbsp; Claim/Answer</MenuItem>
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
                <LinkStructure />
            </Accordion>

        </div>
    )
}