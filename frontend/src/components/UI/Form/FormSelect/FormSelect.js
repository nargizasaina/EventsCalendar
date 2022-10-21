import React from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const FormSelect = ({name, label, value, onChange, error, required, options}) => {
    return (
        <Grid item textAlign="left">
            <FormControl fullWidth error={Boolean(error)}>
                <InputLabel id={`${name}-label`}>{label}</InputLabel>
                <Select
                    labelId={`${name}-label`}
                    fullWidth
                    onChange={onChange}
                    name={name}
                    label={label}
                    value={value}
                    required={required}
                >
                    {options.map(option => (
                        <MenuItem key={option._id} value={option._id}>{option.title}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
        </Grid>
    );
};

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    required: PropTypes.bool,
};

export default FormSelect;