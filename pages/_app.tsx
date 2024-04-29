// _app.tsx
import '../styles/globals.css';
import Link from 'next/link';
import React from 'react';
// import Container from '@mui/material/Container';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import { Typography, TypographyProps } from '@mui/material';
import footers from './api/footers';
// import { AuthProvider } from './api/AuthContext';
import AuthProvider from "@components/AuthProvider";
import AuthListener from "@components/AuthListener"; // Import the new component
import { ReduxProvider } from "../src/redux/provider";
import MessageBoard02 from "../pages/home/MessageBoard02";
import AppBar from './home/AppBar';

interface FooterItem {
    title: string;
    description: [{ title: string; url: string }];
}

interface Footer {
    title: string;
    description: FooterItem[];
}

interface AppProps {
    Component: React.ElementType;
    pageProps: any;
}

function Copyright(props: TypographyProps<'span'>) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://wildalmonds.com/">
                WildAlmonds
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <AuthProvider>
                <AppBar />
                <Component {...pageProps} />
            </AuthProvider>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </>
    );
};

export default App;
