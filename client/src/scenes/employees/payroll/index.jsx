import { Box, useTheme, Button} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import  Header from "../../../components/Header"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios  from "axios"; //install if have !! needed for API requests
import DownloadButton from "../../../components/DownloadButton";
import AddButton from "../../../components/AddButton";
import PrintButton from "../../../components/PrintButton";


const EmployeePayroll = () => {
const theme = useTheme();
const colors = tokens(theme.palette.mode);
const navigate = useNavigate();



const [employeePayrollData, setEmployeePayrollData] = useState([]); {/*State for storing employee data*/}
const [loading, setLoading] = useState(true); // Loading state


{/*Fetch employee data from endpoints when table is pulled*/}
useEffect(() => {
    const fetchEmployeePayrollData = async () => {
        try {
            const response = await axios.get("https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/hours-worked");
            console.log("Fetched employees:", response.data);
            setEmployeePayrollData(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchEmployeePayrollData();
    }, []);



const columns = [
    { field: "first_name", headerName: "Shift ID", flex: 0.5 },
    { field: "last_name", headerName: "Employee ID", flex: 0.5 },
    { field: "job_function", headerName: "Section ID", cellClassName: "name-column--cell" },
    { field: "department", headerName: "Shift Date", cellClassName: "name-column--cell" },
    { field: "punch_in_time", headerName: "Clock In", cellClassName: "name-column--cell" },
    { field: "year", headerName: "Clock out" },
    { field: "month", headerName: "Break Start" },
    { field: "day", headerName: "Break End" },
    { field: "hours_worked", headerName: "Status" },
];





    return (
        <Box m="20px">
        {/* Print | Export | Add  */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Employee Timesheets" subtitle="fix access control"/>
            <Box display="flex" alignItems="center">
                <PrintButton apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/hours-worked"  />
                <DownloadButton apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/hours-worked" fileName="employee_payroll_report.csv"  />
                <AddButton navigateTo={'/employeeform'}/>
            </Box>
        </Box>


        {/*Form fields, missing validation method linkings + user auth */}
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700] },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[100] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] }
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={employeePayrollData}
                    columns={columns} // Use the columns based on the toggle
                    components={{ Toolbar: GridToolbar }}
                    loading={loading}
                    getRowId={(row) => `${row.employee_id}-${row.shift_id}`}
                />
            </Box>
        </Box>
    );
};

export default EmployeePayroll;

