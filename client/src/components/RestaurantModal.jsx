import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Box,
	Button,
} from "@mui/material";

export default function RestaurantModal({ open, onClose, restaurant, image }) {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>
				<Typography variant="h3" fontWeight="bold">
					{restaurant.restaurant_name}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					gap={2}
				>
					<Box
						component="img"
						src={image}
						alt={restaurant.restaurant_name}
						sx={{
							width: "100%",
							maxWidth: 300, // Set max width for the image
							borderRadius: 2,
							objectFit: "cover",
							mb: 2,
						}}
					/>
					<Typography variant="h5" color="text.primary">
						About us
					</Typography>
					<Typography variant="body1" color="text.secondary">
						{restaurant.description || "No description available."}
					</Typography>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={onClose}
					variant="contained"
					sx={{
						mt: 2,
						backgroundColor: "#2344A1",
						color: "white",
						"&:hover": {
							backgroundColor: "#3A5BC7",
						},
					}}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}
