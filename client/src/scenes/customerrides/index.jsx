import {
	Box,
	Typography,
	CircularProgress,
	Alert,
	Container,
	TextField,
	InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import RideCard from "../../components/RideCard";
import getRideImage from "../../utils/getRideImage";
import Footer from "../../components/Footer";

// Helper functions remain the same
const formatRideType = (rideType) => {
	return rideType
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const CustomerRides = () => {
	const [rides, setRides] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/ride-type/",
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
				setRides(data);
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredRides = rides.filter((ride) =>
		formatRideType(ride.ride_type)
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	return (
		<Box>
			<Container maxWidth="lg">
				<Box py={4}>
					<Typography variant="h3" gutterBottom align="center">
						All Rides & Attractions
					</Typography>

					<Box mb={4}>
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Search rides..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
							}}
						/>
					</Box>

					{loading ? (
						<Box display="flex" justifyContent="center" my={4}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Alert severity="error" sx={{ my: 2 }}>
							Error loading rides: {error}
						</Alert>
					) : (
						<Grid
							container
							spacing={3}
							justifyContent="center"
							alignItems="stretch"
						>
							{filteredRides.map((ride) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									display="flex"
									key={ride.ride_type_id}
								>
									<Box width="100%">
										<RideCard
											title={formatRideType(
												ride.ride_type
											)}
											image={getRideImage(ride.ride_type)}
											description={ride.description}
										/>
									</Box>
								</Grid>
							))}
						</Grid>
					)}
				</Box>
			</Container>
			<Footer></Footer>
		</Box>
	);
};

export default CustomerRides;
