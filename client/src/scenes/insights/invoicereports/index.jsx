import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Select, MenuItem } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import DownloadButton from "../../../components/DownloadButton";
import PrintButton from "../../../components/PrintButton";
import axios from "axios";
import BasicDatePicker from "../../../components/DateRangePicker";

const InvoiceReports = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [incoivceReportData, setIncoivceReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("2024-01-01");
    const [endDate, setEndDate] = useState("2024-12-31");


  const columns = [
    { field: "invoice_id", headerName: "Invoice ID", flex: 0.5 },
    { field: "company_name", headerName: "Company Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "supply", headerName: "Supply", flex: 1 }, 
    { field: "amount_due", headerName: "Balance Due", flex: 1, cellClassName: "name-column--cell"},
    { field: "payment_status", headerName: "Payment Status", flex: 1 },
    ]; {/*field: value/data grabbed from  colName: column title in table */}

    

    useEffect(() => {
        const fetchIncoivceReportData = async () => {
            try {
                const response = await axios.get(`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/invoice-status/${startDate}/${endDate}`)
                console.log("Fetched IncoivceReportData:", response.data);
                setIncoivceReportData(response.data);
            } catch (error) {
                console.error("Error fetching IncoivceReportData:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIncoivceReportData();
    }, [startDate, endDate]);
    





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
                    <PrintButton apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/invoice-status/${startDate}/${endDate}`} columns={columns} />
                    <DownloadButton
                        apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/reports/invoice-status/${startDate}/${endDate}`}
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
                        rows={incoivceReportData}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        getRowId={(row) => row.invoice_id}
                        checkboxSelection
                    />
                )}
            </Box>
        </Box>
    );
};

export default InvoiceReports;
