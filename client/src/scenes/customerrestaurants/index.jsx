// pages/CustomerRestaurants.js
import {
	Box,
	Typography,
	useTheme,
	CircularProgress,
	Alert,
	Container,
	TextField,
	InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import RestaurantCard from "../../components/RestaurantCard";
import RestaurantModal from "../../components/RestaurantModal";
import getRestaurantImage from "../../utils/getRestaurantImage";
import Footer from "../../components/Footer";

const CustomerRestaurants = () => {
	const [restaurants, setRestaurants] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedRestaurant, setSelectedRestaurant] = useState(null);
	const theme = useTheme();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/restaurants/",
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
				setRestaurants(data);
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredRestaurants = restaurants.filter((restaurant) =>
		restaurant.restaurant_name
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	const handleOpenModal = (restaurant) => {
		setSelectedRestaurant(restaurant);
	};

	const handleCloseModal = () => {
		setSelectedRestaurant(null);
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
				<Typography
					variant="h3"
					fontWeight="bold"
					gutterBottom
					sx={{ color: theme.palette.text.primary }}
				>
					Discover Our Restaurants
				</Typography>
				<Typography
					variant="h6"
					mb={3}
					sx={{ color: theme.palette.text.primary }}
				>
					Explore a wide range of dining options to satisfy every
					taste.
				</Typography>
				<Container maxWidth="md">
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Search for restaurants..."
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

			{/* Restaurant Cards Section */}
			<Container maxWidth="lg">
				<Box py={6}>
					{loading ? (
						<Box display="flex" justifyContent="center" my={4}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Alert severity="error" sx={{ my: 2 }}>
							Error loading restaurants: {error}
						</Alert>
					) : (
						<Grid container spacing={4}>
							{filteredRestaurants.map((restaurant) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={restaurant.restaurant_id}
								>
									<RestaurantCard
										restaurant={restaurant}
										image={getRestaurantImage(
											restaurant.restaurant_id
										)}
										onClick={() =>
											handleOpenModal(restaurant)
										}
									/>
								</Grid>
							))}
						</Grid>
					)}

					{/* Modal for Restaurant Details */}
					{selectedRestaurant && (
						<RestaurantModal
							open={Boolean(selectedRestaurant)}
							onClose={handleCloseModal}
							restaurant={selectedRestaurant}
							image={getRestaurantImage(
								selectedRestaurant.restaurant_id
							)}
						/>
					)}
				</Box>
			</Container>
			<Footer></Footer>
		</Box>
	);
};

export default CustomerRestaurants;
