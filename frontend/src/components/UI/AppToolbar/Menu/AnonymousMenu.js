import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <Button component={Link} to="/registration" color="inherit">
                Sign Up
            </Button>
            <Button component={Link} to="/login" color="inherit">
                Sign In
            </Button>
        </>
    );
};

export default AnonymousMenu;