import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../Redux/Actions/userActions';
import {Container, TextField, Button, MenuItem, FormControl, InputLabel, Select, Box, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ email, password, role }));
        console.log({ email, password, role });
        setEmail("");
        setPassword("");
        setRole("");
    };

    return (
        <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          Register
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        <FormControl variant="outlined" fullWidth required>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Customer">Customer</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
        <Typography variant="body2" align="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
    );
};

export default Register;
