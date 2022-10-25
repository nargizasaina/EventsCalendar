import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteEventRequest, fetchAllEventsRequest, fetchMyEventsRequest} from "../../store/actions/eventsActions";
import {Box, Button, Grid, TextField} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Link} from "react-router-dom";
import {addFriendRequest} from "../../store/actions/usersActions";
import Event from "../../components/Event/Event";

const EventsCalendar = () => {
    const dispatch = useDispatch();
    const myEvents = useSelector(state => state.events.myEvents);
    const otherEvents = useSelector(state => state.events.otherEvents);
    const fetchLoading = useSelector(state => state.events.fetchLoading);
    const addError = useSelector(state => state.users.error);

    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchMyEventsRequest());
        dispatch(fetchAllEventsRequest());
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
                    <Button component={Link} to="/friends" variant="contained" sx={{marginRight: '7px'}}>View friends</Button>
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
                : <>
                    <Grid item margin="15px">
                        <h2>My Events</h2>
                        {myEvents.map(event => (
                            <Event
                                key={event._id}
                                id={event._id}
                                title={event.title}
                                date={event.date}
                                duration={event.duration}
                                onClick={onDeleteEvent}
                            />
                        ))}
                    </Grid>
                    <Grid item margin="15px">
                        <h2>Events of my Friends</h2>
                        {otherEvents.map(event => (
                            <Event
                                key={event._id}
                                id={event._id}
                                title={event.title}
                                date={event.date}
                                duration={event.duration}
                                email={event.owner.email}
                                displayName={event.owner.displayName}
                            />
                        ))}
                    </Grid>
                </>
            }
        </Grid>
    );
};

export default EventsCalendar;