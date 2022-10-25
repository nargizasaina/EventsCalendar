import React from 'react';
import {Box, Button, Card, CardHeader, Typography} from "@mui/material";

const Event = (props) => {
    return (
        <Card
            sx={{display: "flex", justifyContent: "space-between",
                maxWidth: '600px', margin: '7px auto', padding: '5px',
                alignItems: 'center'}}>
            <Box>
                <CardHeader title={props.title}/>
                <Typography>
                    <b>Duration:</b> {props.duration} hours
                </Typography>
                <Typography>
                    <b>Date: {new Date(props.date).toLocaleDateString([], {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })}</b>
                </Typography>
            </Box>
            {props.email
                ? <Box>
                    <Typography>
                        <b>{props.email}</b>
                    </Typography>
                    <Typography>
                        <b>{props.displayName}</b>
                    </Typography>
                </Box>
                : <Button color="error" onClick={() => props.onClick(props.id)}>X</Button>
            }
        </Card>
    );
};

export default Event;