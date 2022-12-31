import React from "react";
import { useForm } from "react-hook-form";
import { Grid, Paper, TextField, Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "state/authApi";
import { useEffect, useState } from "react";
import { ErrorSharp, NoEncryption } from "@mui/icons-material";
import { themeSettings } from "theme";
import Error from "components/Error";

const RegisterScreen = () => {
    const [ customError, setCustomeError ] = useState(null);
    const { loading, userInfo, error, success } = useSelector((state) => state.auth)
    const dispatch = useDispatch();


    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const theme = useTheme();

    useEffect(() => {
        // navigate('/dashboard')
        if (success) navigate("/login")
    }, [navigate, userInfo, success])

    const submitForm = (data) => {
       
        console.log('I AM IN THE SUBMIT FUNCTION')
        console.log('data', data)

        if(data.password !== data.confirmPassword) {
            setCustomeError('Password mismatch')
            return
        }

        data.email = data.email.toLowerCase();

        dispatch(registerUser(data))
    }

    const paperStyle={padding :20,height:'auto',width:280, margin:"20px auto"}
    const btnstyle={margin:'8px 0'}

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit(submitForm)}>
                    {error && <Error>{error}</Error>}
                    {customError && <Error>{customError}</Error>}
                    <TextField 
                        label='Name' 
                        placeholder='Enter first and last name' 
                        type="text"
                        {...register('name')}
                        fullWidth 
                        required
                    />

                    <TextField 
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
                    <TextField 
                        label='Confirm Password' 
                        placeholder='Enter password' 
                        type='password'
                        {...register('confirmPassword')}
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
                        Register
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
}

export default RegisterScreen;
