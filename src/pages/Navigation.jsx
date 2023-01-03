import React from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import './Pages.css'

const routes = [
  {
    path: "/",
    name: "Feed",
    icon: "dynamic_feed",
  },
  {
    path: "/users",
    name: "My Previous Session",
    icon: 'skip_previous',
  },
  {
    path: "/messages",
    name: "My current book",
    icon: 'local_library',
  },
  {
    path: "/analytics",
    name: "My Library",
    icon: 'library_books',
  },
  {
    path: "/file-manager",
    name: "My Bookmarks",
    icon: 'bookmarks',
    subRoutes: [
      {
        name: "Page1",
      },
      {
        name: "Page2",
      },
      {
        name: "Page3",
      },
      {
        name: "Page4",
      },
      {
        name: "Page5",
      },
    ],
  },
  
];

const Navigation = () => {
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
                <span class="material-symbols-outlined">   {!bookmarkState?'chevron_right':'expand_more'}</span>
            </AnimatePresence>
          </button>

            {bookmarkState&& <div className="radioInputs">
              {route.subRoutes?.map((item,i)=>{
                return (
                  <>
                  <span className="link" >
                  <input type="radio" id={item.name} name="bookmarPage" value={item.name} />
                  <label for={item.name}>{item.name}</label>
                  </span>
                  </>
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

export default Navigation;
