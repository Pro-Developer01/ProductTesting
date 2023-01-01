import { NavLink } from "react-router-dom";
import { FaBars, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import {  BiSearch } from "react-icons/bi";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: "Home",
  },
  {
    path: "/users",
    name: "Navigate",
    icon: 'explore',
  },
  {
    path: "/messages",
    name: "Search",
    icon: 'search',
  },
  {
    path: "/analytics",
    name: "Show",
    icon: 'visibility',
  },
  {
    path: "/file-manager",
    name: "Filter",
    icon: 'filter_alt',
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/order",
    name: "Template",
    icon: 'dashboard',
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "208px" : "48px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
          style={{ padding: isOpen ? "0 10px 0 5px" : "0",}}
        >
          <div className="sidebarUppper">

          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Deep Read Logo
                </motion.h1>
              )}
            </AnimatePresence>

          
          </div>
          <div className="search">
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
          </div>
          <section className="routes">
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
                <NavLink
                  to={route.path}
                  key={index}
                  className={isOpen ? "link" : "linkCollapsible"}
                  activeClassName={isOpen ? "active" : "activeCollapsible"}
                >
                  <span class="material-symbols-outlined">   {route.icon}</span>
                  {/* <div className="icon">{route.icon}</div> */}
                  <AnimatePresence>
                    {isOpen? (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    ):
                    <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text_collapse"
                      >
                        {route.name}
                      </motion.div>
                    }
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          </div>
          <div className="sidebarLower">
          <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
