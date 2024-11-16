import React, { useState, useEffect } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import TicketsSection from "../../components/TicketSection";
import Footer from "../../components/Footer";

const PurchaseTickets = () => {
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/ticket-type/"
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setTickets(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) return <CircularProgress />;
	if (error) return <Typography color="error">Error: {error}</Typography>;

	return (
		<div style={{ padding: "20px" }}>
			<TicketsSection
				title="Park Passes"
				tickets={tickets}
				emptyMessage="No park passes available at this time."
			/>
			<Footer></Footer>
		</div>
	);
};

export default PurchaseTickets;
