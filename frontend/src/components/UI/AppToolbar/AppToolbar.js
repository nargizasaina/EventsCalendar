import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserMenu from "./Menu/UserMenu";
import AnonymousMenu from "./Menu/AnonymousMenu";

const useStyles = makeStyles()(theme => ({
    appBar: {
        background: '#110e52'
    },
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
    },
}));

const AppToolbar = () => {
    const { classes } = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <ToastContainer />
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">
                                <Link to="/" className={classes.mainLink}>
                                    Your Music Application
                                </Link>
                            </Typography>
                        </Grid>

                        <Grid item>
                            {user ? <UserMenu user={user}/> : <AnonymousMenu/>}

                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};

export default AppToolbar;