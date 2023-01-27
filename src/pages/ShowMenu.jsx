import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./Pages.css";

const routes = [
  {
    path: "/",
    name: "Highlights",
    icon: "album",
  },
  {
    path: "/users",
    name: "Idea cards",
    icon: "lightbulb",
    subRoutes: [
      {
        name: "Keywords",
        icon: "vpn_key",
        state: true,
      },
      {
        name: "Main claims",
        icon: "double_arrow",
        state: true,
      },
      {
        name: "Quotes",
        icon: "format_quote",
        state: true,
      },
      {
        name: "Arguments",
        icon: "auto_stories",
        state: true,
      },
      {
        name: "Action items",
        icon: "campaign",
        state: true,
      },
      {
        name: "Custom1",
        icon: "settings",
        state: true,
      },
      {
        name: "Custom2",
        icon: "settings",
        state: true,
      },
      {
        name: "Custom3",
        icon: "settings",
        state: true,
      },
    ],
  },
  {
    path: "/messages",
    name: "Books",
    icon: "menu_book",
  },
  {
    path: "/analytics",
    name: "Tags",
    icon: "tag",
  },
];

const ShowMenu = () => {
  const [selectState, setSelectState] = useState({
    selectAll: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [ideaCardActiveState, setIdeaCardActiveState] = useState(false);
  const [counter, setCounter] = useState(0);


  const stateCheckerLoop = () => {
    let selectCounter = 0;
    for (let i = 0; i < routes[1].subRoutes.length; i++) {
      if (routes[1].subRoutes[i].state) {
        selectCounter++;
      }
    }

    if (selectCounter) {
      setIdeaCardActiveState(true);
      if (selectCounter < routes[1].subRoutes.length) {
        setSelectState({ ...selectState, selectAll: false });
      }
      if (selectCounter == routes[1].subRoutes.length) {
        setSelectState({ ...selectState, selectAll: true });
      }
    } else {
      setIdeaCardActiveState(false);
      setSelectState({ ...selectState, selectAll: false });
    }
  };
  const bookmarkClicked = () => {
    if (counter === 0) {
      stateCheckerLoop();
      setBookmarkState(true);
      setCounter(1);
    } else if (counter === 1) {
      setBookmarkState(false);
      setCounter(0);
      stateCheckerLoop();
    }
  };
  const CardsClicked = (index) => {
    routes[1].subRoutes[index].state = !routes[1].subRoutes[index].state;
    stateCheckerLoop();
  };

  const selectHandler = () => {
    if (selectState.selectAll) {
      routes[1].subRoutes.forEach((item) => {
        item.state = false;
      });
      setIdeaCardActiveState(false);
      setSelectState({ ...selectState, selectAll: false });
    } else if (!selectState.selectAll) {
      routes[1].subRoutes.forEach((item) => {
        item.state = true;
      });
      setIdeaCardActiveState(true);
      setSelectState({ ...selectState, selectAll: true });
    }
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
    <div className="NavigationMenu">
      {routes.map((route, index) => {
        if (route.subRoutes?.length) {
          return (
            <>
              <button
                key={index}
                className={ideaCardActiveState ? "activeState" : "link"}
                // id={isOpen ? "active" : "activeCollapsible"}
                onClick={bookmarkClicked}
              >
                <AnimatePresence>
                  <span className="material-symbols-outlined">
                    {" "}
                    {route.icon}
                  </span>
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.name}
                  </motion.div>
                  <span className="material-symbols-outlined" id="arrows">
                    {" "}
                    {!bookmarkState ? "chevron_right" : "expand_more"}
                  </span>
                </AnimatePresence>
              </button>

              {bookmarkState && (
                <div className="radioInputs">
                  <span
                    className={"link selectCheckbox"}
                    id="bookmarPageRadio"
                  >
                    <input
                      type="checkBox"
                      id={"selectAll"}
                      name="selectAll"
                      checked={selectState.selectAll}
                      onChange={selectHandler}
                    />
                    <label for="selectAll" className="checkBoxLabel">Select all</label>
                  </span>
                  {route.subRoutes?.map((item, i) => {
                    return (
                      <button
                        key={index}
                        className={item.state ? "activeState" : "link"}
                        // id={isOpen ? "active" : "activeCollapsible"}
                        onClick={() => CardsClicked(i)}
                      >
                        <AnimatePresence>
                          <span className="material-symbols-outlined">
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

        return (
          <button
            key={index}
            className={isOpen ? "linkCollapsible" : "link"}
            // id={isOpen ? "active" : "activeCollapsible"}
          >
            <AnimatePresence>
              <span className="material-symbols-outlined"> {route.icon}</span>
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
