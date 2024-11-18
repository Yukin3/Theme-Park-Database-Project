import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import PrintButton from "../../components/PrintButton";
import AddButton from "../../components/AddButton";
import DownloadButton from "../../components/DownloadButton";
import { useEffect, useState } from "react";
import axios from "axios";
import EditButton from "../../components/EditButton";
import DeleteButton from "../../components/DeleteButton";

const Shops = ({ isOpen }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [ShopsData, setShopsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedShops, setSelectedShops] = useState([]);
	const [editingRow, setEditingRow] = useState(null);

	const [openModal, setOpenModal] = useState(false);
	const [editedData, setEditedData] = useState({});

	useEffect(() => {
		const fetchShopsData = async () => {
			try {
				const response = await axios.get(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/shops/"
				);
				console.log("Fetched Shops Data:", response.data);
				setShopsData(response.data);
			} catch (error) {
				console.error("Error fetching shop:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchShopsData();
	}, []);

	// Handle row selection
	const handleRowSelection = (selectionModel) => {
		setSelectedShops(selectionModel);
		const selectedRowData =
			selectionModel.length === 1
				? ShopsData.find((shop) => shop.shop_id === selectionModel[0])
				: null;
		setEditingRow(selectedRowData);
		console.log("Editing Row Data:", selectedRowData); // Log for debugging
	};


	//open modal and handle edits
	 const handleEditClick = (row) => {
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


  //Process and save edits, close modal
  const handleSaveChanges = async () => {
    if (!editingRow) return;

    const apiUrl = `https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/shop/${editingRow.shop_id}`;

    try {
      const response = await axios.put(apiUrl, editedData);
      console.log("Row updated successfully:", response.data);
      setShopsData((prev) =>
        prev.map((facility) =>
          facility.facility_id === response.data.facility_id ? response.data : facility
        )
      );
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditedData({});
  };



	// Define columns with editable properties
	const columns = [
		{ field: "shop_id", headerName: "ShopID", flex: 1 },
		{
			field: "shop_name",
			headerName: "Shop Name",
			flex: 1,
			editable: true,
		},
		{ field: "address", headerName: "Address", flex: 1, editable: true },
		{ field: "park_section_id", headerName: "Park Section ID", flex: 1 },
		{
			field: "manager_id",
			headerName: "Manager ID",
			flex: 1,
			editable: true,
		},
		{
			field: "opening_time",
			headerName: "Opening Time",
			flex: 1,
			editable: true,
		},
		{
			field: "closing_time",
			headerName: "Closing Time",
			flex: 1,
			editable: true,
		},
		{
			field: "actions",
			headerName: "Actions",
			renderCell: (params) => (
			  <EditButton
				editingRow={params.row}
				disabled={false}
				onSuccess={handleSaveChanges}
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
				<Header
					title="Shops💻"
					subtitle="View a list of Theme Park Shops"
				/>
				<Box display="flex" alignItems="center">
					<PrintButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/shops/"
						columns={columns}
					/>
					<DownloadButton
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/shops/"
						fileName="shops_report.csv"
						columns={columns}
					/>
					<EditButton
						editingRow={editingRow}
						disabled={!editingRow}
						onSuccess={(updatedRow) => {
							// Update ShopsData state with the updated row details
							setShopsData((prevData) =>
								prevData.map((shop) =>
									shop.shop_id === updatedRow.shop_id
										? updatedRow
										: shop
								)
							);
							setEditingRow(null); // Clear editingRow state after save
						}}
					/>
					<DeleteButton
						selectedItems={selectedShops}
						apiUrl="https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/shops/"
						onDeleteSuccess={() => {
							setShopsData((prevData) =>
								prevData.filter(
									(shop) =>
										!selectedShops.includes(shop.shop_id)
								)
							);
							setSelectedShops([]);
						}}
					/>
					<AddButton navigateTo={"/shopform"} />
				</Box>
			</Box>

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
						backgroundColor: colors.primary[400],
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
					rows={ShopsData}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					loading={loading}
					getRowId={(row) => row.shop_id}
					onRowSelectionModelChange={handleRowSelection}
				/>
			</Box>


		<Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Facility</DialogTitle>
        <DialogContent>
          {Object.keys(editedData).map((key) => (
            key !== "facility_id" && ( // Exclude ID field from the modal
              <TextField
                key={key}
                label={key}
                value={editedData[key] || ''}
                onChange={(e) => handleFieldChange(e, key)}
                fullWidth
                margin="normal"
              />
            )
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
		</Box>
	);
};

export default Shops;
