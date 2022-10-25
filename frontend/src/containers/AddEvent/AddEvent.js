import React, {useState} from 'react';
import {Box, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import InputField from "../../components/UI/Form/InputField/InputField";
import {createEventRequest} from "../../store/actions/eventsActions";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import dayjs from 'dayjs';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import "react-datepicker/dist/react-datepicker.css";

const AddEvent = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.events.postLoading);
    const error = useSelector(state => state.events.postError);
    const [value, setValue] = React.useState(dayjs(new Date()));
    const [event, setEvent] = useState({
        title: '',
        duration: ''
    });

    const onChange = e => {
        const {name, value} = e.target;
        setEvent(prev => ({...prev, [name]: value}));
    };

    const onSubmit = async e => {
        e.preventDefault();
        await dispatch(createEventRequest({...event, date: value.toISOString()}));
        setEvent({
            title: '',
            duration: ''
        });
    };

    const errorHandler = fieldName => {
        try{
            return error.error[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Box>
            <form onSubmit={onSubmit}>
                <InputField
                    onChange={onChange}
                    name="title"
                    label="Title"
                    value={event.title}
                    margin="dense"
                    error={errorHandler('title')}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="Date"
                        value={value}
                        disablePast
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <InputField
                    onChange={onChange}
                    name="duration"
                    label="Duration"
                    value={event.duration}
                    margin="dense"
                    error={errorHandler('duration')}
                />
                <ButtonWithProgress
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                    sx={{ mt: 1}}
                >
                    Save
                </ButtonWithProgress>
            </form>
        </Box>
    );
};

export default AddEvent;