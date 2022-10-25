import usersSlice from "../slices/usersSlice";

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    facebookLoginRequest,
    fetchFriendsRequest,
    fetchFriendsSuccess,
    fetchFriendsFailure,
    addFriendRequest,
    addFriendSuccess,
    addFriendFailure,
    deleteFriendRequest,
    deleteFriendSuccess,
    deleteFriendFailure,
    logoutRequest
} = usersSlice.actions;