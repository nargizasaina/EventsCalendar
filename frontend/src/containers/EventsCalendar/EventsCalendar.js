import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMyEventsRequest} from "../../store/actions/eventsActions";
import {Button, Grid} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import MyEvent from "../../components/MyEvent/MyEvent";

const EventsCalendar = () => {
    const dispatch = useDispatch();
    const myEvents = useSelector(state => state.events.myEvents);
    const fetchLoading = useSelector(state => state.events.fetchLoading);

    useEffect(() => {
        dispatch(fetchMyEventsRequest());
    }, [dispatch]);

    console.log(myEvents);

    const onDeleteEvent = id => {
        console.log(id);
    };

    return (
        <Grid container direction="column">
            <Grid container spacing={1} item justifyContent="flex-end" >
                <Button variant="contained" sx={{marginRight: '7px'}}>Add Event</Button>
                <Button variant="contained" sx={{marginRight: '7px'}}>Invite friend</Button>
                <Button variant="contained" sx={{marginRight: '7px'}}>View friends</Button>
            </Grid>
            {fetchLoading
                ? <Spinner/>
                : <Grid item margin="15px">
                    {myEvents.map(event => (
                        <MyEvent
                            key={event._id}
                            id={event._id}
                            title={event.title}
                            datetime={event.datetime}
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