import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginRequest} from "../../store/actions/usersActions";
import {Alert, Box, Container, Grid, Typography} from "@mui/material";
import InputField from "../../components/UI/Form/InputField/InputField";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link} from "react-router-dom";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const Login = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.loginLoading);
    const error = useSelector(state => state.users.loginError);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    // useEffect(() => {
    //     return () => {
    //         dispatch(clearLoginErrors());
    //     };
    // }, [dispatch]);

    const onChange = e => {
        const {name, value} = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        dispatch(loginRequest({...user}));
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{paddingTop: 6}}>
                <Typography component="h1" variant="h5" color="#fff">
                    Sign in
                </Typography>

                {error && (
                    <Alert sx={{width: '100%'}} severity="error">Error! {error.message}</Alert>
                )}

                <Box component="form" onSubmit={onSubmit}>
                    <InputField
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        label="Email"
                        required={true}
                        margin="normal"
                    />
                    <InputField
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        label="Password"
                        type="password"
                        required={true}
                        margin="normal"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        disabled={loading}
                        loadingPosition="start"
                        startIcon={<AccountCircleIcon />}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                    <FacebookLogin/>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link to="/registration">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;