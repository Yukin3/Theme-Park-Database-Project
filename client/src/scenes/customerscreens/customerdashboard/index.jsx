// CustomerDashboard.js
import {
	Box,
	Typography,
	CircularProgress,
	Alert,
	Button,
	Fade,
	Container,
	useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../../../components/HeroCarousel";
import RideCard from "../../../components/RideCard";
import EventCard from "../../../components/EventCard";
import PromotionBanner from "../../../components/PromotionBanner";
import getRideImage from "../../../utils/getRideImage";
import Footer from "../../../components/Footer";

const formatRideType = (rideType) => {
	return rideType
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

// const getRideImage = (rideType) =>
// 	require(`../../public/assets/rides/${rideType}.jpg`).default;

const formatDateTime = (date, time) => {
	const eventDate = new Date(date + " " + time);
	return eventDate.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
};

const INITIAL_DISPLAY_COUNT = 3;

const CustomerDashboard = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const [rides, setRides] = useState([]);
	const [shows, setShows] = useState([]);
	const [ridesLoading, setRidesLoading] = useState(true);
	const [showsLoading, setShowsLoading] = useState(true);
	const [ridesError, setRidesError] = useState(null);
	const [showsError, setShowsError] = useState(null);

	useEffect(() => {
		const fetchRides = async () => {
			try {
				setRidesLoading(true);
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
				setRidesError(err.message);
			} finally {
				setRidesLoading(false);
			}
		};

		const fetchShows = async () => {
			try {
				setShowsLoading(true);
				const response = await fetch(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/entertainment/",
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
				setShows(data);
			} catch (err) {
				console.error("Fetch error:", err);
				setShowsError(err.message);
			} finally {
				setShowsLoading(false);
			}
		};

		fetchRides();
		fetchShows();
	}, []);

	const handleSeeAllRides = () => {
		navigate("/customer-rides");
	};

	const handleSeeAllEvents = () => {
		navigate("/customer-events");
	};

	const renderLoadingState = () => (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			minHeight="200px"
		>
			<CircularProgress />
		</Box>
	);

	const activeShows = shows
		.filter((show) => show.status === "Active")
		.sort((a, b) => new Date(a.show_date) - new Date(b.show_date));

	return (
		<Box>
			<HeroCarousel />

			<PromotionBanner
				title="Save up to 20% with Season Pass!"
				ctaText="See Details"
			/>

			{/* Rides Section */}
			<Container maxWidth="lg" id="rides-section">
				<Box mt={4} mb={4}>
					<Typography variant="h4" gutterBottom align="center" mb={3}>
						Featured Rides & Attractions
					</Typography>
					{ridesLoading ? (
						renderLoadingState()
					) : ridesError ? (
						<Alert severity="error" sx={{ my: 2 }}>
							Error loading rides: {ridesError}
						</Alert>
					) : (
						<>
							<Grid
								container
								spacing={3}
								justifyContent="center"
								alignItems="stretch"
							>
								{rides
									.slice(0, INITIAL_DISPLAY_COUNT)
									.map((ride, index) => (
										<Fade
											in={true}
											timeout={300}
											style={{
												transitionDelay: `${index * 100}ms`,
											}}
											key={ride.ride_type_id}
										>
											<Grid
												item
												xs={12}
												sm={6}
												md={4}
												display="flex"
											>
												<Box width="100%">
													<RideCard
														title={formatRideType(
															ride.ride_type
														)}
														image={getRideImage(
															ride.ride_type
														)}
														description={
															ride.description
														}
													/>
												</Box>
											</Grid>
										</Fade>
									))}
							</Grid>
							<Box display="flex" justifyContent="center" mt={2}>
								<Button
									variant="contained"
									onClick={handleSeeAllRides}
									sx={{
										mt: 1,
										mb: 2,
										px: 4,
										borderRadius: 1,
										backgroundColor: "#2344A1",
										color: "white",
										"&:hover": {
											backgroundColor: "#3A5BC7",
										},
									}}
								>
									See All Rides
								</Button>
							</Box>
						</>
					)}
				</Box>
			</Container>

			{/* Shows Section */}
			<Container maxWidth="lg" id="shows-section">
				<Box mt={6} mb={4}>
					<Typography variant="h4" gutterBottom align="center" mb={3}>
						Upcoming Shows & Events
					</Typography>
					{showsLoading ? (
						renderLoadingState()
					) : showsError ? (
						<Alert severity="error" sx={{ my: 2 }}>
							Error loading shows: {showsError}
						</Alert>
					) : (
						<>
							<Grid
								container
								spacing={3}
								justifyContent="center"
								alignItems="stretch"
							>
								{activeShows
									.slice(0, INITIAL_DISPLAY_COUNT)
									.map((show, index) => (
										<Fade
											in={true}
											timeout={300}
											style={{
												transitionDelay: `${index * 100}ms`,
											}}
											key={show.show_id}
										>
											<Grid item display="flex">
												<EventCard
													title={show.show_name}
													date={formatDateTime(
														show.show_date,
														show.show_time
													)}
													description={`Join us for this amazing show! Tickets starting at $${show.ticket_price.toFixed(2)}`}
													showSeeDatesButton={true}
												/>
											</Grid>
										</Fade>
									))}
							</Grid>
							{activeShows.length > INITIAL_DISPLAY_COUNT && (
								<Box
									display="flex"
									justifyContent="center"
									mt={3}
								>
									<Button
										variant="contained"
										onClick={handleSeeAllEvents}
										sx={{
											mt: 1,
											mb: 2,
											px: 4,
											borderRadius: 1,
											backgroundColor: "#2344A1",
											color: "white",
											"&:hover": {
												backgroundColor: "#3A5BC7",
											},
										}}
									>
										See All Events
									</Button>
								</Box>
							)}
						</>
					)}
				</Box>
			</Container>
			<Footer></Footer>
		</Box>
	);
};

export default CustomerDashboard;
