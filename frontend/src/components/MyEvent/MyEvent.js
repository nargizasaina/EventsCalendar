import React from 'react';
import {Box, Button, Card, CardHeader, Typography} from "@mui/material";

const MyEvent = ({id, title, duration, date, onClick}) => {
    return (
        <Card sx={{display: "flex", justifyContent: "space-between", maxWidth: '600px', margin: '7px auto'}}>
            <Box>
                <CardHeader title={title}/>
                <Typography>
                    <b>Duration:</b> {duration} hours
                </Typography>
                <Typography>
                    <b>Datetime:</b> {date}
            </Typography>
            </Box>
            <Button color="error" onClick={() => onClick(id)}>X</Button>

        </Card>
    );
};

export default MyEvent;