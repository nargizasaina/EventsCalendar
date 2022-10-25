import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteFriendRequest, fetchFriendsRequest} from "../../store/actions/usersActions";
import {Box, Button, Typography} from "@mui/material";

const ViewFriends = () => {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.users.user.friends);

    useEffect(() => {
        dispatch(fetchFriendsRequest());
    }, [dispatch]);

    const onDelete = id => {
        dispatch(deleteFriendRequest(id));
    };

    return (
        <Box width="400px" margin="0 auto">
            <h2> My Friends</h2>
            {friends.length > 0
                ? friends.map(friend => (
                    <Box
                        key={friend._id}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        border="1px solid grey"
                        padding="5px 10px"
                        borderRadius="3px"
                        margin="3px 0"
                    >
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                {friend.displayName}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {friend.email}
                            </Typography>
                        </Box>
                        <Button type="button" onClick={() => onDelete(friend._id)} color="error">Delete</Button>
                    </Box>
                ))
                : <h3> There are no friends</h3>
            }
        </Box>
    );
};

export default ViewFriends;