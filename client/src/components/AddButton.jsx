import React from 'react';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddButton = ({ onClick}) => {



    return (
        <IconButton onClick={onClick}>
            <AddCircleOutlineIcon sx={{ fontSize: "30px" }} />
        </IconButton>
    );
};

export default AddButton;
