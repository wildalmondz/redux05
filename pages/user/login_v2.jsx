import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const SignInSide = (props) => {
    if (authService.isLoggedIn()) {
        props.history.push('./home');
    }

    const [account, setAccount] = useState({ username: '', password: '' });

    const handelAccount = (property, event) => {
        const accountCopy = { ...account };
        accountCopy[property] = event.target.value;
        setAccount(accountCopy);
    };

    const isVerifiedUser = (username, password) => {
        return users.find((user) => user.username === username && user.password === password);
    };

    const handelLogin = () => {
        if (isVerifiedUser(account.username, account.password)) {
            authService.doLogIn(account.username);
            setAccount({ username: '', password: '' });
            props.history.push('/home');
        }
    };

    const rootStyle = {
        height: '100vh',
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const sizeStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const paperStyle = {
        margin: 'theme.spacing(2, 6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const avatarStyle = {
        margin: 'theme.spacing(0)',
        backgroundColor: theme.palette.secondary.main,
    };

    const formStyle = {
        width: '100%', // Fix IE 11 issue.
        marginTop: 'theme.spacing(1)',
    };

    const submitStyle = {
        margin: 'theme.spacing(3, 0, 2)',
    };

    return (
        <Grid container component="main" sx={rootStyle}>
            <CssBaseline />
            <Grid className={sizeStyle} item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
                <div sx={paperStyle}>
                    <Avatar sx={avatarStyle}>
                        <h4>Icon here</h4>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form sx={formStyle} noValidate>
                        <TextField
                            onChange={(event) => handelAccount('username', event)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => handelAccount('password', event)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={submitStyle}
                            onClick={handelLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>{/* Copyright component */}</Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

export default SignInSide;
