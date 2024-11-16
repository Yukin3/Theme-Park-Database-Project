// pages/CustomerShops.js
import {
	Box,
	Typography,
	CircularProgress,
	Alert,
	Container,
	TextField,
	InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import ShopCard from "../../components/ShopCard";
import ShopModal from "../../components/ShopModal";
import getShopImage from "../../utils/getShopImage";
import Footer from "../../components/Footer";

const CustomerShops = () => {
	const [Shops, setShops] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedShop, setSelectedShop] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/shops/",
					{
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
					}
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setShops(data);
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredShops = Shops.filter((shop) =>
		shop.shop_name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleOpenModal = (shop) => {
		setSelectedShop(shop);
	};

	const handleCloseModal = () => {
		setSelectedShop(null);
	};

	return (
		<Box>
			{/* Banner Section */}
			<Box
				sx={{
					backgroundImage: "url('/assets/banner.jpg')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					py: 6,
					color: "white",
					textAlign: "center",
				}}
			>
				<Typography variant="h3" fontWeight="bold" gutterBottom>
					Discover Our Shops
				</Typography>
				<Typography variant="h6" mb={3}>
					Explore our wide range of shopping options! Gifts,nicknacks,
					and more!
				</Typography>
				<Container maxWidth="md">
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Search for shop..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search color="inherit" />
								</InputAdornment>
							),
						}}
						sx={{
							backgroundColor: "rgba(255, 255, 255, 0.9)",
							borderRadius: 1,
						}}
					/>
				</Container>
			</Box>

			{/* Shop Cards Section */}
			<Container maxWidth="lg">
				<Box py={6}>
					{loading ? (
						<Box display="flex" justifyContent="center" my={4}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Alert severity="error" sx={{ my: 2 }}>
							Error loading shopss: {error}
						</Alert>
					) : (
						<Grid container spacing={4}>
							{filteredShops.map((shop) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={shop.shop_id}
								>
									<ShopCard
										shop={shop}
										image={getShopImage(shop.shop_id)}
										onClick={() => handleOpenModal(shop)}
									/>
								</Grid>
							))}
						</Grid>
					)}

					{/* Modal for Shop Details */}
					{selectedShop && (
						<ShopModal
							open={Boolean(selectedShop)}
							onClose={handleCloseModal}
							shop={selectedShop}
							image={getShopImage(selectedShop.shop_id)}
						/>
					)}
				</Box>
			</Container>
			<Footer></Footer>
		</Box>
	);
};

export default CustomerShops;
