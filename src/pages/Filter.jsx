import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./Pages.css";
import axios from "axios";
import { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

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

let booksData = [
  {
    title: "Hooked: How to Build Habit-Forming Products",
    author: "Unknown",
    img: "https://m.media-amazon.com/images/I/41lvEdt3KmL._SY400_.jpg",
    id: "38383",
    state: false,
    index: 1,
  },
];
const tagsDataDemo = [
  { tagName: "Dummy_Tag", state: false },
  { tagName: "Dummy_Tag_Calisthenics", state: false },
  { tagName: "Dummy_Tag_Habits", state: false },
  { tagName: "Dummy_Tag_Bitcoin", state: false },
  { tagName: "Dummy_Tag_FreeDiving", state: false },
];
const Filter = () => {
  const [searchText, setsearchText] = useState('');
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setData] = useState(booksData);
  const [tagdata, setTagData] = useState(tagsDataDemo);
  const [tiggerModal, setTiggerModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(false);
  const [ideaCardActiveState, setIdeaCardActiveState] = useState(false);
  const [flag, setFlag] = useState(false);
  const [counter, setCounter] = useState(0);
  const [bookState, setBookState] = useState(false);
  const [tagState, setTagState] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const loginAuths = () => {
    console.log('running loginAuth....')
    axios
      .post("http://app.deepread.com:8000/api/auth/demo-account")
      .then((res) => {
        console.log("post", res);
        if (res.status === 200) {
          const token = res.data.authorization;
          const userId = res.data.user_id;
          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
          setToken(token);
        }
      })
      .catch((err) => {
        console.log('LoginAuth Error',err);
      });
  };
  
if (!userId||!token)
{
  loginAuths();
}
  const nameCorrection = (string) => {
    if (string.includes(",")) {
      let array = string.split(",");
      let fullName = array[1] + " " + array[0];
      return fullName;
    } else return string;
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(
        `http://app.deepread.com:8000/api/user/get-metadata?user_id=${userId}`,
        {
          headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.data) {
          const rawData = res.data.data;
          booksData = [];
          const tagsLocal = [];
          rawData.forEach((item, i) => {
            const obj = {};
            obj.title = item.title;
            obj.img = item.img_path;
            obj.id = item._id;
            let aurthorNameArr = [];
            if (item.author.includes(";")) {
              let namesArray = item.author.split(";");
              console.log(namesArray);
              namesArray.forEach((ele) => {
                aurthorNameArr.push(nameCorrection(ele));
              });
            } else {
              aurthorNameArr.push(nameCorrection(item.author));
            }
            obj.author = aurthorNameArr;
            obj.state = false;
            obj.index = i;
            booksData.push(obj);
            tagsLocal.push(...item.tags);
          });
          setData(booksData);
          if (tagsLocal.length) {
            setTagData(tagsLocal);
          }
          console.log("booksData", booksData);
          console.log("tagsLocal", tagsLocal);
          console.log("rawData", res.data.data);
        }
        // setData(res.data.data);
      })
      .catch((err) => {
        if (err.response) {
          // localStorage.clear();
          loginAuths();
        }
        console.log("err,", err);
      });
  }, [token]);


  useEffect(() => {
   const searchedArray=booksData.filter((item)=>{
    return (item.title.toLowerCase().includes(searchText.toLowerCase()));
   })
   setData(searchedArray);
  }, [searchText]);

  const handleNavigationButtons = (name) => {
    // setTitle(name);
    setTiggerModal(!tiggerModal);
    setIsOpen(false);
  };

  const searchHandler=(e)=>{setsearchText(e.target.value)}
  const bookmarkClicked = () => {
    //countr=0 true
    console.log(counter);
    if (counter === 0) {
      setIdeaCardActiveState(true);
      setBookmarkState(true);
      setCounter(1);
    } else if (counter === 1) {
      routes[0].subRoutes.forEach((item) => {
        item.state = false;
      });
      setFlag(!flag);
      setIdeaCardActiveState(false);
      setCounter(2);
    } else if (counter === 2) {
      setBookmarkState(false);
      setIdeaCardActiveState(false);
      setCounter(0);
    }
  };
  const bookIsClicked = () => {
    setBookState(!bookState);
  };

  const bookSelectHandler = (i) => {
    // booksData[i].state=!booksData[i].state;
    // console.log('bookSelectHandler',booksData[i]);
    // setData([...data, data[i].state=!data[i].state])
    // console.log('bookSelectHandler',data);

    booksData[i].state = !booksData[i].state;
    setData(booksData);
    setFlag(!flag);
  };
  const CardsClicked = (index) => {
    routes[0].subRoutes[index].state = !routes[0].subRoutes[index].state;
    setFlag(!flag);
    setIdeaCardActiveState(true);
  };
  
  const tagIsClicked = () => {
    setTagState(!tagState);
  };
  const tagItemsClicked = (i) => {
    tagsDataDemo[i].state=!tagsDataDemo[i].state;
    setTagData(tagsDataDemo);
    setFlag(!flag);
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
                key={index + route.name}
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
                  {route.subRoutes?.map((item, i) => {
                    return (
                      <button
                        key={i + item.name}
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
      })}

      {/* //Books */}
      <div className="booksContainer">
        <button
          className={isOpen ? "linkCollapsible" : "link"}
          // id={isOpen ? "active" : "activeCollapsible"}
          onClick={() => bookIsClicked()}
        >
          <AnimatePresence>
            <span className="material-symbols-outlined">menu_book</span>
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="link_text"
            >
              Books
            </motion.div>
            <span className="material-symbols-outlined" id="arrows">
              {" "}
              {!bookState ? "chevron_right" : "expand_more"}
            </span>
          </AnimatePresence>
        </button>

        {/* //BoookItems */}
        {bookState && (
          <div className="bookItems">
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
                    value={searchText}
                    onChange={searchHandler}
                  />
                  <div>
                    <span className="material-symbols-outlined search_icon">
                      search{" "}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* //Api LIst  */}
            <div className="bookList">
              {data
                ?.sort((a, b) => b.state - a.state)
                .map((item, i) => {
                  return (
                    <div
                      key={item.id}
                      className={
                        item.state
                          ? "bookListContainerActive"
                          : "bookListContainer"
                      }
                      onClick={() => bookSelectHandler(i)}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                      <div className="bookMetaContainer">
                        <Tooltip title={item.title} arrow>
                          <button className="heading">{item.title}</button>
                        </Tooltip>
                        <span className="author">By {item.author}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* //Tags */}
      <button
        className={isOpen ? "linkCollapsible" : "link"}
        // id={isOpen ? "active" : "activeCollapsible"}
        onClick={() => tagIsClicked()}
      >
        <AnimatePresence>
          <span className="material-symbols-outlined">tag</span>
          <motion.div
            variants={showAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="link_text"
          >
            Tags
          </motion.div>
          <span className="material-symbols-outlined" id="arrows">
            {" "}
            {!tagState ? "chevron_right" : "expand_more"}
          </span>
        </AnimatePresence>
      </button>

      {tagState && (
        <div className="radioInputs">
          {tagdata?.sort((a,b)=>b.state-a.state).map((item, i) => {
            return (
              <button
                key={i + item.tagName}
                className={item.state ? "activeState" : "link"}
                // id={isOpen ? "active" : "activeCollapsible"}
                style={{ padding: "10px" }}
                onClick={() => tagItemsClicked(i)}
              >
                <AnimatePresence>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
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
                    {item.tagName}
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
