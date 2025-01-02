import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button, Typography } from "@mui/material";
import "../App.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  useEffect(() => {
    document.title = "Dashboard - My App";
  }, []);
  return (
    <div className="dashboard-container">
      <Typography className="dashboard-header">
        Welcome, {user?.name || "User"}!
      </Typography>
      <Typography>
        You are successfully logged in. Explore our features and enjoy your
        stay.
      </Typography>
      <Button
        variant="contained"
        className="dashboard-logout-btn"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
