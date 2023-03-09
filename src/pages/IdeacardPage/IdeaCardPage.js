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

let booksData = [
  {
    title: "Committment device",
    author:
      "https://thumbs.dreamstime.com/b/faces-avatar-circle-portrait-young-boy-glasses-vector-illustration-eps-flat-cartoon-style-83654284.jpg",
    img: "https://pbs.twimg.com/media/CM27-Z3UsAA7M5G.jpg",
    id: "38383",
    state: false,
    index: 1,
  },
  {
    title:
      "A traditional portrait often depicts the subject looking at the camera. Classic portrait photography is posed. It helps people look their best. Usually, photographers shoot conventional portraits in a studio with a formal photography backdrop.",
    author:
      "https://i.pinimg.com/736x/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg",
    img: "https://expertphotography.b-cdn.net/wp-content/uploads/2019/02/Types-Of-Portrait-Photography-BW.jpg",
    id: "38383",
    state: false,
    index: 1,
  },
];
const socialButtonsStyle = { color: 'darkgrey' }
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
    marginBottom: '23px'

  },
}));
export default function IdeaCardPage() {
  const [data, setData] = useState(booksData);
  const currentLocation = window.location.pathname
  const [breadcrumbs, setBreadcrumbs] = useState([
    <Link underline="hover" key="1" color="inherit" href={currentLocation} onClick={() => { }}>
      <Chip avatar={<TipsAndUpdatesIcon />} sx={{ fontWeight: 600 }} label={currentLocation.substring(1)} onDelete={() => { }} />
    </Link>,
  ])
  const socialToggleHandler = (index) => {
    let tempData = JSON.parse(JSON.stringify(data));
    tempData[index].state = !tempData[index].state;
    setData(tempData);
  };

  return (
    <div className="feedParentContainer">
      <div className="breadcumContainer"> <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs></div>
      <div className="feedBoxLayout">
        {data.map((item, i) => {
          return (
            <div key={item.id} className='libraryListsContainer'>
              <Accordion elevation={0} style={{ border: '1px solid var(--borderColors)', padding: '13px', }} rounded>
                <AccordionSummaryCustom
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ padding: 0, }}
                >
                  <Stack direction='column'>

                    <div
                      key={item.id}
                      className="libraryLists"
                      onClick={() => socialToggleHandler(i)}
                    >
                      <div>
                        <Avatar src={item.author} alt={item.author}></Avatar>
                      </div>
                      <div>
                        {/* //CardHeaderTitle */}
                        <div className="">
                          {/* <Tooltip title={item.title} arrow> */}
                          <h3 className="">{item.title}</h3>
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
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>


                      </div>

                    </div>
                    {/* //SocialButtons */}
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
                  </Stack>
                </AccordionSummaryCustom>
                <AccordionDetails sx={{ borderTop: '1px Solid var(--borderColors)' }}>
                  <div className="otherAccordians">
                    <IdeaCardAccordian />
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
}
