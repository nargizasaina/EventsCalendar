import React from 'react';
import {useDispatch} from "react-redux";
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import {facebookLogin} from "../../store/actions/usersActions";
import {facebookAppId} from '../../config';

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        dispatch(facebookLogin(response));
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            callback={facebookResponse}
            render={props => (
                <Button
                    sx={{marginBottom: '12px'}}
                    fullWidth
                    color="primary"
                    variant="contained"
                    startIcon={<FacebookIcon/>}
                    onClick={props.onClick}
                >
                    Enter with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;