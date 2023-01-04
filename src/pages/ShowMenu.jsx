import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import './Pages.css'

const routes = [
  {
    path: "/",
    name: "Highlights",
    icon: "album",
  },
  {
    path: "/users",
    name: "Idea Cards",
    icon: 'lightbulb',
    subRoutes: [
        {
          name: "Keywords",
          icon: 'vpn_key',
          state: true
        },
        {
          name: "Main claims",
          icon: 'double_arrow',
          state: true
        },
        {
          name: "Quotes",
          icon: 'format_quote',
          state: true
        },
        {
          name: "Arguments",
          icon: 'auto_stories',
          state: true
        },
        {
          name: "Action Items",
          icon: 'campaign',
          state: true
        },
        {
          name: "Custom1",
          icon: 'settings',
          state: true
        },
        {
          name: "Custom2",
          icon: 'settings',
          state: true
        },
        {
          name: "Custom3",
          icon: 'settings',
          state: true
        },
        
      ],
  },
  {
    path: "/messages",
    name: "Books",
    icon: 'menu_book',
  },
  {
    path: "/analytics",
    name: "Tags",
    icon: 'tag',
  },
    
];

const ShowMenu = () => {
  const [title, setTitle] = useState(null);
  const [tiggerModal, setTiggerModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleNavigationButtons=(name)=>{
    setTitle(name);
    setTiggerModal(!tiggerModal);
    setIsOpen(false);
  }
 const bookmarkClicked=()=>{
  setBookmarkState(!bookmarkState);
 }
 const CardsClicked=()=>{
    
 }
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div className='NavigationMenu' >
      {routes.map((route, index) => {
        if (route.subRoutes?.length) {
          return (
            <>
             <button
            key={index}
            className={isOpen ? "linkCollapsible" : "link"}
            // id={isOpen ? "active" : "activeCollapsible"}
            onClick={bookmarkClicked}
          >
            <AnimatePresence>
            <span class="material-symbols-outlined">   {route.icon}</span>
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text"
                >
                  {route.name}
                
                </motion.div>
                <span class="material-symbols-outlined" id='arrows'>   {!bookmarkState?'chevron_right':'expand_more'}</span>
            </AnimatePresence>
          </button>

            {bookmarkState&& <div className="radioInputs">
              {route.subRoutes?.map((item,i)=>{
                return (
                    <button
                    key={index}
                    className={isOpen ? "linkCollapsible" : "link"}
                    // id={isOpen ? "active" : "activeCollapsible"}
                    onClick={CardsClicked}
                  >
                    <AnimatePresence>
                    <span class="material-symbols-outlined">   {item.icon}</span>
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {item.name}
                        
                        </motion.div>
                       
                    </AnimatePresence>
                  </button>
                )
              })}
            </div>
        }
            </>
          );
        }
  
        return (
          <button
            key={index}
            className={isOpen ? "linkCollapsible" : "link"}
            // id={isOpen ? "active" : "activeCollapsible"}
            onClick={()=>handleNavigationButtons(route.name)}
          >
            <AnimatePresence>
            <span class="material-symbols-outlined">   {route.icon}</span>
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text"
                >
                  {route.name}
                </motion.div>
            </AnimatePresence>
          </button>
        );
      })}

    </div>

  );
};

export default ShowMenu;
