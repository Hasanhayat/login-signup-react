import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2>Log In</h2>
      <form onSubmit={formik.handleSubmit} className="shadow p-4 rounded-4">
        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            setError('');
          }}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email ? formik.errors.email : error}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formik.values.password}
          onChange={(e) => {
            formik.handleChange(e);
            setError('');
          }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password ? formik.errors.password : error
          }
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className="mt-3"
        >
          Log In
        </Button>
        <Button
          variant="text"
          onClick={() => navigate('/signup')}
          fullWidth
          className="mt-3"
        >
          Don't have an account? Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Login;
