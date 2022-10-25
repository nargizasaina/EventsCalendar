import usersSlice from "../slices/usersSlice";

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    facebookLoginRequest,
    addFriendRequest,
    addFriendSuccess,
    addFriendFailure,
    logoutRequest
} = usersSlice.actions;