import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Home, Add, ChevronLeft, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close state
  const [showToggleButton, setShowToggleButton] = useState(true); // State to show/hide the toggle button
  const [hasBeenClosed, setHasBeenClosed] = useState(false); // Track if sidebar has been closed
  const navigate = useNavigate();

  // Media query for mobile screens
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    if (isOpen) {
      setIsOpen(false); // Close the sidebar
      setHasBeenClosed(true); // Set the flag to true, indicating the sidebar has been closed
    } else {
      setIsOpen(true); // Open the sidebar
    }
  };

  // Handle navigation on item click
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isOpen}
        onClose={() => setIsOpen(false)} // For mobile: close sidebar
        sx={{
          width: isOpen ? 240 : 60, // Sidebar width based on open/closed state
          transition: "width 0.3s",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isOpen ? 240 : 60,
            transition: "width 0.3s",
            overflowX: "hidden", // Prevent content overflow when collapsed
          },
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isOpen ? "space-between" : "center",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          {isOpen && <Typography variant="h6">Dashboard</Typography>}
          {/* Only show the toggle button if the sidebar is not closed for the first time */}
          {showToggleButton && !hasBeenClosed && (
            <IconButton onClick={toggleSidebar}>
              {isOpen ? <ChevronLeft /> : <Menu />} {/* Use ChevronLeft to close and Menu to open */}
            </IconButton>
          )}
        </div>

        <Divider />

        {/* Sidebar Links */}
        <List>
          <ListItem button onClick={() => handleNavigation("/dashboard")}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Home" />}
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/add-client")}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Add Client" />}
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
