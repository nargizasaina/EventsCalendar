import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteEventRequest, fetchMyEventsRequest} from "../../store/actions/eventsActions";
import {Box, Button, Grid, TextField} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import MyEvent from "../../components/MyEvent/MyEvent";
import {Link} from "react-router-dom";
import {addFriendRequest} from "../../store/actions/usersActions";

const EventsCalendar = () => {
    const dispatch = useDispatch();
    const myEvents = useSelector(state => state.events.myEvents);
    const fetchLoading = useSelector(state => state.events.fetchLoading);
    const addError = useSelector(state => state.users.error);

    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchMyEventsRequest());
    }, [dispatch]);

    const onDeleteEvent = async id => {
        await dispatch(deleteEventRequest(id));
        dispatch(fetchMyEventsRequest());
    };

    const searchFriendSubmit = async e => {
        e.preventDefault();
        await dispatch(addFriendRequest(search));
        setSearch('');
    };

    const getError = () => {
        try{
            return addError.error;
        } catch {
            return undefined;
        }
    };

    return (
        <Grid container direction="column">
            <Grid container spacing={1} item justifyContent="space-between" >
                <Box>
                    <Button component={Link} to="/events/new" variant="contained" sx={{marginRight: '7px'}}>Add Event</Button>
                    <Button variant="contained" sx={{marginRight: '7px'}}>View friends</Button>
                </Box>
                    <form style={{display: "inline-block"}} onSubmit={searchFriendSubmit}>
                        <TextField
                            onChange={(e) => {
                                setSearch(e.target.value)}}
                            name="search"
                            label="Search"
                            value={search}
                            type="email"
                            variant="standard"
                            error={!!(getError())}
                            helperText={getError()}
                        />
                        <Button type="submit" sx={{marginRight: '7px'}}>Invite friend</Button>
                    </form>

            </Grid>
            {fetchLoading
                ? <Spinner/>
                : <Grid item margin="15px">
                    {myEvents.map(event => (
                        <MyEvent
                            key={event._id}
                            id={event._id}
                            title={event.title}
                            date={event.date}
                            duration={event.duration}
                            onClick={onDeleteEvent}
                        />
                    ))}
                </Grid>
            }
        </Grid>
    );
};

export default EventsCalendar;