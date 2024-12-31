import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [newUser, setNewUser] = useState({
    businessName: "",
    state: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch(
        "https://buzz-filling-dashboard.vercel.app/api/auth/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      toast.success("User added successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add client. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="mb-4">
        Add New Client
      </Typography>
      <DialogContent>
        {["businessName", "state", "firstName", "lastName", "email", "password"].map((field) => (
          <TextField
            key={field}
            label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            name={field}
            value={newUser[field]}
            onChange={handleInputChange}
            type={field === "password" ? "password" : "text"}
            fullWidth
            margin="dense"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate("/")} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddUser} variant="contained" color="primary">
          Add Client
        </Button>
      </DialogActions>
    </div>
  );
};

export default AddClient;
