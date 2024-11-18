import React from 'react';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const EditButton = ({ onClick, disabled }) => {
  return (
    <IconButton
      disabled={disabled}
      onClick={onClick} 
      sx={{ color: disabled ? 'grey.100' : 'primary.main' }}
    >
      <EditOutlinedIcon sx={{ fontSize: "30px" }} />
    </IconButton>
  );
};

export default EditButton;
