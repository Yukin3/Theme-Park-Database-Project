import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import DownloadButton from "../../components/DownloadButton";
import AddButton from "../../components/AddButton";
import PrintButton from "../../components/PrintButton";
import DeleteButton from "../../components/DeleteButton";

const Maintenance = ({ isOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [workOrderInfo, setworkOrderInfo] = useState([]);
	const [selectedRow, setSelectedRow] = useState([]);
	const [editingRow, setEditingRow] = useState(null);
	{
		/*State for storing employee data*/
	}
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		const fetchworkOrderInfo = async () => {
			try {
				const response = await axios.get(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/work-orders/"
				); //missing table but link should be working
				console.log("Fetched work-orders:", response.data);
				setworkOrderInfo(response.data);
			} catch (error) {
				console.error("Error fetching work-orders:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchworkOrderInfo();
	}, []);


		// Handle row selection
		const handleRowSelection = (selectionModel) => {
			setSelectedRow(selectionModel);
			const selectedRowData =
				selectionModel.length === 1
					? workOrderInfo.find((shop) => shop.shop_id === selectionModel[0])
					: null;
			setEditingRow(selectedRowData);
			console.log("Editing Row Data:", selectedRowData); // Log for debugging
		};

	const columns = [
		{ field: "woid", headerName: "WorkOrderID", flex: 0.5 },
		{
			field: "section_id",
			headerName: "Section",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{ field: "ride_id", headerName: "Ride ID" },
		{ field: "invoice_id", headerName: "Invoice ID", flex: 0.5 },
		{ field: "maintenance_date", headerName: "Date of Service", flex: 1 },
		{
			field: "maintenance_type",
			headerName: "Maintenance Type",
			flex: 0.5,
		},
		{
			field: "assigned_worker_id",
			headerName: "Assigned Worker(ID)",
			flex: 0.5,
		},
		{ field: "date_created", headerName: "Date Created", flex: 0.5 },
		{ field: "updated_at", headerName: "Date Updated", flex: 0.5 },
		{ field: "created_by", headerName: "Created By", flex: 0.5 },
		{ field: "updated_by", headerName: "Updated By", flex: 0.5 },
		{ field: "status", headerName: "Status", flex: 0.5 },
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
					title="Maintenance💻"
					subtitle="Keep track of park work orders and maintenance schedules."
				/>
				<Box display="flex" alignItems="center">
					<PrintButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/work-orders/"
						columns={columns}
					/>
					<DownloadButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/work-orders/"
						fileName="customers_report.csv"
						columns={columns}
					/>
					<DeleteButton
						selectedItems={selectedRow}
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/work-orders/"
						onDeleteSuccess={() => {
							setworkOrderInfo((prevData) =>
								prevData.filter(
									(shop) =>
										!selectedRow.includes(shop.shop_id)
								)
							);
							setSelectedRow([]);
						}}
					/>
					<AddButton navigateTo="/maintenanceform" />
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
					"& .MuicCheckbox-root": {
						color: `${colors.greenAccent[200]} !important`,
					},
				}}
			>
				<DataGrid
					checkboxSelection
					rows={workOrderInfo}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					loading={loading}
					getRowId={(row) => row.woid}
					onRowSelectionModelChange={handleRowSelection}
				/>
			</Box>
		</Box>
	);
};

export default Maintenance;
