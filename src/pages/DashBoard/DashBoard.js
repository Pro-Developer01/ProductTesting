import React from 'react'
import MyLibrary from '../MyLibrary/MyLibrary'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IdeaCardPage from '../IdeacardPage/IdeaCardPage';
import ListView from '../ListView/ListView';

export default function DashBoard() {
  return (
    <div style={{ width: '100%' }}>
      <Routes>
        <Route path="/library" element={<MyLibrary />} />
        {/* <Route path="/ideacard" element={<IdeaCardPage />} /> */}
        <Route path="/listview" element={<ListView />} />
      </Routes>
    </div>
  )
}
