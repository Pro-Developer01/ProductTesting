import { NavLink } from "react-router-dom";
import { FaBars, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import DrawerModal from "../DrawerModal/DrawerModal";
// import logo from "../../Assets/LogoHalf.png";
import { ReactComponent as Logo } from "../../Assets/LogoHalfSvg.svg";
import { ReactComponent as FullLogo } from "../../Assets/logoFullSvg.svg";

import { useEffect } from "react";
import axios from "axios";
import NewIdeaButton from "../NewIdea/NewIdeaButton";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: "Home",
  },
  {
    path: "/users",
    name: "Navigate",
    icon: "explore",
  },
  {
    path: "/messages",
    name: "Search",
    icon: "search",
  },
  {
    path: "/analytics",
    name: "Show",
    icon: "visibility",
  },
  {
    path: "/file-manager",
    name: "Filter",
    icon: "filter_alt",
    // subRoutes: [
    //   {
    //     path: "/settings/profile",
    //     name: "Profile ",
    //     icon: <FaUser />,
    //   },
    //   {
    //     path: "/settings/2fa",
    //     name: "2FA",
    //     icon: <FaLock />,
    //   },
    //   {
    //     path: "/settings/billing",
    //     name: "Billing",
    //     icon: <FaMoneyBill />,
    //   },
    // ],
  },
  {
    path: "/order",
    name: "Template",
    icon: "dashboard",
  },
];

const SideBar = ({ children }) => {
  const [title, setTitle] = useState(null);
  const [tiggerModal, setTiggerModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (!title) setIsOpen(true);
  }, [title]);
  const handleNavigationButtons = (name) => {
    if (name !== "Home") {
      setTitle(name);
      setTiggerModal(!tiggerModal);
      setIsOpen(false);
    } else {
      setTitle(null);
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
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "208px" : "54px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
          style={{ padding: isOpen ? "0 10px 0 5px" : "0" }}
        >
          <div className="sidebarUppper">
            <div className="top_section">
              <AnimatePresence>
                {isOpen ? (
                  <motion.span
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    // className="logo"
                  >
                   <FullLogo/>
                  </motion.span>
                ) : (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logoColapse"
                    
                  >
                    <FullLogo/>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
            <section className={isOpen ? "routes" : "routesCollapsible"}>
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <button
                    key={index}
                    className={isOpen ? "link" : "linkCollapsible"}
                    // id={isOpen ? "active" : "activeCollapsible"}
                    id={isOpen ? "routesID" : null}
                    onClick={() => handleNavigationButtons(route.name)}
                  >
                    <span className="material-symbols-outlined">
                      {" "}
                      {route.icon}
                    </span>
                    <AnimatePresence>
                      {isOpen ? (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      ) : (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text_collapse"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </section>
          </div>
          <div className={isOpen ? "sidebarLower" : "sidebarLowerCollapse"}>
            <div className="routes" onClick={toggle}>
              <button
                className={isOpen ? "link" : "linkCollapsible"}
                style={{ marginBottom: isOpen ? "5px" : "3px",  padding: isOpen ? null : '4px 12px'  }}
                // onClick={() => handleNavigationButtons(route.name)}
              >
                <img
                  src="https://goodmorningimagesforlover.com/wp-content/uploads/2018/09/mehwish-hayat-hot-images.jpg"
                  alt="profile"
                  id="sidebarProfileImg"
                />
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      Profile
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text_collapse"
                    >
                      Profile
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <div  id="barParent" onClick={toggle}>
              <div className="barsContainer">
                <FaBars />
              </div>
            </div>
          </div>
        </motion.div>
        {title && (
          <div className="sidebarLayer2">
            <DrawerModal title={title} setTitle={setTitle} />
          </div>
        )}
        <NewIdeaButton/> 
      </div>
    </>
  );
};

export default SideBar;
