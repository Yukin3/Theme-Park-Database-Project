import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Typography,
	Button,
	Box,
	useTheme,
} from "@mui/material";

const PromoModal = ({ open, onClose }) => {
	const theme = useTheme();

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>
				<Box sx={{ textAlign: "center" }}>
					<Typography variant="h4" color={theme.palette.text.primary}>
						Special Promotion!
					</Typography>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box textAlign="center" mt={2} mb={2}>
					<Typography variant="h6" color={theme.palette.text.primary}>
						Get 20% off on a Season Pass!
					</Typography>
					<Typography
						variant="body1"
						color={theme.palette.text.secondary}
						mt={1}
					>
						Enjoy unlimited access to the park all season long with
						our exclusive Season Pass. For a limited time, qualify
						for a 20% discount and make the most of your visits!
					</Typography>
					<Typography
						variant="body2"
						color={theme.palette.text.secondary}
						mt={2}
					>
						Promo applied automatically at checkout.
					</Typography>
				</Box>
			</DialogContent>
			<DialogActions>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
					}}
				>
					<Button
						variant="contained"
						color="primary"
						onClick={onClose}
						sx={{
							backgroundColor: "#FFD700", // Secondary color for button
							color: theme.palette.secondary.contrastText, // Ensure text is readable
							"&:hover": {
								backgroundColor: "#FFEA00",
							},
						}}
					>
						Got It!
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
};

export default PromoModal;
