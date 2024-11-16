import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TicketCard from "./TicketCard";

const TicketsSection = ({ title, tickets, emptyMessage, styleVariant }) => {
	const theme = useTheme(); // Access the theme

	const isEmpty = tickets.length === 0;

	// Use theme colors based on styleVariant for background color
	const sectionStyles = {
		marginBottom: "40px",
		padding: "20px",
		borderRadius: "8px",
		backgroundColor: theme.palette.sectionBackground.main, // default background
		boxShadow:
			styleVariant === "show"
				? "0px 4px 10px rgba(0, 0, 0, 0.1)"
				: "none",
	};

	return (
		<Box sx={sectionStyles}>
			<Typography variant="h3" align="center" pl={3} gutterBottom>
				{title}
			</Typography>
			{isEmpty ? (
				<Typography
					variant="body1"
					color="textSecondary"
					align="center"
				>
					{emptyMessage}
				</Typography>
			) : (
				<Grid
					container
					spacing={3}
					alignItems="center"
					justifyContent="center"
				>
					{tickets.map((ticket) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={ticket.ticket_type_id}
						>
							<TicketCard ticket={ticket} />
						</Grid>
					))}
				</Grid>
			)}
			<Box sx={{ mt: 4, textAlign: "center" }}>
				<Typography variant="caption" display="block">
					Terms and Conditions: All sales are final.
				</Typography>
				<Typography variant="caption" display="block">
					No refunds or exchanges. Please read and agree to all terms
					before purchasing.
				</Typography>
			</Box>
		</Box>
	);
};

export default TicketsSection;
