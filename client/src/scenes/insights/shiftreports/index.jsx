import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DownloadButton from "../../../components/DownloadButton";
import PrintButton from "../../../components/PrintButton";
import axios from "axios";
import BasicDatePicker from "../../../components/DateRangePicker";

const TimesheetReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [timesheetData, setTimesheetData] = useState([]);
    const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");


  const columns = [
    { field: "first_name", headerName: "First Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "job_function", headerName: "Job Function", cellClassName: "name-column--cell" },
    { field: "department", headerName: "Department", cellClassName: "name-column--cell", flex: 0.5 },
    { field: "hours_worked", headerName: "Hours Worked" },
];

    

    useEffect(() => {
        const fetchTimesheetData = async () => {
            try {
                const response = await axios.get(`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/hours-worked/${startDate}/${endDate}`);
                setTimesheetData(response.data);
                console.log("Fetched dates:", startDate, "to ",  endDate);

            } catch (error) {
                console.error("Error fetching timesheet data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTimesheetData();
    }, [startDate, endDate]);
    






 // Handle date change from DatePicker
 const handleDateChange = (field, value) => {
    if (field === "start_date") {
      setStartDate(value);
    } else if (field === "end_date") {
      setEndDate(value);
    }
  };

    // Ensure unique row ID (check if employee_id and shift_id are present)
    const getRowId = (row) => {
        // Check if both employee_id and shift_id are available
        if (row.employee_id && row.shift_id) {
            return `${row.employee_id}-${row.shift_id}`;
        }
        // Fallback: use first_name, last_name, year, and month if employee_id or shift_id are missing
        return `${row.first_name}-${row.last_name}-${row.year}-${row.month}-${row.day}`;
    };




  
    return (
        <Box m="20px">
            {/* Header with Print, Download, and Add Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Rides Reports" subtitle="View ride statistics by selected date range" />
                <Box display="flex" alignItems="center">
                    <PrintButton apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/hours-worked/${startDate}/${endDate}`} columns={columns} />
                    <DownloadButton
                        apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/hours-worked/${startDate}/${endDate}`}
                        fileName="ride_counts_report.csv"
                        columns={columns}
                    />
                </Box>
            </Box>

            {/* Date range Filters */}
            <Box display="flex" gap="10px" mb="20px">
                <BasicDatePicker onDateChange={handleDateChange}/>
            </Box>

            {/* Data Grid */}
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
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <DataGrid
                        rows={timesheetData}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        getRowId={getRowId}
                        checkboxSelection
                    />
                )}
            </Box>
        </Box>
    );
};

export default TimesheetReports;