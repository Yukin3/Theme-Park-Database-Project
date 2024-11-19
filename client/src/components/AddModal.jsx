import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import axios from "axios";

const AddModal = ({ open, editedData, onFieldChange, onClose, apiUrl, onSuccess, columns }) => {

  // Initialize all fields to empty values when adding (initialize based on editable columns)
  const initializeFields = () => {
    const fields = {};
    columns.forEach((column) => {
      if (column.editable) {
        fields[column.field] = '';  // Initialize fields to empty for add
      }
    });
    return fields;
  };

  // If `editedData` is empty, initialize with empty values based on columns
  const currentData = editedData || initializeFields();

  const isSaveEnabled = () => {
    // Check if any field has a value
    return Object.values(currentData).some((value) => value !== '');
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(apiUrl, currentData);  // Use POST request to add new data
      console.log("Row added successfully:", response.data);
      onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Shop</DialogTitle>
      <DialogContent>
        {columns?.map((column) =>
          column.editable ? (
            <TextField
              key={column.field}
              label={column.headerName}
              fullWidth
              margin="normal"
              value={currentData[column.field] || ""}
              onChange={(e) => onFieldChange(e, column.field)}
            />
          ) : null
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSaveChanges} color="primary" disabled={!isSaveEnabled()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
