import "./App.css";
// import "./Global.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import NewIdeaButton from "./components/NewIdea/NewIdeaButton";
import DashBoard from "./pages/DashBoard/DashBoard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import loginAuths from "./helperFunctions/logingFunction";
import fetchIdeacardIcons from "./helperFunctions/getIdeacardIcons";
/*Shreyash is in the code now*/
const theme = createTheme({
  typography: {
    fontFamily: [
      "Lato",
      'sans-serif',
    ].join(','),
    fontColor: 'var(--fontColor)'
  },
  color: 'var(--fontColor)'
});
function App() {
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const ideacardIcons = localStorage.getItem('ideacardIcons');
    if (!token || !userId) {
      loginAuths()
      console.log('Login Called from App.js');
    }
    if (!ideacardIcons) {
      fetchIdeacardIcons();
      console.log('fetchIdeacardIcons Called from App.js', ideacardIcons);
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>

        <div className="rootContainer">
          <Router>
            <SideBar />
            <Routes>
              <Route path="/*" element={<DashBoard />} />
              <Route path="*" element={<> not found</>} />
            </Routes>
          </Router>
        </div>

        <NewIdeaButton />


      </ThemeProvider>
    </>
  );
}

export default App;
