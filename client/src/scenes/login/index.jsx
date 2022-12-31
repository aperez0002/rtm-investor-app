import React from "react";
import { useForm } from "react-hook-form";
import { Grid, Paper, TextField, Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "state/authApi";
import { useEffect, useState } from "react";
import { ErrorSharp, NoEncryption } from "@mui/icons-material";
import { themeSettings } from "theme";

const LoginScreen = () => {
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch();


    const { register, handleSubmit } = useForm();


    const navigate = useNavigate();

    const theme = useTheme();

    useEffect(() => {
        console.log("user info", userInfo)
        if (userInfo) {
            navigate('/dashboard')
        }
    }, [navigate, userInfo])

    const submitForm = (data) => {
       
        console.log('I AM IN THE SUBMIT FUNCTION')
        console.log('data', data)
        dispatch(userLogin(data));
    }

    const paperStyle={padding:20, height:'auto',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit(submitForm)}>
                    <TextField 
                        sx={{ mb:"15px"}}
                        label='Email' 
                        placeholder='Enter email' 
                        type="email"
                        {...register('email')}
                        fullWidth 
                        required
                    />
                    <TextField 
                        label='Password' 
                        placeholder='Enter password' 
                        type='password'
                        {...register('password')}
                        fullWidth 
                        required
                    />
                    
                    <Button 
                        type='submit' 
                        disabled={loading} 
                        sx={{ color: theme.palette.primary[100] }} 
                        variant="contained" 
                        style={btnstyle} 
                        fullWidth
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default LoginScreen;
