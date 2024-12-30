import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./Page/Signup";
import Login from "./Page/Login";
import ContactTable from "./Page/dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/dashboard" element={<ContactTable />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
