import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import "../App.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <Typography variant="h4" className="dashboard-heading">
        Welcome to the Dashboard
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
