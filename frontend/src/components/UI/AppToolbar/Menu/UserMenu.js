import React, {useState} from 'react';
import {Box, Button, Menu} from "@mui/material";
import {Link} from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../../../store/actions/usersActions";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" paddingTop={1}>

                <Button component={Link} to="/track_history" color="inherit"
                        sx={{marginRight: '20px', '&:hover': {color: 'blue'}}}>
                    Track History
                </Button>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button
                    id="basic-button"
                    color="inherit"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Hello, {user.displayName}!
                </Button>
            </Box>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose} component={Link} to="/artists/new" color="inherit">Add Artist</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/albums/new" color="inherit">Add Album</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/tracks/new" color="inherit">Add Track</MenuItem>
                <MenuItem onClick={() => dispatch(logoutRequest())}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;