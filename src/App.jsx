import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./Signup";
import Login from "./Login";
import ContactTable from "./dashboard";

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
