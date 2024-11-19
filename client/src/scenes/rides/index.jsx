import { Box, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import DownloadButton from "../../components/DownloadButton";
import AddButton from "../../components/AddButton";
import PrintButton from "../../components/PrintButton";
import DeleteButton from "../../components/DeleteButton";
import EditModal from "../../components/EditModal";
import EditButton from "../../components/EditButton";
import AddModal from "../../components/AddModal";

const Rides = ({ isOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();

	const [rides, setRides] = useState([]); // State for storing rides data
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [selectedRow, setSelectedRow] = useState([]);
	const [editingRow, setEditingRow] = useState(null);

	const [openModal, setOpenModal] = useState(false);
	const [editedData, setEditedData] = useState({});
	const [openAddModal, setOpenAddModal] = useState(false); 


		// Fetch rides from the backend
		useEffect(() => {
			const fetchRides = async () => {
				try {
					const response = await axios.get(
						"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/rides/"
					);
					console.log("Fetched rides:", response.data);
					setRides(response.data);
				} catch (error) {
					console.error("Error fetching rides:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchRides();
		}, []);


		// Handle row selection
		const handleRowSelection = (selectionModel) => {
			setSelectedRow(selectionModel);
			const selectedRowData =
				selectionModel.length === 1
					? rides.find((ride) => ride.ride_id === selectionModel[0])
					: null;
			setEditingRow(selectedRowData);
			console.log("Editing Row Data:", selectedRowData); // Log for debugging
		};


		const handleEditClick = (row) => {
			console.log("Editing click:", row); 
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
	
	
	  const handleSaveChanges = (updatedRow) => {
		setRides((prevData) =>
		  prevData.map((ride) =>
			ride.ride_id === updatedRow.ride_id ? updatedRow : ride
		  )
		);
	  };
	
	
	  const handleCloseModal = () => {
		setOpenModal(false);
		setEditedData({});
	  };




	  const handleAddClick = () => {
		setEditedData({}); // Initialize with empty data for new row
		setOpenAddModal(true);  // Open the Add Modal
	  };
	
	
	  const handleAddSuccess = (newRow) => {
		setRides((prevData) => [...prevData, newRow]);  // Add the new row to the data
	  };
	
	  const handleCloseAddModal = () => {
		setOpenAddModal(false);
	  };
	
	
	
		const columns = [
			{ field: "ride_id", headerName: "Ride ID", flex: 0.1, editable: true, },
			{ field: "section_id", headerName: "Section ID", flex: 0.1, editable: true, },
			{
				field: "name",
				headerName: "Name",
				flex: 0.3,
				cellClassName: "name-column--cell",
				editable: true,
			},
			{ field: "ride_type", headerName: "Ride Type", flex: 0.1, editable: true, },
			{ field: "last_inspected", headerName: "Last Inspected", flex: 0.1, editable: true, },
			{ field: "height_requirement", headerName: "Height Req.", flex: 0.1, editable: true, },
			{
				field: "capacity",
				headerName: "Capacity",
				type: "number",
				align: "left", 
				editable: true,
			},
			{ field: "status", headerName: "Status", flex: 0.1, editable: true, },
			{
				field: "actions",
				headerName: "Actions",
				renderCell: (params) => (
			<EditButton
				onClick={() => handleEditClick(params.row)}  
				disabled={!params.row} 
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
					title="Rides💻"
					subtitle="View rides information and maintenance status"
				/>
				<Box display="flex" alignItems="center">
					<PrintButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/rides/"
						columns={columns}
					/>
					<DownloadButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/rides/"
						fileName="rides_report.csv"
						columns={columns}
					/>
					<DeleteButton
						selectedItems={selectedRow}
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/rides/"
						onDeleteSuccess={() => {
							setRides((prevData) =>
								prevData.filter(
									(ride) =>
										!selectedRow.includes(ride.ride_id)
								)
							);
							setSelectedRow([]);
						}}
					/>
					<AddButton onClick={handleAddClick} />
					</Box>
			</Box>
			{/*To display inventory*/}
			<Box
				m="10px 0 0 0"
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
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.greenAccent[100]} !important`,
						backgroundColor: colors.blueAccent[700],
					},
				}}
			>
				<DataGrid
					checkboxSelection
					rows={rides}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					loading={loading}
					getRowId={(row) => row.ride_id}
					onRowSelectionModelChange={handleRowSelection}
				/>
			</Box>

			<EditModal
				open={openModal}
				editedData={editedData}
				onFieldChange={handleFieldChange}
				onClose={handleCloseModal}
				apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/rides/${editingRow?.ride_id}`}
				onSuccess={handleSaveChanges}
				originalData={editingRow}
			/>
			<AddModal
				open={openAddModal}
				editedData={editedData}  
				onFieldChange={handleFieldChange}  
				onClose={handleCloseAddModal} 
				apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/rides/" 
				onSuccess={handleAddSuccess}  
				columns={columns} 
			/>

		</Box>
	);
};

export default Rides;
