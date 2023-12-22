// AppBar.js

import * as React from 'react';
import { useEffect } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { logOut } from '../../src/redux/features/auth-slice';
import NavBar from '../../comps/NavBar'
import Profile from '../user/profile';
import MessageBoard from '../home/MessageBoard';
// import CounterComponent from '../test/CounterComponent';

import { useProfileData, fetchUserProfile } from "../user/profileUtils";
import IsLoggedIn from '../user/isloggedin';
import axios from "axios";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function PrimarySearchAppBar() {

    const { username } = useProfileData();
    let isLoggedIn = false;

    useEffect(() => {
        // Fetch user profile data when the component mounts
        fetchUserProfile();
    }, []); // Empty dependency array means this effect runs once when the component mounts


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        // Call the logout function from AuthContext

        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:4500/authentication/logout',
        }).then((res) => {
            if (/^20900/.test(res.data)) {
                // router.push('/user/login');
                // logOut();
                dispatch(logOut());
                router.push('/user/login');
                handleMenuClose();
            }
        });

        await router.push('/user/login');
        handleMenuClose();

    };

    if (username) {
        isLoggedIn = true;
    }
    // console.log('isLoggedIn in AppBar ' + isLoggedIn);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const testAlert = (event) => {
        const name = event.buttonName;
        if (name === 'mailButton') {
            router.push('/user/messagecenter');
        };
        if (name === 'homeButton') {
            router.push('/');
        };
        if (name === 'contextButton') { alert ('Context route')};

        if (name === 'login') {
            router.push('/user/login');
            handleMenuClose();
        };

        if (name === 'logout') {

        };

        if (name === 'notificationButton') {
            router.push('/user/notificationcenter');
            handleMenuClose();
        };

        if (name === 'profileButton') {
            router.push('/user/profile');
            handleMenuClose();
        };
        if (name === 'myAccountButton') {
            router.push('/user/accountdetail');
            handleMenuClose();};
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem
                onClick={() => testAlert({
                buttonName: "profileButton"
            })}>Profile</MenuItem>

            <MenuItem
                onClick={() => testAlert({
                    buttonName: "myAccountButton"
                })}>My Account</MenuItem>

            <MenuItem
                onClick={() => testAlert({
                    buttonName: "login"
                })}>Login</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#95232F' }}>
                <Toolbar >
                    <NavBar></NavBar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        onClick={() => testAlert({
                            buttonName: "homeButton"
                        })}
                    >
                        <Profile />
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        {isLoggedIn && username !== null && (

                        <IconButton  size="large" aria-label="show 4 new mails" color="inherit"
                                    onClick={() => testAlert({
                                        buttonName: "mailButton"
                                    })}>
                            <Badge badgeContent={14} color="error" >
                                <MailIcon/>
                            </Badge>
                        </IconButton>

                        )}

                        {isLoggedIn && username !== null && (
                        <IconButton size="large" aria-label="show 17 new notifications" color="inherit"
                                    onClick={() => testAlert({
                                        buttonName: "notificationButton"
                                    })}>
                            <Badge badgeContent={7} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        )}

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none', color: 'black'} }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                <MessageBoard />
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
