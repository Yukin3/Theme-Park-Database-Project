import {
	Card,
	CardContent,
	Typography,
	Button,
	Box,
	useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EventCard = ({
	title,
	date,
	description = "Join us for an unforgettable experience!",
	showSeeDatesButton = true, // New prop with a default value of true
}) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Card
			sx={{
				width: 250,
				mb: 2,
				bgcolor: theme.palette.background.paper,
				color: theme.palette.text.primary,
				transition: "all 0.2s ease",
				"&:hover": {
					boxShadow: 3,
				},
			}}
		>
			<CardContent>
				<Box sx={{ mb: 2 }}>
					<Typography
						variant="h5"
						component="div"
						color={theme.palette.text.primary}
					>
						{title}
					</Typography>
					<Typography
						variant="subtitle2"
						color={theme.palette.text.secondary}
					>
						{date}
					</Typography>
				</Box>
				<Typography variant="body2" color={theme.palette.text.primary}>
					{description}
				</Typography>
				{/* Conditionally render the See Dates button */}
				{showSeeDatesButton && (
					<Button
						size="small"
						variant="contained"
						onClick={() => navigate("/customer-events")}
						sx={{
							mt: 2,
							backgroundColor: "#2344A1",
							color: "white",
							"&:hover": {
								backgroundColor: "#3A5BC7",
							},
						}}
					>
						See Dates
					</Button>
				)}
			</CardContent>
		</Card>
	);
};

export default EventCard;
