import React, {useRef, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(theme => ({
    input: {
        display: "none",
    }
}));

const FileInput = ({onChange, name, label, error}) => {
    const inputRef = useRef();
    const {classes} = useStyles();
    const [filename, setFilename] = useState('');

    const onFileChange = e => {
        if (e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }
        onChange(e);
    };

    const activateInput = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type="file"
                name={name}
                onChange={onFileChange}
                className={classes.input}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs>
                    <TextField
                        variant="outlined"
                        disabled
                        fullWidth
                        label={label}
                        value={filename}
                        onClick={activateInput}
                        error={Boolean(error)}
                        helperText={error}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={activateInput}>Browse</Button>
                </Grid>
            </Grid>
        </>
    );
};
export default FileInput;