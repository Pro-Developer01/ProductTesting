import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NewIdeaButton from "./components/NewIdea/NewIdeaButton";
import DashBoard from "./pages/DashBoard/DashBoard";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

  return (
    <>
      <ThemeProvider theme={theme}>

        <div className="rootContainer">
          <SideBar />
          <Router>
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
