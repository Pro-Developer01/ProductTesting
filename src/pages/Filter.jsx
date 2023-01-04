import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./Pages.css";

const routes = [
  {
    path: "/",
    name: "Sources",
    icon: "place_item",
    subRoutes: [
      {
        name: "My own",
        icon: "diamond",
        state: true,
      },
      {
        name: "Shared with me",
        icon: "share",
        state: true,
      },
      {
        name: "Followed by me",
        icon: "person",
        state: true,
      },
      {
        name: "Suggestions for me",
        icon: "recommend",
        state: true,
      },
    ],
  },
];
const tagsData=['Bitcoin','Calisthenics', 'FreeDiving', 'Habits','Bitcoin','Calisthenics', 'FreeDiving', 'Habits','Bitcoin','Calisthenics', 'FreeDiving', 'Habits']
const Filter = () => {
  const [title, setTitle] = useState(null);
  const [tiggerModal, setTiggerModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [bookState, setBookState] = useState(false);
  const [tagState, setTagState] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleNavigationButtons = (name) => {
    setTitle(name);
    setTiggerModal(!tiggerModal);
    setIsOpen(false);
  };
  const bookmarkClicked = () => {
    setBookmarkState(!bookmarkState);
  };
  const bookIsClicked = () => {
    setBookState(!bookState);
  };
  const CardsClicked = () => {};
  const tagIsClicked = () => {
    setTagState(!tagState);
  };
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "auto",
      padding: "5px 10px",
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
    <div className="NavigationMenu">
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
                  <span class="material-symbols-outlined"> {route.icon}</span>
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.name}
                  </motion.div>
                  <span class="material-symbols-outlined" id='arrows'>
                    {" "}
                    {!bookmarkState ? "chevron_right" : "expand_more"}
                  </span>
                </AnimatePresence>
              </button>

              {bookmarkState && (
                <div className="radioInputs">
                  {route.subRoutes?.map((item, i) => {
                    return (
                      <button
                        key={index}
                        className={isOpen ? "linkCollapsible" : "link"}
                        // id={isOpen ? "active" : "activeCollapsible"}
                        onClick={CardsClicked}
                      >
                        <AnimatePresence>
                          <span class="material-symbols-outlined">
                            {" "}
                            {item.icon}
                          </span>
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
                    );
                  })}
                </div>
              )}
            </>
          );
        }
      })}

      {/* //Books */}
      <div className="booksContainer">
        <button
          className={isOpen ? "linkCollapsible" : "link"}
          // id={isOpen ? "active" : "activeCollapsible"}
          onClick={() => bookIsClicked()}
        >
          <AnimatePresence>
            <span class="material-symbols-outlined">menu_book</span>
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="link_text"
            >
              Books
            </motion.div>
            <span class="material-symbols-outlined" id='arrows'>
              {" "}
              {!bookState ? "chevron_right" : "expand_more"}
            </span>
          </AnimatePresence>
        </button>

        {/* //BoookItems */}
        {bookState && <div className="bookItems">
            {/* //Search Bar  */}
          <div className="SearchMenu">
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={inputAnimation}
                className="search"
              >
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  className="inputElement"
                />
                <div className="search_icon">
                  <BiSearch />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* //Api LIst  */}
          <div className="bookList">
            <div className="bookListContainer">
                <img src="https://m.media-amazon.com/images/I/41wuB-s8vRL.jpg" alt="atmoic Habit" width={50} height={50} />
                <div className="bookMetaContainer">
                    <span className="heading">Atomic Habits</span>
                    <span className="author">By Shashank Yadav</span>
                </div>
            </div>
            <div className="bookListContainer">
                <img src="https://m.media-amazon.com/images/I/51u8ZRDCVoL.jpg" alt="atmoic Habit" width={50} height={50} />
                <div className="bookMetaContainer">
                    <span className="heading">Rich dad poor dad</span>
                    <span className="author">By Shashank Yadav</span>
                </div>
            </div>
          </div>
        </div>}
      </div>

      {/* //Tags */}
      <button
        className={isOpen ? "linkCollapsible" : "link"}
        // id={isOpen ? "active" : "activeCollapsible"}
        onClick={() => tagIsClicked()}
      >
        <AnimatePresence>
          <span class="material-symbols-outlined">tag</span>
          <motion.div
            variants={showAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="link_text"
          >
            Tags 
          </motion.div>
          <span class="material-symbols-outlined" id='arrows'>
            {" "}
            {!tagState ? "chevron_right" : "expand_more"}
          </span>
        </AnimatePresence>
      </button>

             {tagState && (
                <div className="radioInputs">
                  {tagsData?.map((item, i) => {
                    return (
                      <button
                        key={i}
                        className={isOpen ? "linkCollapsible" : "link"}
                        // id={isOpen ? "active" : "activeCollapsible"}
                        onClick={CardsClicked}
                      >
                        <AnimatePresence>
                          <span class="material-symbols-outlined" style={{fontSize:'18px'}}>
                            {" "}
                        tag
                          </span>
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text"

                          >
                            {item}
                          </motion.div>
                        </AnimatePresence>
                      </button>
                    );
                  })}
                </div>
              )}
    </div>
  );
};

export default Filter;
