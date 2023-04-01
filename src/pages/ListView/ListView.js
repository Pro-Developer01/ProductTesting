import react, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';

/* STYLES */
import { CardStrucutureBook, ChaptersUl, ChaptersLi } from "./styled";

/* COMPONENTS */
import Stack from "@mui/material/Stack";
import BookDetails from "../../components/BookDetails/index";
import CONTENT_TEMP from "../../mongodb_collections/contentHighlights.json";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./ListView.css";
import PersistentDrawerRight from "../../components/Drawer/Drawer";
import { useLocation } from "react-router-dom";
import ExpandIcon from "@mui/icons-material/Expand";
import { apiRoot } from "../../helperFunctions/apiRoot";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import SquareIcon from '@mui/icons-material/Square';
import { dynamicBulletHandler, getIdeacardIcons } from "../../helperFunctions/getIdeacardIcons";
import { useSelector, useDispatch } from 'react-redux'
import { updateIdeacardData } from "../../Utils/Features/IdeacardSlice";


// let book = {
//     asin: "B01N5AX61W",
//     author: "Clear, James",
//     created_at: 1678962214701,
//     deleted_at: null,
//     demo: true,
//     img_path: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SY400_.jpg",
//     my_notes: [],
//     rating: 0,
//     recomendation: "",
//     seen_at: null,
//     tags: [],
//     title: "Atomic Habits: the life-changing million-copy #1 bestseller",
//     updated_at: null,
//     user_id: "6412ede6ce27a2003406a81c",
//     _id: "6412ee26ce27a2003406a84e",
// };

// styling
const sub_chapter_divs = {
    display: "flex",
    gap: "7px",
};
const ideacardIconStyling = {
    backgroundColor: "var(--primaryColor)",
    borderRadius: "33px",
    color: "white",
    padding: "3px",
    marginTop: "1px",
    marginRight: "3px",
    marginLeft: "4px",
};
const resizeHandleStyle = {
    position: "absolute",
    top: "12px",
    right: "-29px",
    cursor: "col-resize",
    background: "white",
    color: "var(--fontColor)",
    borderRadius: "33px",
    border: "1px solid var(--borderColors)",
    padding: "2px",
    transform: "rotate(90deg)",
};

const IdeacardDivComponent = ({ data, setOpen }) => {
    const [callingIdeaCard, setCallingIdeaCard] = useState(false);
    const ideacardData = useSelector((state) => state.ideacardReducer.value)
    const dispatch = useDispatch();
    const clickHandler = () => {
        setCallingIdeaCard(!callingIdeaCard)
        if (!callingIdeaCard)
            dispatch(updateIdeacardData(data));
        else
            dispatch(updateIdeacardData(null));

    }
    useEffect(() => {
        if (!ideacardData)
            setCallingIdeaCard(false)

        setOpen(ideacardData)
    }, [ideacardData])
    return (
        <div
            className="ideacardDiv"
            style={{ border: callingIdeaCard ? "2px solid orange" : null }}
            onClick={clickHandler}
            aria-label="open drawer"
        >
            {/* {dynamicBulletHandler(type || "keyword", "small", ideacardIconStyling)}{" "} */}
            <span>{getIdeacardIcons(data.label_id)}</span>
            <span>
                <b> {data.title || ""}</b>
            </span>
        </div>
    );
};

function ListView(props) {
    /* STATES */
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [resizableWidth, setResizableWidth] = useState("527px");
    const [listViewData, setListViewData] = useState({});
    const [bookMetaData, setBookMetaData] = useState({});

    let { state } = useLocation();
    console.log(state);

    const handleResize = (e) => {
        console.log("e.pageX", e.pageX);
        console.log(e);
        setResizableWidth(`${e.pageX - 527}px`);
    };

    const fetchListViewData = () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        console.log("token, userId", token, userId);
        axios
            .get(
                `${apiRoot.endpoint}/api/content/highlights?user_id=${userId}&book_id=${state?.bookId}`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then((res) => {
                console.log("res, ", res.data.data[0]);
                const datax = res.data.data[0];
                console.log("Listview, ", datax?.data.length);
                setListViewData(res.data.data[0]);
                setLoading(false);
            })
            .catch((err) => {
                console.log("err", err);
                // loginAuths()
                // setTimeout(() => {
                //     alert('Token or UserId is Invalid Please Reload!')
                // }, 4000)
            });
    };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };
    /* HOOKS  */
    //   const { book } = useSelector((state) => state.library);

    /* ARROW FUNCTIONS */

    /* FUNCTION RECURSIVE TO SHOW ALL SUBCHAPTERS */
    const getContentRecursive = (item) => {
        return (
            <>
                {item.entries?.length ? (
                    <ChaptersUl>
                        {item.entries.map((k, i) => (
                            <ChaptersLi key={i} id={`chapters-${k.tocPositionId}`}>
                                <div
                                    className={`${k.entries || k.highlights?.length ? "caret caret-down-45" : "caret-without-content"
                                        }`}
                                    style={sub_chapter_divs}
                                    id={`caret-${k.tocPositionId}`}
                                    onClick={() => openOrCloseChapters(k.tocPositionId)}
                                >
                                    <PlayArrowIcon id="caret-arrow" />
                                    {k.ideacard ? (
                                        <IdeacardDivComponent
                                            setOpen={setOpen}
                                            label={k.ideacard}
                                            type={k.type}
                                        />
                                    ) : (
                                        <>
                                            <PlayArrowOutlinedIcon
                                                // fontSize="small"
                                                id="lastItemDot"
                                            />{" "}
                                            <span>{k.label || ""}</span>
                                        </>
                                    )}
                                </div>
                                {getContentRecursive(k)}
                            </ChaptersLi>
                        ))}
                    </ChaptersUl>
                ) : null}
                {item.highlights?.length ? (
                    <ChaptersUl>
                        {item.highlights.map((highlight, i) => (
                            <ChaptersLi
                                key={highlight._id}
                                id={`chapters-${highlight.position}`}
                            >
                                {highlight.context && <div
                                    className="highlightDiv"
                                >
                                    <SquareIcon fontSize={'small'} />
                                    <span>
                                        {highlight.context}
                                    </span>
                                </div>}
                                {highlight.idea_cards?.length ?
                                    highlight.idea_cards.map((ideacards, index) => {
                                        return (<IdeacardDivComponent
                                            data={ideacards}
                                            setOpen={setOpen}
                                        />)
                                    }) : null}

                                {/* {getContentRecursive(k)} */}
                            </ChaptersLi>
                        ))}
                    </ChaptersUl>
                ) : null}
            </>
        );
    };

    /* FUNCTION TO OPEN OR CLOSE SUBCHAPTERS */
    const openOrCloseChapters = (index) => {
        const element = document.querySelectorAll(`#chapters-${index} > ul `);
        const el = document.querySelector(`#caret-${index}`);
        console.log("element", element);
        console.log("el", el);
        console.log("index", index);

        for (var i = 0; i < element.length; ++i) {
            let item = element[i].classList;
            if (item) {
                if (item.value.indexOf("d-none") != -1) {
                    element[i].classList.remove("d-none");
                } else {
                    element[i].classList.add("d-none");
                }
                if (el.classList.value === "caret caret-down-45") {
                    el.classList.remove("caret-down-45");
                } else {
                    el.classList.add("caret-down-45");
                }
            }
        }
    };

    /* FUNCTION TO GET THE EXACT ARROW CARET */
    const getExactCaret = (index) => {
        if (!loading) {
            const element = document.querySelectorAll(`#chapters-${index} > ul `);
            for (var i = 0; i < element.length; ++i) {
                let item = element[i].classList;
                console.log(item);
                if (item) {
                    if (item.value.indexOf("d-none") != -1) {
                        console.log("to aqui");
                        return true;
                    } else {
                        console.log("to aqui");
                        return false;
                    }
                }
            }
        }
    };

    useEffect(() => {
        fetchListViewData();
    }, []);
    useEffect(() => {
        if (listViewData?.book) {
            setBookMetaData(listViewData?.book[0]);
            console.log("book", bookMetaData);
        }
    }, [listViewData]);

    return (
        <>
            <div
                className="feedParentContainer"
                style={{ alignItems: !open ? "center" : "start" }}
            >
                <div className="breadcumContainer" style={{ marginBottom: "16px" }}>
                    {/* <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs> */}
                    <span>kmckdckdmkcmdkcd</span>
                </div>
                {!loading ? (
                    <>
                        <PersistentDrawerRight
                            childrenx={
                                <div
                                    style={{
                                        width: open ? "100%" : resizableWidth,
                                        position: "relative",
                                    }}
                                >
                                    {!open && (
                                        <ExpandIcon
                                            style={resizeHandleStyle}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                document.addEventListener("mousemove", handleResize);
                                                document.addEventListener("mouseup", () => {
                                                    document.removeEventListener(
                                                        "mousemove",
                                                        handleResize
                                                    );
                                                });
                                            }}
                                            fontSize="medium"
                                        />
                                    )}
                                    {bookMetaData && <BookDetails book={bookMetaData} />}
                                    <CardStrucutureBook>
                                        {listViewData?.data?.length ? (
                                            <ChaptersUl style={{ margin: "0", border: "none" }}>
                                                {listViewData?.data?.map((item, index) => (
                                                    <ChaptersLi key={index} id={`chapters-${index}`}>
                                                        <div
                                                            className={`${item.entries || item.highlights.length
                                                                ? "caret caret-down-45"
                                                                : "caret-without-content-outer"
                                                                }`}
                                                            id={`caret-${index}`}
                                                            style={{ display: "flex", gap: "7px" }}
                                                            onClick={() => openOrCloseChapters(index)}
                                                        >
                                                            <PlayArrowIcon />
                                                            <PlayArrowOutlinedIcon
                                                                // fontSize="small"
                                                                id="lastItemDot"
                                                            />
                                                            <span className="ellipsisStyling">
                                                                {item.label || ""}
                                                            </span>
                                                        </div>
                                                        {getContentRecursive(item)}
                                                    </ChaptersLi>
                                                ))}
                                            </ChaptersUl>
                                        ) : (
                                            <Stack
                                                direction={"column"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                spacing={2}
                                                sx={{
                                                    height: "78vh",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <h3>
                                                    Oops! There are no Highlights or Ideacards <br />
                                                    for this Particular Book
                                                </h3>
                                                <h4>
                                                    Highlight your favorite passages and share your
                                                    insights with us <br />
                                                    😊
                                                </h4>
                                            </Stack>
                                        )}
                                    </CardStrucutureBook>
                                </div>
                            }
                        ></PersistentDrawerRight>
                    </>
                ) : (
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{ height: "100vh" }}
                    >
                        <CircularProgress sx={{ color: "var(--primaryColor)" }} />
                    </Stack>
                )}
            </div>
        </>
    );
}

export default ListView;
