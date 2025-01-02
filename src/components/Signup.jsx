import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import "../App.css";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(values);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    },
  });

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5">Signup</Typography>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
        <Button
          type="submit"
          variant="contained"
          className="auth-btn"
          fullWidth
        >
          Signup
        </Button>
        <Typography className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </form>
    </div>
  );
};

export default Signup;
