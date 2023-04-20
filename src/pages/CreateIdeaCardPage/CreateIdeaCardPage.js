import React, { useEffect } from "react";
import { useState } from "react";
import "../MyLibrary/MyLibrary.css";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import { IdeaCardAccordian } from "../../components/AccordianCollections/AccordianCollections";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PortraitIcon from "@mui/icons-material/Portrait";
import {
  dynamicBulletHandler,
  getLabelId,
  getIdeacardIcons,
} from "../../helperFunctions/getIdeacardIcons";
import { useSelector } from "react-redux";

let dummyData = {
  _id: "642325574dc0760034d8f977",
  book_id: "642325564dc0760034d8981f",
  label_id: "63584f343bcadd010442c447",
  highlight_id: "642325574dc0760034d8aae9",
  user_id: "642325564dc0760034d897ed",
  title: "DUMMY DATA ",
  description: [],
  own_thoughts: [],
  picture_link: "",
  rating: 0,
  tags: [],
  level: 0,
  start: 17320,
  end: 17401,
  created_at: 1673730692254,
  updated_at: null,
  retrieved_at: 1673730692254,
  deleted_at: null,
  lastviewed_at: null,
};
const MenuItemStyles = {
  margin: "5px 1px",
  borderRadius: "30px",
};

const socialButtonsStyle = { color: "darkgrey" };
const AccordionSummaryCustom = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    margin: 0,
  },
  "&& .Mui-expanded": {
    margin: 0,
    marginBottom: "23px",
  },
}));

export default function CreateIdeaCardPage() {
  // const ideacardData = useSelector((state) => state.ideacardReducer.value);
  const handleButtonClick = () => {
    // Handle button click event here
    console.log('Button clicked');
  };


  const [data, setData] = useState(dummyData);
  const currentLocation = window.location.pathname;
  const [breadcrumbs, setBreadcrumbs] = useState([
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href={currentLocation}
      onClick={() => { }}
    >
      <Chip
        avatar={<TipsAndUpdatesIcon />}
        sx={{ fontWeight: 600 }}
        label={currentLocation.substring(1)}
      />
    </Link>,
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const allIcons = JSON.parse(localStorage.getItem("ideacardIcons"));

  const socialToggleHandler = () => {
    let tempData = JSON.parse(JSON.stringify(data));
    tempData.state = !tempData.state;
    setData(tempData);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (iconLabelId) => {
    setAnchorEl(null);
    // setIconOption(option);
    const tempNotes = data;
    console.log("tempNotes", tempNotes);
    tempNotes.label_id = iconLabelId;
    console.log("iconLabelId", iconLabelId);
    setData(tempNotes);
  };

  // useEffect(() => {
  //   setData(ideacardData);
  // }, [ideacardData]);

  return (

    <>

      {" "}
      {/* {data && */}
      <div
        style={{
          border: "1px solid var(--borderColors)",
          padding: "7px",
          borderRadius: "12px ",
          background: "white",
          margin: "0 0 0 0.7rem",
          padding: "0.5rem 0",
          paddingTop: "0",
        }}
      >
        <div className="ideacard-Title">
          {/* //CardHeaderTitle */}
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="flex-start"
            spacing={1.5}
            mb={1}
            sx={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
          >
            <span
              id="ideaCardLabels"
              aria-controls={open ? "ideaCardLabelsMenu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => {
                handleClick(e);
                e.stopPropagation();
              }}
            // style={{
            //   height: "fit-content",
            //   display: "inline-block",
            //   marginTop: "17px",
            // }}
            >
              {getIdeacardIcons(data.label_id, "large")}
            </span>
          </Stack>
        </div>
        {/* //Graphics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "12px",
            paddingLeft: "0.6rem",
            paddingRight: "0.5rem",
          }}
        >
          {/* Rectangular Container for Google search bar and upload button  */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: '10px',
              width: '305px',
              height: '253px',
              border: '1px solid #a4a4a4',
              backgroundColor: '#ededed',
              margin: 'auto',
            }}
          >
            {/* Upload button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                backgroundColor: '#a6a6a6',
                marginLeft: '-30px',
                marginTop: '10px',
                marginRight: '10px',
              }}
            >
              <IconButton onClick={handleButtonClick} style={{ color: 'white' }}>
                <FileUploadOutlinedIcon />
              </IconButton>
            </div>
            {/* Google Search box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f2f2f2',
                width: '216px',
                height: '28px',
                borderRadius: '5px',
                border: '1px solid #a4a4a4',
                marginTop: '10px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            >
              <TextField
                fullWidth
                size="small"
                variant="standard"
                placeholder="Search Google Image"
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </div>
            {/* Text */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px', position: 'absolute' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#a6a6a6' }}>Search and select an Image</span>
            </div>
          </div>


          {data.picture_link && (
            <img
              src={data.picture_link}
              alt={data.title}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "12px ",
              }}
            />
          )}
        </div>

        {/* //SocialButtons */}

        <div
          className="reactionButtonsContainer"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ paddingLeft: "3.4rem", paddingRight: "0.5rem" }}
        >
          <div className="socialButtons">
            <Stack direction="row" spacing={3}>
              <FavoriteBorder sx={{ color: "var(--primaryColor)" }} />
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
        <hr style={{ border: "1px solid var(--borderColors)" }} />
        <div className="otherAccordians">
          <IdeaCardAccordian data={data} />
        </div>
      </div>
      {/* } */}

      <Menu
        id="ideaCardLabelsMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          "aria-labelledby": "ideaCardLabels",
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
        {allIcons?.map((item, index) => {
          return (
            <MenuItem
              key={index + item._id}
              sx={MenuItemStyles}
              onClick={() => handleClose(item._id)}
            >
              {dynamicBulletHandler(item.label, "medium")} &nbsp;{" "}
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
