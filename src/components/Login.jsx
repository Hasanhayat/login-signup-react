import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import "../App.css";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    },
  });

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5">Login</Typography>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          className="auth-btn"
          fullWidth
        >
          Login
        </Button>
        <Typography className="auth-link">
          Don't have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
