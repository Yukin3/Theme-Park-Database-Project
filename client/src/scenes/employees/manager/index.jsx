import { Box, useTheme, Button} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import  AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import  LockOpenOutlinedIcon  from "@mui/icons-material/LockOpenOutlined";
import  SecurityOutlinedIcon  from "@mui/icons-material/SecurityOutlined";
import  Header from "../../../components/Header"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios  from "axios"; //install if have !! needed for API requests
import DownloadButton from "../../../components/DownloadButton";
import AddButton from "../../../components/AddButton";
import PrintButton from "../../../components/PrintButton";
import { useUser } from "../../../components/context/UserContext";
import EditModal from "../../../components/EditModal";
import EditButton from "../../../components/EditButton";


const MyEmployees = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const navigate = useNavigate();
const {user} = useUser();

const [employeeData, setEmployeeData] = useState([]); {/*State for storing employee data*/}
const [loading, setLoading] = useState(true); // Loading state

const [selectedEmployees, setSelectedEmployees] = useState([]);
const [editingRow, setEditingRow] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [editedData, setEditedData] = useState({});


{/*Fetch employee data from endpoints when table is pulled*/}
useEffect(() => {
    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get(`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/department-employees/${user.email}`);
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


	const handleRowSelection = (selectionModel) => {
		setSelectedEmployees(selectionModel);
		const selectedRowData =
			selectionModel.length === 1
				? employeeData.find((emp) => emp.emp_id === selectionModel[0])
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
    setEmployeeData((prevData) =>
      prevData.map((emp) =>
        emp.emp_id === updatedRow.emp_id ? updatedRow : emp
      )
    );
  };


  const handleCloseModal = () => {
    setOpenModal(false);
    setEditedData({});
  };


    const columns = [
    { field: "first_name", headerName: "First Name", cellClassName: "name-column--cell" },
    { field: "last_name", headerName: "Last Name", cellClassName: "name-column--cell" },
    { field: "middle_initial", headerName: "MI", cellClassName: "name-column--cell" },
    { field: "phone_number", headerName: "Phone Number" },
    { field: "email", headerName: "Email" },
    { field: "start_date", headerName: "Start Date" },
    { field: "job_function", headerName: "Job Function" },
    { field: "department_id", headerName: "Department ID" },

];



    return (
        <Box m="20px">
        {/* Print | Export | Add  */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="My Employees" subtitle="List of all the employees in your department"/>
            <Box display="flex" alignItems="center">
                <PrintButton apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/department-employees/${user.email}`} columns={columns} />
                <DownloadButton apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/department-employees/${user.email}`} fileName="employees_report.csv" columns={columns} />
                <AddButton navigateTo={'/employeeform'}/>
            </Box>
        </Box>


        {/*Form fields, missing validation method linkings + user auth */}
        <Box
				m="10px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": { border: "none" },
					"& .MuiDataGrid-cell": { borderBottom: "none" },
					"& .name-column--cell": { color: colors.greenAccent[300] },
					"& .MuiDataGrid-columnHeader": {
						backgroundColor: colors.blueAccent[700],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: colors.primary[300],
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor: colors.blueAccent[700],
					},
					"& .Mui-selected": {
						backgroundColor: colors.primary[200], // Highlight edited row
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
                />
            </Box>

            <EditModal
				open={openModal}
				editedData={editedData}
				onFieldChange={handleFieldChange}
				onClose={handleCloseModal}
				apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/department-employees/${editingRow?.employee_id}`}
				onSuccess={handleSaveChanges}
				originalData={editingRow}
			/>


        </Box>
    );
};

export default MyEmployees;

