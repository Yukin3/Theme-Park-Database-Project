import { Box,Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PrintButton from "../../components/PrintButton";
import AddButton from "../../components/AddButton";
import DownloadButton from "../../components/DownloadButton";
import { useEffect, useState } from "react";
import axios from "axios"; //install if have !! needed for API requests
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";

//facility_id, facility_name, facility_type, location_id, status
const Facilities = ({ isOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [FacilitiesData, setFacilitiesData] = useState([]);

	const [loading, setLoading] = useState(true); // Loading state
	const [selectedRow, setSelectedRow] = useState([]);
	const [editingRow, setEditingRow] = useState(null);	
	const [openModal, setOpenModal] = useState(false);
	const [editedData, setEditedData] = useState({});


	useEffect(() => {
		const fetchFacilitiesData = async () => {
			try {
				const response = await axios.get(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/park-factilities/"
				);
				console.log("Fetched facilites:", response.data);
				setFacilitiesData(response.data);
			} catch (error) {
				console.error("Error fetching facilities:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFacilitiesData();
	}, []);


		// Handle row selection
		const handleRowSelection = (selectionModel) => {
			setSelectedRow(selectionModel);
			const selectedRowData =
				selectionModel.length === 1
					? FacilitiesData.find((facility) => facility.facility_id === selectionModel[0])
					: null;
			setEditingRow(selectedRowData);
			console.log("Editing Row Data:", selectedRowData); // Log for debugging
		};



	//open modal and handle edits
	const handleEditClick = (row) => {
		setEditingRow(row);
		setEditedData(row); 
		setOpenModal(true);
	  };
	  const handleFieldChange = (e, field) => {
		setEditedData((prev) => ({
		  ...prev,
		  [field]: e.target.value,
		}));
	  };


  //Process and save edits, close modal
  const handleSaveChanges = async () => {
    if (!editingRow) return;

    const apiUrl = `https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/park-factilities/${editingRow.facility_id}`;

    try {
      const response = await axios.put(apiUrl, editedData);
      console.log("Row updated successfully:", response.data);
      setFacilitiesData((prev) =>
        prev.map((facility) =>
          facility.facility_id === response.data.facility_id ? response.data : facility
        )
      );
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditedData({});
  };



	const columns = [
		{ field: "facility_id", headerName: "Facility ID", flex: 1 },
		{
			field: "facility_name",
			headerName: "Facility Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{ field: "facility_type", headerName: "Facility Type", flex: 1 },
		{ field: "location_id", headerName: "Location ID", flex: 1 },
		{ field: "status", headerName: "Status", flex: 1 },
		{
			field: "actions",
			headerName: "Actions",
			renderCell: (params) => (
			  <EditButton
				editingRow={params.row}
				disabled={false}
				onSuccess={handleSaveChanges}
			  />
			),
		  },
	];


	return (
		<Box
			m="20px"
			ml={isOpen ? "250px" : "80px"} // Adjust left margin based on isOpen
			transition="margin 0.3s ease" // Smooth transition for margin
		>

			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
			<Header
				title="Park Facilities"
				subtitle="View park facilities (restrooms, etc)"
			/>				<Box display="flex" alignItems="center">
					<PrintButton
					apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/park-factilities/"
					columns={columns}
					/>	
					<DownloadButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/park-factilities/"
						fileName="customers_report.csv"
						columns={columns}
					/>
					<DeleteButton
						selectedItems={selectedRow}
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/park-factilities/"
						onDeleteSuccess={() => {
							setFacilitiesData((prevData) =>
								prevData.filter(
									(shop) =>
										!selectedRow.includes(shop.shop_id)
								)
							);
							setSelectedRow([]);
						}}
					/>
					<AddButton navigateTo={"/facilitiesform"} />
			</Box>
			</Box>



			<Box
				m="40px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .name-column--cell": {
						color: colors.greenAccent[300],
					},
					"& .MuiDataGrid-columnHeader": {
						backgroundColor: colors.blueAccent[700],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor: colors.blueAccent[700],
					},
				}}
			>
				<DataGrid
					checkboxSelection
					rows={FacilitiesData}
					columns={columns} // Use the columns based on the toggle
					components={{ Toolbar: GridToolbar }}
					loading={loading}
					getRowId={(row) => row.facility_id}
					onRowSelectionModelChange={handleRowSelection}
				/>
			</Box>

			<Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Facility</DialogTitle>
        <DialogContent>
          {Object.keys(editedData).map((key) => (
            key !== "facility_id" && ( // Exclude ID field from the modal
              <TextField
                key={key}
                label={key}
                value={editedData[key] || ''}
                onChange={(e) => handleFieldChange(e, key)}
                fullWidth
                margin="normal"
              />
            )
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


		</Box>
	);
};

export default Facilities;
