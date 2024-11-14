import {
	Box,
	Typography,
	useTheme,
	CircularProgress,
	Alert,
	Container,
	TextField,
    Stack,
	InputAdornment,
    ListItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { List, Search } from "lucide-react";
import { useState, useEffect } from "react";


const CustomerFacilities = () => {
	const [facilities, setFacilities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFacilities, setSelectedFacilities] = useState(null);
	const theme = useTheme();
    useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/park-factilities/",
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
				setFacilities(data);
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

    const filteredFacilities = facilities.filter((facility) =>
		facility.facility_name
			.toLowerCase()
	);

    return (
            <Box>
                {/* Banner Section */}
                <Box
                    sx={{
                      
                        backgroundPosition: "center",
                        py: 6,
                        textAlign: "center",
                    }}
                >
            <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{ color: theme.palette.text.primary }}
            >
                Our Facilities
            </Typography>
            </Box>
                <Box>
                <Box
                    sx={{
                      
                        textAlign: "center",
                    }}
                >
                <img
					src="/assets/facilitiesicon.png"
					style={{ width: "20%", height: "20%" }}
                    sx={{display: "flex", justifyContent: "center", textAlign: "center",}}   
                        />
	</Box>
               
			
            </Box>
            <Container maxWidth="lg">
				<Box py={6}>
					{loading ? (
						<Box display="flex" justifyContent="center" my={4}>
							<CircularProgress />
						</Box>
					) : error ? (
						<Alert severity="error" sx={{ my: 2 }}>
							Error loading facilites: {error}
						</Alert>
					) : (
						<Stack>
							{filteredFacilities.map((facility) => (
								<Stack
									item
									xs={12}
									sm={6}
									md={4}
									key={facility.facility_id}
								>
                                    
									<Typography variant="h5" textAlign={"center"} gutterBottom>
					- {facility.facility_name}
				</Typography>git
                </Stack>
							))}
						</Stack>
					)}

				</Box>
			</Container>
            </Box>
                    );
};
    export default CustomerFacilities;