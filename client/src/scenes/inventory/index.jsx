import { Box, useTheme, IconButton} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import  AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import  LockOpenOutlinedIcon  from "@mui/icons-material/LockOpenOutlined";
import  SecurityOutlinedIcon  from "@mui/icons-material/SecurityOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Import the plus icon
import  Header from "../../components/Header"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import DownloadButton from "../../components/DownloadButton";
import AddButton from "../../components/AddButton";
import PrintButton from "../../components/PrintButton";
import DeleteButton from "../../components/DeleteButton";
import EditButton from "../../components/EditButton";
import EditModal from "../../components/EditModal";
import AddModal from "../../components/AddModal";

const Inventory = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();


    const [itemData, setitemData] = useState([]); {/*State for storing employee data*/}
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedRows, setSelectedRows] = useState([]);
	const [editingRow, setEditingRow] = useState(null);

	const [openModal, setOpenModal] = useState(false);
	const [editedData, setEditedData] = useState({});
	const [openAddModal, setOpenAddModal] = useState(false); 


    useEffect(() => {
        const fetchitemData = async () => {
            try {
                const response = await axios.get("https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/items/");
                console.log("Fetched items:", response.data);
                setitemData(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchitemData();
        }, []);

        const handleRowSelection = (selectionModel) => {
            setSelectedRows(selectionModel);
            const selectedRowData =
                selectionModel.length === 1
                    ? itemData.find((item) => item.sku=== selectionModel[0])
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
        setitemData((prevData) =>
          prevData.map((item) =>
            item.sku=== updatedRow.sku? updatedRow : item
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
        setitemData((prevData) => [...prevData, newRow]);  // Add the new row to the data
      };
    
      const handleCloseAddModal = () => {
        setOpenAddModal(false);
      };

    const columns = [
        {field: "sku", headerName: "SKU", headerAlign: "center" , align: "center", flex: 0.2, editable: true,},
        {field: "name", headerName: "Item Name", headerAlign: "center" , align: "center", flex: 0.8, editable: true,}, 
        {field: "category", headerName: "Category", flex: 0.5, editable: true,},
        {field: "price", headerName: "Price", type: "number", headerAlign: "left", align: "left", flex: 0.2, editable: true,} ,
        {field: "cost", headerName: "Unit Cost", type: "number", headerAlign: "left", align: "left", flex: 0.2, editable: true,},
        {field: "status", headerName: "Status", flex: .3, editable: true,},
        {field: "vendor_id", headerName: "Vendor(ID)", flex: 0.2, editable: true,},
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

 

    return(


        <Box m="20px">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Header title="Inventory🔜" subtitle="Manage & view Inventory"/>
                  <Box display="flex" alignItems="center">
                      <PrintButton
                          apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/items/"
                          columns={columns} />
                      <DownloadButton
                          apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/items/"
                          fileName="items_report.csv"
                          columns={columns}
                      />
					<DeleteButton
						selectedItems={selectedRows}
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/items/"
						onDeleteSuccess={() => {
							setitemData((prevData) =>
								prevData.filter(
									(item) =>
										!selectedRows.includes(item.sku)
								)
							);
							setSelectedRows([]);
						}}
					/>
					<AddButton onClick={handleAddClick} />
                  </Box>
              </Box>
            {/*To display inventory*/}
            <Box
                m="10px 0 0 0"
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
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.greenAccent[100]} !important`,
                        backgroundColor: colors.blueAccent[700]
                    },
                }}>

        <DataGrid 
        	checkboxSelection
            rows={itemData} 
            columns={columns} 
            components={{Toolbar: GridToolbar}}
            getRowId={(row) => row.sku}
            onRowSelectionModelChange={handleRowSelection}
        />
        </Box>
        <EditModal
				open={openModal}
				editedData={editedData}
				onFieldChange={handleFieldChange}
				onClose={handleCloseModal}
				apiUrl={`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/items/${editingRow?.sku}`}
				onSuccess={handleSaveChanges}
				originalData={editingRow}
			/>
			<AddModal
				open={openAddModal}
				editedData={editedData}  
				onFieldChange={handleFieldChange}  
				onClose={handleCloseAddModal} 
				apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/items/" 
				onSuccess={handleAddSuccess}  
				columns={columns} 
			/>
            


        </Box>
    );
}

export default Inventory;



