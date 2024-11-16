import {
	Box,
	Typography,
	CircularProgress,
	Alert,
	Container,
	Paper,
	Divider,
	useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventCard from "../../components/EventCard";
import Footer from "../../components/Footer";

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

const formatMonthYear = (date) => {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});
};

const CustomerEvents = () => {
	const theme = useTheme();
	const [shows, setShows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
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
				console.log("Fetched shows:", data);
				setShows(data);
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const activeShows = shows
		.filter((show) => show.status === "Active")
		.map((show) => {
			let time = show.show_time;
			if (time.includes("AM") || time.includes("PM")) {
				const [time12, modifier] = time.split(" ");
				let [hours, minutes] = time12.split(":");
				if (modifier === "PM" && hours !== "12") {
					hours = parseInt(hours) + 12;
				}
				if (modifier === "AM" && hours === "12") {
					hours = "00";
				}
				time = `${hours}:${minutes}`;
			}

			return {
				title: show.show_name,
				start: `${show.show_date}T${time}`,
				extendedProps: {
					price: show.ticket_price,
					showId: show.show_id,
				},
			};
		});

	const sixMonthsFromNow = new Date();
	sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

	const upcomingShows = shows
		.filter((show) => {
			const showDate = new Date(show.show_date);
			const now = new Date();
			now.setHours(0, 0, 0, 0);
			return (
				show.status === "Active" &&
				showDate >= now &&
				showDate <= sixMonthsFromNow
			);
		})
		.sort((a, b) => new Date(a.show_date) - new Date(b.show_date));

	const groupedShows = upcomingShows.reduce((groups, show) => {
		const monthYear = formatMonthYear(show.show_date);
		if (!groups[monthYear]) {
			groups[monthYear] = [];
		}
		groups[monthYear].push(show);
		return groups;
	}, {});

	return (
		<Box>
			<Container maxWidth="lg">
				<Box py={4}>
					<Typography variant="h3" gutterBottom align="center">
						Shows & Events Calendar
					</Typography>

					{loading ? (
						<Box display="flex" justifyContent="center" my={4}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Alert severity="error" sx={{ my: 2 }}>
							Error loading shows: {error}
						</Alert>
					) : (
						<Box
							sx={{
								display: "flex",
								flexDirection: { xs: "column", md: "row" },
								gap: 4,
							}}
						>
							{/* Calendar Section */}
							<Paper
								elevation={3}
								sx={{
									flex: "1 1 auto",
									p: 2,
									backgroundColor:
										theme.palette.background.paper,
									"& .fc": {
										fontFamily: "inherit",
									},
									"& .fc-toolbar-title": {
										fontSize: "1.25rem",
									},
									"& .fc-event": {
										cursor: "pointer",
										backgroundColor: "#2344A1",
										color: "white",
										"&:hover": {
											backgroundColor: "#3A5BC7",
											opacity: 0.9,
										},
									},
									"& .fc-day-today": {
										backgroundColor: `${theme.palette.primary.light}33`,
									},
									"& .fc-col-header-cell": {
										backgroundColor:
											theme.palette.neutral.light,
										color: theme.palette.text.primary,
									},
								}}
							>
								<FullCalendar
									plugins={[dayGridPlugin, timeGridPlugin]}
									initialView="dayGridMonth"
									events={activeShows}
									headerToolbar={{
										left: "prev,next today",
										center: "title",
										right: "dayGridMonth,timeGridWeek",
									}}
									height="auto"
									eventDisplay="block"
									displayEventEnd={true}
									eventTimeFormat={{
										hour: "numeric",
										minute: "2-digit",
										meridiem: "short",
									}}
								/>
							</Paper>

							{/* Upcoming Shows Section */}
							<Paper
								elevation={3}
								sx={{
									flex: "0 0 auto",
									width: { xs: "100%", md: "400px" },
									p: 0,
									backgroundColor:
										theme.palette.background.paper,
									color: theme.palette.text.primary,
									maxHeight: { md: "800px" },
									overflow: "hidden",
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Box
									sx={{
										p: 3,
										pb: 2,
										borderBottom: 1,
										borderColor: theme.palette.divider,
										backgroundColor:
											theme.palette.background.paper,
									}}
								>
									<Typography
										variant="h3"
										gutterBottom={false}
										sx={{
											color: theme.palette.text.primary,
										}}
									>
										Upcoming Shows
									</Typography>
								</Box>

								<Box
									sx={{
										overflowY: "auto",
										flexGrow: 1,
										pb: 3,
										"&::-webkit-scrollbar": {
											width: "8px",
										},
										"&::-webkit-scrollbar-track": {
											background:
												theme.palette.background
													.default,
											borderRadius: "4px",
										},
										"&::-webkit-scrollbar-thumb": {
											background:
												theme.palette.primary.light,
											borderRadius: "4px",
											"&:hover": {
												background:
													theme.palette.primary.main,
											},
										},
									}}
								>
									{Object.keys(groupedShows).length === 0 ? (
										<Alert
											severity="info"
											sx={{ mt: 2, mx: 3 }}
										>
											No upcoming shows scheduled.
										</Alert>
									) : (
										<Box sx={{ mt: 2 }}>
											{Object.entries(groupedShows).map(
												(
													[monthYear, monthShows],
													index
												) => (
													<Box
														key={monthYear}
														sx={{
															mb: 3,
															"&:last-child": {
																mb: 0,
															},
														}}
													>
														<Box
															sx={{
																position:
																	"sticky",
																top: 0,
																bgcolor:
																	"#2344A1",
																pt:
																	index === 0
																		? 0
																		: 2,
																zIndex: 1,
																display: "flex",
																flexDirection:
																	"column",
																width: "100%",
															}}
														>
															<Typography
																variant="h6"
																sx={{
																	fontSize:
																		"1.1rem",
																	fontWeight: 500,
																	color: theme
																		.palette
																		.common
																		.white,
																	mb: 1,
																	pl: 3,
																}}
															>
																{monthYear}
															</Typography>
															<Divider />
														</Box>

														<Box
															sx={{
																display: "flex",
																flexDirection:
																	"column",
																gap: 2,
																mt: 2,
																px: 3,
															}}
														>
															{monthShows.map(
																(show) => (
																	<EventCard
																		key={
																			show.show_id
																		}
																		title={
																			show.show_name
																		}
																		date={formatDateTime(
																			show.show_date,
																			show.show_time
																		)}
																		description={`Join us for this amazing show! Tickets starting at $${show.ticket_price.toFixed(2)}`}
																		showSeeDatesButton={
																			false
																		}
																	/>
																)
															)}
														</Box>
													</Box>
												)
											)}
										</Box>
									)}
								</Box>
							</Paper>
						</Box>
					)}
				</Box>
			</Container>
			<Footer />
		</Box>
	);
};

export default CustomerEvents;
