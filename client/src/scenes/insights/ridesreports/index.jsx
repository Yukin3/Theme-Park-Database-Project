import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DownloadButton from "../../../components/DownloadButton";
import PrintButton from "../../../components/PrintButton";
import axios from "axios";
import BasicDatePicker from "../../../components/DateRangePicker";

const RidesReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [ridesData, setRidesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRange, setSelectedRange] = useState("year"); // Default range is 'year'
    const [rangeOptions, setRangeOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");

    // Columns for DataGrid
    const columns = [
        { field: "rowNumber", headerName: "#", width: 60, sortable: false },
        { field: "ride_name", headerName: "Ride", flex: 1 },
        { field: "ride_type", headerName: "Category", flex: 1,  cellClassName: "name-column--cell"},
        { field: "ride_count", headerName: "Ride Count", flex: 1 },
    ];

    

    useEffect(() => {
        const fetchRidesData = async () => {
            try {
                const response = await axios.get(`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/ride-counts/${startDate}/${endDate}`);
                setRidesData(response.data);
                console.log("Fetched dates:", startDate, "to ",  endDate);

            } catch (error) {
                console.error("Error fetching ride data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRidesData();
    }, [startDate, endDate]);
    

    // Generate options for the range selection (year, month, week, or day)
    useEffect(() => {
        if (selectedRange && ridesData.length) {
            const uniqueOptions = [...new Set(ridesData.map((item) => item[selectedRange]))];
            setRangeOptions(uniqueOptions);
        }
    }, [selectedRange, ridesData]);

    // Filter data based on the selected range and value
    const filteredData = ridesData.filter((item) => {
        if (selectedValue === null) return true;
        return item[selectedRange] === selectedValue;
    });

    // Add row numbers to each row for display
    const rowsWithNumbers = filteredData.map((row, index) => ({ ...row, rowNumber: index + 1 }));





    //



 // Handle date change from DatePicker
 const handleDateChange = (field, value) => {
    if (field === "start_date") {
      setStartDate(value);
    } else if (field === "end_date") {
      setEndDate(value);
    }
  };


    //
    return (
        <Box m="20px">
            {/* Header with Print, Download, and Add Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Rides Reports" subtitle="View ride statistics by selected date range" />
                <Box display="flex" alignItems="center">
                    <PrintButton apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/ride-counts/${startDate}/${endDate}`} columns={columns} />
                    <DownloadButton
                        apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/ride-counts/${startDate}/${endDate}`}
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
                        rows={rowsWithNumbers}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        getRowId={(row) => row.rowNumber}
                        checkboxSelection
                    />
                )}
            </Box>
        </Box>
    );
};

export default RidesReports;
