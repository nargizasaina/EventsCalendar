import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";
import './Layout.css';

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <main className="Main">
                <Container maxWidth="xl" sx={{padding: "25px 10px"}}>
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;