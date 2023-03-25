import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Children } from 'react';
import IdeaCardPage from '../../pages/IdeacardPage/IdeaCardPage';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const drawerWidth = 590;
const clossDoubleArrowStyle = {
    background: 'var(--white)',
    borderRadius: "33px",
    // fontSize: "32px",
    border: "1px solid var(--borderColors)",
    position: "relative",
    top: "-3px",
    right: "-14px",
    cursor: 'pointer'
}
const closeCrossButtonStyle = {
    borderRadius: "33px",
    position: "absolute",
    top: "46px",
    right: "32px",
    zIndex: 10,
    cursor: 'pointer'
}
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: '10',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'none',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight({ open, setOpen, childrenx }) {
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    return (
        <Box sx={{ display: 'flex' }}>
            <Main open={open}>
                {childrenx}
            </Main>
            <Drawer
                sx={{
                    width: 564,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: 'transparent',
                        border: 'none',
                        top: '19px'
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                {/* <DrawerHeader>
                    <IconButton
                    //  onClick={handleDrawerClose}
                    >
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader> */}
                {/* <Divider /> */}
                <KeyboardDoubleArrowRightIcon fontSize='large' style={clossDoubleArrowStyle} onClick={() => setOpen(!open)} />
                <CloseIcon fontSize='medium' style={closeCrossButtonStyle} onClick={() => setOpen(!open)} />
                <IdeaCardPage />
            </Drawer>
        </Box>
    );
}