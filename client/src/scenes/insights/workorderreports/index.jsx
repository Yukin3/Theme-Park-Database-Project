import { Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import DownloadButton from "../../../components/DownloadButton";
import AddButton from "../../../components/AddButton";
import PrintButton from "../../../components/PrintButton";

const MaintenanceReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [workOrderInfo, setWorkOrderInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [workOrderType, setWorkOrderType] = useState("inspection"); // Default work order type is "CLOSED(M)"


    // Fetch data from the API
    useEffect(() => {
        const fetchWorkOrderInfo = async () => {
            try {
                const response = await axios.get(`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/broken-rides/${workOrderType}`);
                console.log("Fetched work-orders:", response.data);
                setWorkOrderInfo(response.data);
            } catch (error) {
                console.error("Error fetching work-orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkOrderInfo();
    }, [workOrderType]);

    // Table columns
    const columns = [
        { field: "ride_name", headerName: "Ride Name", flex: 1 , cellClassName: "name-column--cell"},
        { field: "last_inspected", headerName: "Last Inspected", flex: 1 },
        { field: "ride_status", headerName: "Ride Status", flex: 1 },
        { field: "assigned_employee", headerName: "Assigned Employee", flex: 1, cellClassName: "name-column--cell" },
        { field: "maintenance_type", headerName: "Maintenance Type", flex: 1 },
        { field: "date_created", headerName: "Date Created", flex: 1 },
        { field: "wo_status", headerName: "Work Order Status", flex: 1 }
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Maintenance Reports" subtitle="Review ride maintenance records by service type" />
                <Box display="flex" alignItems="center">
                    <PrintButton
                        apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/broken-rides/${workOrderType}`}
                        columns={columns}
                    />
                    <DownloadButton
                        apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/broken-rides/${workOrderType}`}
                        fileName="maintenance_report.csv"
                        columns={columns}
                    />
                    <AddButton navigateTo="/maintenanceform" />
                </Box>
            </Box>

            <Box display="flex" gap="10px" mb="20px">
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                    <Typography>Work Order Type</Typography>
                    <Select
                        value={workOrderType}
                        onChange={(e) => setWorkOrderType(e.target.value)} // Update the work order type
                        label="Work Order Type"
                    >
                        <MenuItem value="Inspection">Inspection</MenuItem>
                        <MenuItem value="Repair">Repair</MenuItem>
                        <MenuItem value="Upgrade">Upgrade</MenuItem>
                    </Select>
                </FormControl>
            </Box>


            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-column--cell": { color: colors.greenAccent[700] },
                    "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700] },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[100] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] }
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={workOrderInfo}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    loading={loading}
                    getRowId={(row) => row.ride_name} 
                />
            </Box>
        </Box>
    );
};

export default MaintenanceReports;
