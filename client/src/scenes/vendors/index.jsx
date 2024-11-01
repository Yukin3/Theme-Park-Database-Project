import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DownloadButton from "../../components/DownloadButton";
import PrintButton from "../../components/PrintButton";
import AddButton from "../../components/AddButton";

const Vendors = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [vendorData, setVendorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await axios.get("https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/");
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

    const columns = [
        { field: "vendor_id", headerName: "SKU", headerAlign: "center", align: "center", flex: 0.2 },
        { field: "company_name", headerName: "Item Name", headerAlign: "center", align: "center", flex: 0.8 },
        { field: "vendor_contact", headerName: "Vendor Contact", flex: 0.5 },
        { field: "phone_number", headerName: "Phone Number", type: "number", headerAlign: "left", align: "left", flex: 0.2 },
        { field: "email", headerName: "Email", type: "number", headerAlign: "left", align: "left", flex: 0.2 },
        { field: "address_line1", headerName: "Address Line 1", flex: 0.3 },
        { field: "address_line2", headerName: "Address Line 2", flex: 0.2 },
        { field: "city", headerName: "City", type: "number", headerAlign: "left", align: "left", flex: 0.2 },
        { field: "zip_code", headerName: "Zip Code", type: "number", headerAlign: "left", align: "left", flex: 0.2 },
        { field: "country", headerName: "Country", flex: 0.3 },
        { field: "vendor_type", headerName: "Vendor Type", flex: 0.2 },
        { field: "contract_start_date", headerName: "Contract Start", headerAlign: "left", align: "left", flex: 0.2 },
        { field: "contract_end_date", headerName: "Contract End", headerAlign: "left", align: "left", flex: 0.2 },
        { field: "state", headerName: "State", flex: 0.2 },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Vendors✅" subtitle="View vendor information" />
                <Box display="flex" alignItems="center">
                    <PrintButton apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/" columns={columns} />
                    <DownloadButton
                        apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/vendors/"
                        fileName="vendors_report.csv"
                        columns={columns}
                    />
                    <AddButton navigateTo="/vendorform"/>
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
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
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
        </Box>
    );
};

export default Vendors;
