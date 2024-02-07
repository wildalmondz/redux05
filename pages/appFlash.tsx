import '../styles/globals.css';
import Link from 'next/link';
import React from 'react';
// import Container from '@mui/material/Container';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import footers from './api/footers';
// import { AuthProvider } from './api/AuthContext';
import AuthProvider from "@components/AuthProvider";
import AuthListener from "@components/AuthListener"; // Import the new component
import { ReduxProvider } from "../src/redux/provider";
import Footer from "../pages/home/Footer";
import MessageBoard02 from "../pages/home/MessageBoard02";
import AppBar from './home/AppBar';

interface FooterItem {
    title: string;
    description: { title: string; url: string }[];
}

interface Footer {
    title: string;
    description: FooterItem[];
}

interface AppProps {
    Component: React.ElementType;
    pageProps: any;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <AuthProvider>
                <AppBar />
                <MessageBoard02 text={undefined} />
                <Component {...pageProps} />
            </AuthProvider>
            {/* Footer */}
            <Footer />
            {/* End footer */}
        </>
    );
};

export default App;
