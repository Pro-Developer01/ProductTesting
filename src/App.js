import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import NewIdeaButton from "./components/NewIdea/NewIdeaButton";
import DashBoard from "./pages/DashBoard/DashBoard";
function App() {

  return (
    <>
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


    </>
  );
}

export default App;
