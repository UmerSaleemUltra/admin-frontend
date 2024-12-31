import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { toast } from "react-toastify";  // Import toast for notifications
import { useNavigate } from "react-router-dom";

const fetchUsers = async () => {
  const response = await fetch(
    "https://buzz-filling-dashboard.vercel.app/api/auth/user/users"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data.users || [];
};

const ContactTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    businessName: "",
    state: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Function to load users
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers(); // Initial data load

    // Periodically fetch users every 30 seconds for real-time updates
    const intervalId = setInterval(() => {
      loadUsers();
    }, 30000); // Fetch users every 30 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

      const addedUser = await response.json();
      setUsers((prev) => [...prev, addedUser]);
      setIsDialogOpen(false);
      setNewUser({
        businessName: "",
        state: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      toast.success("User added successfully!");  // Show success toast
    } catch (error) {
      toast.error("Failed to add contact. Please try again.");  // Show error toast
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h2">
          Contacts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Contact
        </Button>
      </div>

      <div className="relative mb-6">
        <Search
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            color: "gray",
          }}
        />
        <TextField
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          style={{ paddingLeft: "40px" }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>State</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.businessName}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredUsers.length === 0 && (
        <Typography align="center" color="textSecondary" style={{ marginTop: "16px" }}>
          No contacts found
        </Typography>
      )}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Add New Contact</DialogTitle>
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
          <Button onClick={() => setIsDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} variant="contained" color="primary">
            Add Contact
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactTable;
