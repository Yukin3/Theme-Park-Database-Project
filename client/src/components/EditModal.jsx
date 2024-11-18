import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import axios from "axios";

const EditModal = ({ open, editedData, onFieldChange, onClose, apiUrl, onSuccess, originalData }) => {

  // Ensure editedData and originalData are always available
  if (!editedData || !originalData) {
    return null;  // Or handle error state
  }

  // Check if the "Save" button should be enabled
  const isSaveEnabled = () => {
    // Compare edited data with the original data (check for any changes)
    return Object.keys(editedData).some(
      (key) => editedData[key] !== originalData[key]
    );
  };

  // Handle saving the changes (API call)
  const handleSaveChanges = async () => {
    if (!editedData) return;

    try {
      // Make the API call (PATCH)
      const response = await axios.patch(apiUrl, editedData);
      console.log("Row updated successfully:", response.data);
      onSuccess(response.data); // Pass the updated data to the parent
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Render the modal content
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Facility</DialogTitle>
      <DialogContent>
        {Object.keys(editedData).map((key) => (
          key !== "shop_id" && (  // Exclude ID field or any other fields you don't want to edit
            <TextField
              key={key}
              label={key}
              value={editedData[key] || ''}
              onChange={(e) => onFieldChange(e, key)} // Update the parent state with the new value
              fullWidth
              margin="normal"
            />
          )
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button
          onClick={handleSaveChanges}
          color="primary"
          disabled={!isSaveEnabled()} // Disable button if no changes were made
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
