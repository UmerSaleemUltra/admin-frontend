import React from "react";
import Sidebar from "../Components/Sidebar";
import ClientsTable from "./Clientstable"; // Make sure the ClientsTable component is correctly imported

const Dashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content (Clients Table) */}
      <main style={{ flexGrow: 1, padding: "20px" }}>
        <ClientsTable /> {/* Display Clients Table here */}
      </main>
    </div>
  );
};

export default Dashboard;
