import React from 'react';
import { Container, Button, Box, Typography, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/Actions/userActions'; // Adjust the import path according to your project structure

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Incorrect email')
      .required('Email cannot be empty'),
    password: Yup.string()
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .min(8, 'Password must be at least 8 characters long')
      .required('Password cannot be empty'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await dispatch(login(values));
      console.log(response.data.admin_id);

      if (typeof response.data.admin_id === 'number') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          marginTop: 8,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Box>
              {errors.submit && (
                <Typography color="error" variant="body2" align="center" sx={{ mb: 2 }}>
                  {errors.submit}
                </Typography>
              )}
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" align="center">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
