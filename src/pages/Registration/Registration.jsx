import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Paper, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const [loading, setLoading] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const data = await dispatch(fetchRegister(values)); // Передача значень з форми у fetchRegister
      setLoading(false);
      if (!data.payload) {
        setSnackbarMessage('Failed to register');
        setOpenSnackbar(true);
      } else {
        window.localStorage.setItem('token', data.payload.token);
        reset({
          fullName: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSnackbarMessage('Failed to register');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isAuth) {
    return <Navigate to="/News" />;
  }

  return (
    <Paper className={`${styles.root} bg-gray-800`}>
      <Typography className={styles.title} variant="h5">
        Create Account
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName)}
          helperText={errors.fullName?.message}
          type="text"
          {...register('fullName', { required: 'Please enter your full name' })}
          className={styles.field}
          label="Full Name"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Please enter your email' })}
          className={styles.field}
          label="Email"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Please enter your password' })}
          className={styles.field}
          label="Password"
          fullWidth
        />
        <Button disabled={!isValid || loading} type="submit" size="large" variant="contained" fullWidth>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
