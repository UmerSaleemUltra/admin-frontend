import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Page/Signup";
import Login from "./Page/Login";
import ContactTable from "./Page/dashboard";
import ClientsTable from "./Page/Clientstable";
import AddClient from "./Page/Addclient";


function App() {
  // ProtectedRoute component defined inside App.jsx
  const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem("authToken"); // Check auth token in local storage

    if (!authToken) {
      // Redirect to Login if not authenticated
      return <Navigate to="/Login" replace />;
    }

    // Allow access to the protected route
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Clients" element={<ClientsTable />} />


          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ContactTable />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
