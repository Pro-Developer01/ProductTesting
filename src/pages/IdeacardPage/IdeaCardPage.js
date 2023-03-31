import React from "react";
import { useState } from "react";
import "../MyLibrary/MyLibrary.css";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import { IdeaCardAccordian } from "../../components/AccordianCollections/AccordianCollections";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PortraitIcon from '@mui/icons-material/Portrait';
import { dynamicBulletHandler } from "../../helperFunctions/getIdeacardIcons";



let booksData = [
  {
    title: "Committment device",
    img: "https://pbs.twimg.com/media/CM27-Z3UsAA7M5G.jpg",
    bullet: "KEYWORDS",
    id: "38383",
    state: false,
    index: 1,
  },
  {
    title:
      "A traditional portrait often depicts the subject looking at the camera. Classic portrait photography is posed. It helps people look their best. Usually, photographers shoot conventional portraits in a studio with a formal photography backdrop.",
    img: "https://expertphotography.b-cdn.net/wp-content/uploads/2019/02/Types-Of-Portrait-Photography-BW.jpg",
    bullet: "MAIN CLAIMS",
    id: "38385",
    state: false,
    index: 1,
  },
];
const MenuItemStyles = {
  margin: '5px 1px',
  borderRadius: '30px'
}

const socialButtonsStyle = { color: 'darkgrey' }
const AccordionSummaryCustom = styled((props) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
  '&& .Mui-expanded': {
    margin: 0,
    marginBottom: '23px'

  },
}));

export default function IdeaCardPage() {
  const [data, setData] = useState(booksData);
  const currentLocation = window.location.pathname
  const [indexOfBullet, setIndexOfBullet] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState([
    <Link underline="hover" key="1" color="inherit" href={currentLocation} onClick={() => { }}>
      <Chip avatar={<TipsAndUpdatesIcon />} sx={{ fontWeight: 600 }} label={currentLocation.substring(1)} />
    </Link>,
  ])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const socialToggleHandler = (index) => {
    let tempData = JSON.parse(JSON.stringify(data));
    tempData[index].state = !tempData[index].state;
    setData(tempData);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    setAnchorEl(null);
    // setIconOption(option);
    const tempNotes = data;
    tempNotes[indexOfBullet].bullet = option;
    setData(tempNotes);
  };



  return (
    <div className="feedParentContainer" style={{ padding: '0 10px' }}>
      {/* <div className="breadcumContainer"> <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs></div> */}
      <div >
        {data.map((item, i) => {
          return (
            <div key={item.id} className='libraryListsContainer' style={{ marginTop: '0' }}>
              <Accordion elevation={0} style={{ border: '1px solid var(--borderColors)', padding: '7px', borderRadius: '12px ' }} >
                <AccordionSummaryCustom
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ padding: 0, }}
                >
                  <Stack direction='column'>
                    <div
                      key={item.id}
                      className="libraryLists"
                      style={{ gap: '7px' }}
                      onClick={() => socialToggleHandler(i)}
                    >
                      <div>
                        <span id="ideaCardLabels"
                          aria-controls={open ? 'ideaCardLabelsMenu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={(e) => { handleClick(e); setIndexOfBullet(i) }}
                          style={{ height: 'fit-content', display: 'inline-block', marginTop: '17px', }}>{dynamicBulletHandler(item.bullet)}</span>
                      </div>
                      <div>
                        {/* //CardHeaderTitle */}
                        <div >
                          {/* <Tooltip title={item.title} arrow> */}
                          <Stack direction="row"
                            justifyContent="left" alignItems='center'
                            spacing={1} mb={1}>
                            <PortraitIcon sx={{ fontSize: '14px', color: 'lightslategrey' }} /><span style={{
                              fontSize: '12px', color: 'lightslategrey'
                            }} >Shared By: <b>Mauro Guerini</b> </span></Stack>

                          <h3 >{item.title}</h3>
                          {/* </Tooltip> */}
                        </div>

                        {/* //Graphics */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "12px",
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", borderRadius: '12px ' }}
                          />
                        </div>


                      </div>

                    </div>
                    {/* //SocialButtons */}
                    {item.state && <div className="reactionButtonsContainer" onClick={(e) => { e.stopPropagation() }}>
                      <div className="socialButtons" style={{ marginLeft: '40px' }}>
                        <Stack direction='row' spacing={3} >
                          <FavoriteBorder sx={{ color: 'var(--primaryColor)' }} />
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
                  </Stack>
                </AccordionSummaryCustom>
                <AccordionDetails sx={{ borderTop: '1px Solid var(--borderColors)' }}>
                  <div className="otherAccordians" style={{ marginLeft: '11px' }}>
                    <IdeaCardAccordian />
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
      <Menu
        id="ideaCardLabelsMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose('KEYWORDS')}
        MenuListProps={{
          'aria-labelledby': 'ideaCardLabels',
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
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('KEYWORDS')}>{dynamicBulletHandler('KEYWORDS', 'medium')} &nbsp; Keyword</MenuItem>
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('MAIN CLAIMS')}>{dynamicBulletHandler('MAIN CLAIMS', 'medium')} &nbsp; Main Claim</MenuItem>
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('QUOTES')}>{dynamicBulletHandler('QUOTES', 'medium')} &nbsp; Quote</MenuItem>
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('EXAMPLES')}>{dynamicBulletHandler('EXAMPLES', 'medium')} &nbsp; Examples</MenuItem>
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('ACTIONS ITEMS')}>{dynamicBulletHandler('ACTIONS ITEMS', 'medium')} &nbsp; Action Item</MenuItem>
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('custom1')}>{dynamicBulletHandler('custom1', 'medium')} &nbsp; Custom1</MenuItem>
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('custom2')}>{dynamicBulletHandler('custom2', 'medium')} &nbsp; Custom2</MenuItem>
        <MenuItem sx={MenuItemStyles} onClick={() => handleClose('custom3')}>{dynamicBulletHandler('custom3', 'medium')} &nbsp; Custom3</MenuItem>
      </Menu>
    </div>
  );
}
