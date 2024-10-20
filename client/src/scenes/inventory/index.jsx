import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { sampleInvoices } from "../../data/sampleInvoices";
import  AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import  LockOpenOutlinedIcon  from "@mui/icons-material/LockOpenOutlined";
import  SecurityOutlinedIcon  from "@mui/icons-material/SecurityOutlined";
import  Header from "../../components/Header"


const Inventory = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    

    const columns = [
        {field: "id", headerName: "ItemID", flex: 0.5}, 
        {field: "vendorName", headerName: "Item Name", flex: 1, cellClassName: "name-column--cell"}, 
        {field: "invoiceNumber", headerName: "Store Name"},
        {field: "amount", headerName: "Price", flex: 1, renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value)}
          </Typography>
            

        )},
        {field: "date", headerName: "Quantity", flex: 1},
        {field: "status", headerName: "Payment Status", flex: 1},
        
        ]; {/*field: value/data grabbed from  colName: column title in table */}

    return(
        <Box m="20px">
            <Header title="Inventory" subtitle="Review  items on hand and out of stock "/>
            <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{"& .MuiDataGrid-root": {
                border: "none"
                }, 
                "& .MuiDataGrid-cell": {
                borderBottom: "none"
                },
                "& .name-column--cell": {
                color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeader": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700]
                },
                "& .MuicCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
                },
                }}>

            <DataGrid checkboxSelection rows={sampleInvoices} columns={columns} components={{Toolbar: GridToolbar}}/>
            </Box>


        </Box>
    );
}

export default Inventory;



