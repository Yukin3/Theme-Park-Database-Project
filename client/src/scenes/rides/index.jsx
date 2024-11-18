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

const Rides = ({ isOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();

	const [rides, setRides] = useState([]); // State for storing rides data
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [selectedRow, setSelectedRow] = useState([]);
	const [editingRow, setEditingRow] = useState(null);

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

	
		const columns = [
			{ field: "ride_id", headerName: "Ride ID", flex: 0.1 },
			{ field: "section_id", headerName: "Section ID", flex: 0.1 },
			{
				field: "name",
				headerName: "Name",
				flex: 0.3,
				cellClassName: "name-column--cell",
			},
			{ field: "ride_type", headerName: "Ride Type", flex: 0.1 },
			{ field: "last_inspected", headerName: "Last Inspected", flex: 0.1 },
			{ field: "height_requirement", headerName: "Height Req.", flex: 0.1 },
			{
				field: "capacity",
				headerName: "Capacity",
				type: "number",
				align: "left",
			},
			{ field: "status", headerName: "Status", flex: 0.1 },
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
									(shop) =>
										!selectedRow.includes(shop.shop_id)
								)
							);
							setSelectedRow([]);
						}}
					/>
					<AddButton navigateTo="/rideform" />
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
		</Box>
	);
};

export default Rides;
