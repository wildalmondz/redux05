import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '@/styles/signup.module.css'

import { strengthColor, strengthIndicator } from '../lib/strength';
import axios from "axios";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
    const [strength, setStrength] = useState('');
    const [color, setColor] = useState('#bbb');  // Add color state

    /*
    const [ registerUsername, setRegisterUsername, ] = useState('');
    const [ registerPassword, setRegisterPassword, ] = useState('');

     */

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = new FormData(event.currentTarget);

        axios({
            method: "post",
            data: {
                username: userData.get('email'),
                password: userData.get('password')
            },
            withCredentials: true,
            url: "http://localhost:4500/register"
        }).then((res) => console.log(res)).catch((err) => console.log(err));
    }


    /*
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('password') !== data.get('confirmed')) {
            alert('Password and Confirm Passwords do not match');
            return;
        }

        console.log({
            email: data.get('email'),
            firstname: data.get('firstName'),
            lastname: data.get('lastName'),
            password: data.get('password'),
            confirmed: data.get('confirmed'),
        });

    };

     */

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (name === 'password') {
            const newStrength = strengthIndicator(value);
            const newColor = strengthColor(strength);

            setStrength(newStrength);
            setColor(newColor);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 50, height: 50}}
                            src={'https://wildalmonds.com/api/uploads/1b1dd9d1-67b9-45a6-9410-b063303c0b92_wildAlmondsLogo.jpeg'}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmed"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                />
                            </Grid>
                              Passwords must contain:
                                <div className={styles.tab}>
                                    at least 8 characters<br/>
                                    upper and lower case letters<br/>
                                    at least one number<br/>
                                    at least one special character such as:<br/>
                                    [!@#%^&*)(+=._-]<br/><br/>
                                    when <span style={{ color: `${color}` }}>Strength</span> text turns <span>green</span> you are go!<br/>
                                </div>
                                <br/>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}