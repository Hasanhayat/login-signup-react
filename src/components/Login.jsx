import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login - My App';
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      let userFound = false;

      for (const user of storedUsers) {
        if (user.email === values.email) {
          userFound = true;
          if (user.password === values.password) {
            navigate('/dashboard');
          } else {
            setPasswordError('Incorrect password');
          }
          break;
        }
      }

      if (!userFound) {
        setEmailError('Email not registered');
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            setEmailError('');
          }}
          error={formik.touched.email && (Boolean(formik.errors.email) || Boolean(emailError))}
          helperText={formik.touched.email ? formik.errors.email : emailError}
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
            setPasswordError('');
          }}
          error={formik.touched.password && (Boolean(formik.errors.password) || Boolean(passwordError))}
          helperText={formik.touched.password ? formik.errors.password : passwordError}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            ),
          }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
        <Button
          variant="text"
          fullWidth
          onClick={() => navigate('/signup')}
          className="mt-3"
        >
          Don't have an account? Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Login;
