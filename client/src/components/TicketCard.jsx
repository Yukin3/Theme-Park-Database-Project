// TicketCard.js
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/context/UserContext";
import TicketSelectionModal from "./TicketModal";

const StyledCard = styled(Card)({
	width: "100%",
	height: 250,
	// margin: "20px",
	borderRadius: "15px",
	boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
});

const TicketCard = ({ ticket }) => {
	const navigate = useNavigate();
	const { user } = useUser();
	const [modalOpen, setModalOpen] = useState(false);

	const handleFindTickets = () => {
		if (user) {
			setModalOpen(true);
		} else {
			navigate("/custlogin");
		}
	};

	return (
		<StyledCard>
			<CardContent>
				<Typography variant="h5" component="div" fontWeight="bold">
					{ticket.ticket_type}
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ mt: 1 }}
				>
					{ticket.description}
				</Typography>
				<Typography variant="h6" component="div" sx={{ mt: 2 }}>
					From ${ticket.base_price}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					Prices per ticket vary by day. + Tax
				</Typography>
			</CardContent>
			<CardActions style={{ justifyContent: "center" }}>
				<Button
					size="small"
					variant="outlined"
					onClick={handleFindTickets}
					sx={{
						mt: 2,
						backgroundColor: "#2344A1",
						color: "white",
						"&:hover": {
							backgroundColor: "#3A5BC7",
						},
					}}
				>
					Find Tickets
				</Button>
			</CardActions>

			{/* Modal for ticket selection */}
			<TicketSelectionModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				ticket={ticket}
			/>
		</StyledCard>
	);
};

export default TicketCard;
