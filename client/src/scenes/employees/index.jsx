import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; //install if have !! needed for API requests
import DownloadButton from "../../components/DownloadButton";
import AddButton from "../../components/AddButton";
import PrintButton from "../../components/PrintButton";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";
import EditModal from "../../components/EditModal";
import AddModal from "../../components/AddModal";


const Employees = ({ isOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();

	const [employeeData, setEmployeeData] = useState([]);
	const [loading, setLoading] = useState(true); // Loading state
	const [selectedRow, setSelectedRow] = useState([]);
	const [editingRow, setEditingRow] = useState(null);	

	const [openModal, setOpenModal] = useState(false);
	const [editedData, setEditedData] = useState({});
	const [openAddModal, setOpenAddModal] = useState(false); 



	useEffect(() => {
		const fetchEmployeeData = async () => {
			try {
				const response = await axios.get(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/employees/"
				);
				console.log("Fetched employees:", response.data);
				setEmployeeData(response.data);
			} catch (error) {
				console.error("Error fetching employees:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEmployeeData();
	}, []);


		// Handle row selection
		const handleRowSelection = (selectionModel) => {
			setSelectedRow(selectionModel);
			const selectedRowData =
				selectionModel.length === 1
					? employeeData.find((employee) => employee.employee_id === selectionModel[0])
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
		setEmployeeData((prevData) =>
		  prevData.map((employee) =>
			employee.employee_id === updatedRow.employee_id ? updatedRow : employee
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
		setEmployeeData((prevData) => [...prevData, newRow]);  // Add the new row to the data
	  };
	
	  const handleCloseAddModal = () => {
		setOpenAddModal(false);
	  };
			

	const columns = [
		{ field: "employee_id", headerName: "EmployeeID", flex: 0.5 },
		{ field: "ssn", headerName: "SSN", flex: 0.5 },
		{
			field: "first_name",
			headerName: "First Name",
			cellClassName: "name-column--cell",
		},
		{
			field: "last_name",
			headerName: "Last Name",
			cellClassName: "name-column--cell",
		},
		{
			field: "middle_initial",
			headerName: "MI",
			cellClassName: "name-column--cell",
		},
		{ field: "phone_number", headerName: "Phone Number", editable: true, },
		{ field: "email", headerName: "Email" , editable: true,},
		{ field: "address_line1", headerName: "Address Line 1" , editable: true,},
		{ field: "address_line2", headerName: "Address Line 2", editable: true, },
		{ field: "city", headerName: "City, editable: true," },
		{ field: "state", headerName: "State" , editable: true,},
		{ field: "zip_code", headerName: "Zip Code", editable: true, },
		{ field: "country", headerName: "Country", editable: true, },
		{ field: "dob", headerName: "Date of Birth", editable: true, },
		{ field: "start_date", headerName: "Start Date", editable: true, },
		{ field: "employee_type", headerName: "Employee Type", editable: true, },
		{ field: "hourly_wage", headerName: "Hourly Wage", editable: true, },
		{ field: "salary", headerName: "Salary" },
		{ field: "job_function", headerName: "Job Function", editable: true, },
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
		// {
		// 	field: "access",
		// 	headerName: "Access Level",
		// 	flex: 1,
		// 	renderCell: ({ row: { access } }) => {
		// 		return (
		// 			<Box
		// 				width="60%"
		// 				m="0 auto"
		// 				p="5px"
		// 				display="flex"
		// 				justifyContent="center"
		// 				backgroundColor={
		// 					access === "admin"
		// 						? colors.greenAccent[600]
		// 						: colors.greenAccent[700]
		// 				}
		// 				borderRadius="4px"
		// 			>
		// 				{access === "admin" && (
		// 					<AdminPanelSettingsOutlinedIcon />
		// 				)}
		// 				{access === "manager" && <SecurityOutlinedIcon />}
		// 				{access === "user" && <LockOpenOutlinedIcon />}
		// 				<p
		// 					style={{
		// 						marginLeft: "5px",
		// 						color: colors.grey[100],
		// 					}}
		// 				>
		// 					{access}
		// 				</p>
		// 			</Box>
		// 		);
		// 	},
		// },
	];

	return (
		<Box
			m="20px"
			ml={isOpen ? "250px" : "80px"} // Adjust left margin based on isOpen
			transition="margin 0.3s ease" // Smooth transition for margin
		>
			{/* Print | Export | Add  */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="All Employees" subtitle="...." />
				<Box display="flex" alignItems="center">
					<PrintButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/employees/"
						columns={columns}
					/>
					<DownloadButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/employees/"
						fileName="employees_report.csv"
						columns={columns}
					/>
					<DeleteButton
						selectedItems={selectedRow}
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/employees/"
						onDeleteSuccess={() => {
							setEmployeeData((prevData) =>
								prevData.filter(
									(employee) =>
										!selectedRow.includes(employee.employee_id)
								)
							);
							setSelectedRow([]);
						}}
					/>
					<AddButton onClick={handleAddClick} />
					</Box>
			</Box>


			{/*Form fields, missing validation method linkings + user auth */}
			<Box
				m="40px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": { border: "none" },
					"& .MuiDataGrid-cell": { borderBottom: "none" },
					"& .MuiDataGrid-columnHeader": {
						backgroundColor: colors.blueAccent[700],
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
					rows={employeeData}
					columns={columns} // Use the columns based on the toggle
					components={{ Toolbar: GridToolbar }}
					loading={loading}
					getRowId={(row) => row.employee_id}
					onRowSelectionModelChange={handleRowSelection}
				/>
			</Box>




			<EditModal
				open={openModal}
				editedData={editedData}
				onFieldChange={handleFieldChange}
				onClose={handleCloseModal}
				apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/employees/${editingRow?.employee_id}`}
				onSuccess={handleSaveChanges}
				originalData={editingRow}
			/>

			<AddModal
				open={openAddModal}
				editedData={editedData}  
				onFieldChange={handleFieldChange}  
				onClose={handleCloseAddModal} 
				apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/employees/" 
				onSuccess={handleAddSuccess}  
				columns={columns} 
			/>


		</Box>
	);
};

export default Employees;
