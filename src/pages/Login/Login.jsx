import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";  
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: 'test@example.com',
      password: '1234',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if(!data.payload ){
      return alert('Failed to log in');
    }
    if (data.payload && 'token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    } 
  };

  if (isAuth) {
    return <Navigate to="/News" />;
  }

  return (
    <Paper className={`${styles.root} bg-gray-800`}>
      <Typography className={styles.title} variant="h5">
        Вход в аккаунт
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Вкажіть пошту' })}
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Вкажіть пароль' })}
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
