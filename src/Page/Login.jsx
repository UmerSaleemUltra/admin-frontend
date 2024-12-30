import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../theme"; // Import your existing theme
import { ThemeProvider } from "@emotion/react";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/dashboard");
    }
  }, [navigate]);
};

const Login = () => {
  useAuthRedirect(); // Redirect if token exists
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://buzz-filling-dashboard.vercel.app/api/auth/admin/login",
        { email, password }
      );

      toast.success("Login successful!", { position: "top-center" });
      localStorage.setItem("authToken", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage, { position: "bottom-left" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "error.main" }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: "1rem" }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
              sx={{ input: { color: "error.main" } }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              required
              sx={{ input: { color: "error.main" } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "error.main",
                "&:hover": { bgcolor: "error.dark" },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "error.main",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Don&apos;t have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
