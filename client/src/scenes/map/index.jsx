import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import Footer from "../../components/Footer";

const MapPage = () => {
	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh", // Full viewport height
					backgroundColor: "#f0f0f0", // Light background color
				}}
			>
				<Paper elevation={3} sx={{ padding: 2, maxWidth: 800 }}>
					<img
						src="/assets/image.png"
						alt="Map of the area"
						style={{ width: "100%", height: "auto" }}
					/>
					<Typography
						variant="h5"
						component="div"
						sx={{ marginTop: 2 }}
					>
						Shasta World
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Embark on a thrilling adventure with your family as you
						explore the fantastic SHASTA WORLD !!! Discover
						spectacular views that will take your breath away, from
						towering roller coasters to serene landscapes. Every
						corner of our park is filled with fun, laughter, and
						memories waiting to be made for everyone. Let the
						adventure begin!
					</Typography>
				</Paper>
			</Box>
			<Footer></Footer>
		</Box>
	);
};

export default MapPage;
