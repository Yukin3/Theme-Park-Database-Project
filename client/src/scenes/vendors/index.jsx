import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DownloadButton from "../../components/DownloadButton";
import PrintButton from "../../components/PrintButton";
import AddButton from "../../components/AddButton";
import EditButton from "../../components/EditButton";
import EditModal from "../../components/EditModal";
import AddModal from "../../components/AddModal";


const Vendors = ({ isOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const navigate = useNavigate();
	const [vendorData, setVendorData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedvendors, setSelectedvendors] = useState([]);
	const [editingRow, setEditingRow] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [editedData, setEditedData] = useState({});
	const [openAddModal, setOpenAddModal] = useState(false); 


	useEffect(() => {
		const fetchVendorData = async () => {
			try {
				const response = await axios.get(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/"
				);
				console.log("Fetched vendors:", response.data);
				setVendorData(response.data);
			} catch (error) {
				console.error("Error fetching vendors:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchVendorData();
	}, []);

		// Handle row selection
		const handleRowSelection = (selectionModel) => {
			setVendorData(selectionModel);
			const selectedRowData =
				selectionModel.length === 1
					? vendorData.find((vendor) => vendor.vendor_id === selectionModel[0])
					: null;
			setEditingRow(selectedRowData);
			console.log("Editing Row Data:", selectedRowData); 
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
    setVendorData((prevData) =>
      prevData.map((vendor) =>
        vendor.vendor_id === updatedRow.vendor_id ? updatedRow : vendor
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
    setVendorData((prevData) => [...prevData, newRow]);  // Add the new row to the data
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };


	const columns = [
		{
			field: "vendor_id",
			headerName: "Vendor ID",
			headerAlign: "center",
			align: "center",
			flex: 0.2, editable: true,
		},
		{
			field: "company_name",
			headerName: "Company",
			headerAlign: "center",
			align: "center",
			flex: 0.8, editable: true,
		},
		{ field: "vendor_contact", headerName: "Vendor Contact", flex: 0.5, editable: true, },
		{
			field: "phone_number",
			headerName: "Phone Number",
			type: "number",
			headerAlign: "left",
			align: "left",
			flex: 0.2, editable: true,
		},
		{
			field: "email",
			headerName: "Email",
			type: "number",
			headerAlign: "left",
			align: "left",
			flex: 0.2, editable: true,
		},
		{ field: "address_line1", headerName: "Address Line 1", flex: 0.3, editable: true, },
		{ field: "address_line2", headerName: "Address Line 2", flex: 0.2, editable: true, },
		{
			field: "city",
			headerName: "City",
			type: "number",
			headerAlign: "left",
			align: "left",
			flex: 0.2, editable: true,
		},
		{ field: "state", headerName: "State", flex: 0.2, editable: true, },
		{
			field: "zip_code",
			headerName: "Zip Code",
			type: "number",
			headerAlign: "left",
			align: "left",
			flex: 0.2, editable: true,
		},
		{ field: "country", headerName: "Country", flex: 0.3, editable: true, },
		{ field: "vendor_type", headerName: "Vendor Type", flex: 0.2, editable: true, },
		{
			field: "contract_start_date",
			headerName: "Contract Start",
			headerAlign: "left",
			align: "left",
			flex: 0.2, editable: true,
		},
		{
			field: "contract_end_date",
			headerName: "Contract End",
			headerAlign: "left",
			align: "left",
			flex: 0.2, editable: true,
		},
		{ field: "state", headerName: "State", flex: 0.2, editable: true, },
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
				<Header title="Vendors✅" subtitle="View vendor information" />
				<Box display="flex" alignItems="center">
					<PrintButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/"
						columns={columns}
					/>
					<DownloadButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/"
						fileName="vendors_report.csv"
						columns={columns}
					/>
					<AddButton onClick={handleAddClick} />
					</Box>
			</Box>

			<Box
				m="10px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": { border: "none" },
					"& .MuiDataGrid-cell": { borderBottom: "none" },
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
					rows={vendorData}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					getRowId={(row) => row.vendor_id}
					loading={loading}
				/>
			</Box>

			<EditModal
				open={openModal}
				editedData={editedData}
				onFieldChange={handleFieldChange}
				onClose={handleCloseModal}
				apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/${editingRow?.vendor_email}`} //TODO: pass correct varible
				onSuccess={handleSaveChanges}
				originalData={editingRow}
			/>

			<AddModal
				open={openAddModal}
				editedData={editedData}  
				onFieldChange={handleFieldChange}  
				onClose={handleCloseAddModal} 
				apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/" 
				onSuccess={handleAddSuccess}  
				columns={columns} 
			/>

		</Box>
	);
};

export default Vendors;
