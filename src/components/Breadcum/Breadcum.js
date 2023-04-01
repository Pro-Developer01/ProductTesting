import React, { useEffect } from 'react'
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useDispatch, useSelector } from 'react-redux';
import { updateBreadcumArray } from '../../Utils/Features/breadcumSlice';
const breadcrumbStyle = {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    position: "sticky",
    top: "0",
    zIndex: ["10px", 3],
    background: "var(--BackgroundColor)",
    padding: "16px 0",
    zIndex: '10',
    borderRadius: '2px'

}

export default function Breadcum() {
    const [breadcrumbs, setBreadcrumbs] = React.useState([]);
    const currentLocation = window.location.pathname;
    const breadcumArray = useSelector((state) => state.breadcumReducer.value);

    // const [breadcumArray, setBreadcrumbArray] = React.useState([
    //     {
    //         path: '/library',
    //         title: 'library'
    //     }
    // ])

    const dispatch = useDispatch();
    const breadcumAddition = (title) => {
        let template = <Typography >{title}</Typography>;
        let tempData = [...breadcrumbs];
        tempData.push(template);
        setBreadcrumbs(tempData);
    };

    const urlChecker = () => {
        const locationArray = currentLocation.split('/');
        console.log('breadcumArray', breadcumArray);
        console.log(currentLocation);
        console.log(locationArray);
        let path = '';
        let resultedArray = [];
        for (let i = 1; i < locationArray.length; i++) {
            path += '/' + locationArray[i];
            const LocationObj = {
                path,
                title: locationArray[i]
            }
            resultedArray.push(LocationObj);
        }
        console.log('resultedArray', resultedArray);
        dispatch(updateBreadcumArray(resultedArray));
    }

    const breadcumCreator = () => {
        const newBreadcumData = breadcumArray.map((item, index) => {
            return (
                <Link
                    underline="hover"
                    key={index + 1}
                    color="inherit"
                    href={item.path}
                    onClick={(e) => handleClick(e, item.path)}
                >
                    <Chip
                        avatar={<LibraryBooksIcon />}
                        sx={{ fontWeight: 600 }}
                        label={item.title}
                    />
                </Link>
            )
        })

        setBreadcrumbs(newBreadcumData);

    }
    function handleClick(event, path) {
        // event.preventDefault();
        console.info("You clicked a breadcrumb.");
        console.info(path);
    }
    useEffect(() => { urlChecker() }, [currentLocation]);
    useEffect(() => { breadcumCreator() }, [breadcumArray]);
    return (
        <div className="breadcumContainer" style={breadcrumbStyle}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </div>
    )
}
