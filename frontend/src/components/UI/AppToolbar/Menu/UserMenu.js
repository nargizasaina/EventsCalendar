import React, {useState} from 'react';
import {Box, Button, Menu} from "@mui/material";
import {Link} from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import {useDispatch} from "react-redux";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import {logoutUser} from "../../../../store/actions/usersActions";
import {apiUrl} from "../../../../config";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    let avatar;
    if (user.avatarImage && user.facebookId) {
        avatar = user.avatarImage;
    } else {
        avatar = apiUrl + '/' + user.avatarImage;
    }

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
            {user.role === 'user' &&
                <Button component={Link} to="/track_history" color="inherit"
                        sx={{marginRight: '20px', '&:hover': {color: 'blue'}}}>
                    Track History
                </Button>
            }
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
                <Avatar
                    alt={user.displayName.toUpperCase()}
                    src={avatar}
                    sx={{marginLeft: '5px', marginBottom: '5px', bgcolor: deepPurple[500]}}/>
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
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;