import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./Pages.css";
import { useEffect } from "react";

const routes = [
  {
    path: "/",
    name: "Feed",
    icon: "dynamic_feed",
  },
  {
    path: "/",
    name: "List",
    icon: "format_list_bulleted",
    subRoutes: [
      {
        name: "1st Level:Chapter",
        icon: "playlist_add",
        state: true,
      },
      {
        name: "2st Level:Sub-Chapter",
        icon: "playlist_add",
        state: true,
      },
      {
        name: "3rd Level:Section",
        icon: "playlist_add",
        state: true,
      },
      {
        name: "4th Level:Sub-Section",
        icon: "playlist_add",
        state: true,
      },
    ],
  },
];

const Template = () => {
  const [flag, setFlag] = useState(false);
  const [tiggerModal, setTiggerModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [hierarchicalState, setHierarchicalState] = useState(false);
  const [tileState, setTileState] = useState(false);
  const [bidirectionalState, setBidirectionalState] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

useEffect(()=>{console.log('routes',routes[1].subRoutes)},[flag])

  const handleNavigationButtons = (name) => {
    // setTitle(name);
    setTiggerModal(!tiggerModal);
    setIsOpen(false);
  };
  const bookmarkClicked = () => {
    setBookmarkState(!bookmarkState);
  };
  const HierarchicalLinkClicked = () => {
    setHierarchicalState(!hierarchicalState);
  };
  const BidirectionalLinkClicked = () => {
    setBidirectionalState(!bidirectionalState);
  };
  const selectedList = (index) => {
    // let flag=routes[1].subRoutes?[index].state;
    routes[1].subRoutes[index].state=!routes[1].subRoutes[index].state;
    setFlag(!flag);
    console.log('flag',routes[1].subRoutes[index].state);
  };
  const tagIsClicked = () => {
    setTileState(!tileState);
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
                className={bookmarkState ? "activeState" : "link"}
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
                  <span class="material-symbols-outlined" id="arrows">
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
                        key={i}
                        className={item.state ? "activeState" : "link"}
                        // id={isOpen ? "active" : "activeCollapsible"}
                        onClick={()=>selectedList(i)}
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

        return (
          <button
            key={index}
            className={isOpen ? "linkCollapsible" : "link"}
            // id={isOpen ? "active" : "activeCollapsible"}
            onClick={() => handleNavigationButtons(route.name)}
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
            </AnimatePresence>
          </button>
        );
      })}

      {/* //Tiles */}
      <button
        className={tileState ? "activeState" : "link"}
        // id={isOpen ? "active" : "activeCollapsible"}
        onClick={() => tagIsClicked()}
      >
        <AnimatePresence>
          <span class="material-symbols-outlined">grid_view</span>
          <motion.div
            variants={showAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="link_text"
          >
            Tiles
          </motion.div>
          <span class="material-symbols-outlined" id="arrows">
            {" "}
            {!tileState ? "chevron_right" : "expand_more"}
          </span>
        </AnimatePresence>
      </button>

      {tileState && (
        <div className="dynamicSelectContainer">
          <AnimatePresence>
            <span
              class="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              {" "}
              check_box_outline_blank
            </span>
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="dynamicSelect"
            >
              <label htmlFor="Boxes">Boxes: </label>
              <select name="Boxes" id="Boxes">
                <option value="Chapter">Chapter</option>
                <option value="Sub-Chapter">Sub-Chapter</option>
                <option value="Section">Section</option>
                <option value="Sub-Section">Sub-Section</option>
                <option value="off">off</option>
              </select>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* //Hierarchial  */}
      <button
        className={hierarchicalState ? "activeState" : "link"}
        // id={isOpen ? "active" : "activeCollapsible"}
        onClick={() => HierarchicalLinkClicked()}
      >
        <AnimatePresence>
          <span class="material-symbols-outlined">device_hub</span>
          <motion.div
            variants={showAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="link_text"
          >
            Hierarchical links
          </motion.div>
          <span class="material-symbols-outlined" id="arrows">
            {" "}
            {!tileState ? "chevron_right" : "expand_more"}
          </span>
        </AnimatePresence>
      </button>

      {hierarchicalState && (
        <div className="dynamicSelectContainer">
          <AnimatePresence>
            <span
              class="material-symbols-outlined"
              style={{ fontSize: "18px" }}
            >
              {" "}
              link
            </span>
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="dynamicSelect"
            >
              <label htmlFor="links"># of links: </label>
              <select name="links" id="links">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="all">all</option>
              </select>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {/* //Bidirectional  */}
      <button
        className={bidirectionalState ? "activeState" : "link"}
        // id={isOpen ? "active" : "activeCollapsible"}
        onClick={() => BidirectionalLinkClicked()}
      >
        <AnimatePresence>
          <span class="material-symbols-outlined">share</span>
          <motion.div
            variants={showAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="link_text"
          >
            Bidirectional links
          </motion.div>
          <span class="material-symbols-outlined" id="arrows">
            {" "}
            {!tileState ? "chevron_right" : "expand_more"}
          </span>
        </AnimatePresence>
      </button>

      {bidirectionalState && (
        <>
          <div className="dynamicSelectContainer">
            <AnimatePresence>
              <span
                class="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                {" "}
                link
              </span>
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="dynamicSelect"
              >
                <label htmlFor="links2"># of links: </label>
                <select name="links2" id="links2">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="all">all</option>
                </select>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="dynamicSelectContainer">
            <AnimatePresence>
              <span
                class="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                {" "}
                trending_flat
              </span>
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="dynamicSelect"
              >
                <label htmlFor="xAxis">X-axis: </label>
                <select name="xAxis" id="xAxis">
                  <option value="ViewCount">View count</option>
                  <option value="EditCount">Edit count</option>
                  <option value="ViewDate">View date</option>
                  <option value="EditDate">Edit date</option>
                  <option value="off">off</option>
                </select>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="dynamicSelectContainer">
            <AnimatePresence>
              <span
                class="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                {" "}
                straight
              </span>
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="dynamicSelect"
              >
                <label htmlFor="yAxis">Y-axis: </label>
                <select name="yAxis" id="yAxis">
                  <option value="ViewCount">View count</option>
                  <option value="EditCount">Edit count</option>
                  <option value="ViewDate">View date</option>
                  <option value="EditDate">Edit date</option>
                  <option value="off">off</option>
                </select>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default Template;
