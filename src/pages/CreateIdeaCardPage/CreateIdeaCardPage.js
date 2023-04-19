import React, { useEffect } from "react";
import { useState } from "react";
import "../MyLibrary/MyLibrary.css";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Stack from "@mui/material/Stack";
import { CreateIdeaCardAccordian, IdeaCardAccordian } from "../../components/AccordianCollections/AccordianCollections";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PortraitIcon from "@mui/icons-material/Portrait";
import {
  dynamicBulletHandler,
  getLabelId,
  getIdeacardIcons,
} from "../../helperFunctions/getIdeacardIcons";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import axios from "axios";
import { apiRoot } from "../../helperFunctions/apiRoot";

let dummyData = {
  "book_id": "630d2b9510cf9a1ca419ae5b",
  "label_id": "630e53a89935150cf9f3c9e7",
  "highlight_id": "345345345345",
  "title": "",
  "my_notes": [],
  "picture_link": "",
  "rating": 0,
  "tags": [],
  "level": 0,
  "start": 578072,
  "end": 578146
};
const MenuItemStyles = {
  margin: "5px 1px",
  borderRadius: "30px",
};
const EditableTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase": {
    padding: 0,
  },
  "& .MuiInputBase-input": {
    fontSize: "1.2rem",
    fontWeight: 700,
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

const socialButtonsStyle = { color: "darkgrey" };


export default function CreateIdeaCardPage() {
  // const ideacardData = useSelector((state) => state.ideacardReducer.value);
  const [data, setData] = useState(dummyData);
  const currentLocation = window.location.pathname;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [timer, setTimer] = React.useState(null);
  const open = Boolean(anchorEl);
  const allIcons = JSON.parse(localStorage.getItem("ideacardIcons"));

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

  const handleDataChange = (event) => {
    const tempNotes = JSON.parse(JSON.stringify(data));
    tempNotes.title = event.target.value;
    setData(tempNotes);
  }
  const postIdeaCardData = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${apiRoot.endpoint}/api/ideas/store`,
        data,
        {
          headers: {
            authorization: token,
          },
        },

      )
      .then((res) => {
        console.log("posted ideacard Successfully", res);
        // setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        // loginAuths()
        // setTimeout(() => {
        //     alert('Token or UserId is Invalid Please Reload!')
        // }, 4000)
      });
  }

  const debaouceApi = () => {
    if (timer)
      clearTimeout(timer);

    setTimer(setTimeout(() => { postIdeaCardData(); }, 500))
  }

  useEffect(() => {
    if (data.title) {
      debaouceApi();
    }
    else if (!data.title && timer) {
      clearTimeout(timer)
    }
  }, [data]);

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
          {/* //Shared by */}
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            spacing={1}
            mb={1}
            sx={{ paddingLeft: "3.4rem", paddingRight: "0.5rem" }}
          >
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
              {getIdeacardIcons(getLabelId('KEYWORDS'), "large")}
            </span>
            <EditableTextField
              multiline
              value={data?.title}
              placeholder="Enter Title"
              onChange={(e) => handleDataChange(e)}
              variant="standard"
            />
          </Stack>
        </div>
        {/* //Graphics */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "12px",
            paddingLeft: "3.6rem",
            paddingRight: "0.5rem",
          }}
        >
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
          <CreateIdeaCardAccordian />
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
