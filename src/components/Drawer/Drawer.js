import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from 'react-redux'
import IdeaCardPage from "../../pages/IdeacardPage/IdeaCardPage";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { updateIdeacardData } from "../../Utils/Features/IdeacardSlice";

const drawerWidth = 590;
const clossDoubleArrowStyle = {
    background: "var(--white)",
    borderRadius: "33px",
    border: "1px solid var(--borderColors)",
    position: "relative",
    top: "-3px",
    right: "-14px",
    cursor: "pointer",
    color: "var(--fontColor)",
};
const closeCrossButtonStyle = {
    borderRadius: "33px",
    position: "absolute",
    top: "46px",
    right: "32px",
    zIndex: 10,
    cursor: "pointer",
    color: "var(--fontColor)",
};
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: "10",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    })
);

export default function PersistentDrawerRight({ childrenx }) {
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);
    const ideacardData = useSelector((state) => state.ideacardReducer.value)
    const dispatch = useDispatch();
    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    return (
        <Box sx={{ display: "flex" }}>
            <Main open={ideacardData}>{childrenx}</Main>
            <Drawer
                sx={{
                    width: 564,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        background: "transparent",
                        border: "none",
                        top: "33px",
                        paddingTop: "4px",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={ideacardData}
            >
                <KeyboardDoubleArrowRightIcon
                    fontSize="medium"
                    style={clossDoubleArrowStyle}
                    onClick={() => dispatch(updateIdeacardData(null))}
                />
                <CloseIcon
                    fontSize="medium"
                    style={closeCrossButtonStyle}
                    onClick={() => dispatch(updateIdeacardData(null))}
                />
                <IdeaCardPage />
            </Drawer>
        </Box>
    );
}
