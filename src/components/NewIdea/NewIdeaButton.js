import React, { useState,useEffect } from 'react'
import './NewIdea.css'
import { AnimatePresence, motion } from "framer-motion";
// import { ReactComponent as Create } from "../../Assets/Create.svg";
// import { ReactComponent as Identify } from "../../Assets/Identify.svg";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function NewIdeaButton() {
    // const open = useState(false)[0]
    // const setOpen = useState(false)[1]
    const [openOptions,setopenOptions]=useState(false)
    useEffect(() => {
        const handleEsc = (event) => {
           if (event.keyCode === 27) {
            console.log('Close')
            setopenOptions(false)
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);
  
    // console.log(open);
    return (

        <>
        <div className="NewIdeaParent">

            <div className='NewIdeaPosition'>
                {openOptions && (
                    <>
                        <IdeaOptions text={'Create idea'} icon={'tips_and_updates'} />
                        <IdeaOptions text={'Identify idea'} icon={'drive_file_rename_outline'} />
                    </>
                )}
                {!openOptions && (

                    <div className='NewIdeaButton' onClick={()=>setopenOptions(true)}>
                        <span className="material-symbols-outlined search_icon">
                            add
                        </span>
                    </div>
                )}
            </div>
        </div>

     

        </>
    )
}

const IdeaOptions = ({text,icon}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.1,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0,
            },
        },
    };
    return (
        <>
        <button
            className="link IdeaOptions"
        // id={isOpen ? "active" : "activeCollapsible"}
        // id= "IdeaOptions" 
        onClick={ handleOpen}
        >
            <AnimatePresence>
                <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                >
                    {text}
                </motion.div>
                <span className="material-symbols-outlined">
                   {icon}
                </span>
            </AnimatePresence>
        </button>
        
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
           {/* <img src="../../Assets/demoIdea.jpg" alt="" /> */}
           <Typography id="transition-modal-title" variant="h6" component="h2">
           New empty idea card layaout will be here,<br/> To be done Later
            </Typography>

          </Box>
        </Fade>
      </Modal>
        
        </>
    )
}