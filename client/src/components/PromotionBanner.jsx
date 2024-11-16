import { useState } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import PromoModal from "./PromoModal";

const PromotionBanner = ({ title, ctaText }) => {
	const theme = useTheme();
	const [isPromoOpen, setIsPromoOpen] = useState(false);

	const handleOpenPromo = () => {
		setIsPromoOpen(true);
	};

	const handleClosePromo = () => {
		setIsPromoOpen(false);
	};

	return (
		<Box
			sx={{
				backgroundColor: "#FFF4E0", // Use primary color from theme
				color: theme.palette.text.primary, // Use contrast text for readability
				p: 3,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				borderRadius: "8px",
				mb: 4,
				boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Typography variant="h5">{title}</Typography>
			<Button
				variant="contained"
				// color="secondary"
				onClick={handleOpenPromo} // Open modal on button click
				sx={{
					backgroundColor: "#FFD700", // Secondary color for button
					color: theme.palette.secondary.contrastText, // Ensure text is readable
					"&:hover": {
						backgroundColor: "#FFEA00",
					},
				}}
			>
				{ctaText}
			</Button>

			{/* Promo Modal */}
			<PromoModal open={isPromoOpen} onClose={handleClosePromo} />
		</Box>
	);
};

export default PromotionBanner;
