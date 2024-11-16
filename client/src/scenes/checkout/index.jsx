import React, { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Divider,
	Paper,
	Grid,
} from "@mui/material";
import { useCart } from "../../components/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";

function getTicketTypeId(ticketTypeInput) {
	const ticketTypes = [
		{ ticket_type_id: 1, ticket_type: "SEASONAL" },
		{ ticket_type_id: 2, ticket_type: "WEEKEND" },
		{ ticket_type_id: 3, ticket_type: "DAY_PASS" },
		{ ticket_type_id: 4, ticket_type: "VIP" },
		{ ticket_type_id: 5, ticket_type: "GROUP" },
		{ ticket_type_id: 6, ticket_type: "STUDENT" },
	];

	const ticketTypeName = ticketTypeInput.match(
		/(SEASONAL|WEEKEND|DAY_PASS|VIP|GROUP|STUDENT)/i
	);

	const cleanedTicketType = ticketTypeName
		? ticketTypeName[0].toUpperCase()
		: null;

	if (cleanedTicketType) {
		const ticket = ticketTypes.find(
			(t) => t.ticket_type === cleanedTicketType
		);
		return ticket ? ticket.ticket_type_id : null;
	}
	return null;
}

const Checkout = () => {
	const { cartItems, setCartItems, calculateTotal } = useCart();
	const { user } = useUser();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		cardNumber: "",
		expirationDate: "",
		cvc: "",
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validateForm = () => {
		const errors = {};

		// Validate ZIP Code
		if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
			errors.zip = "Invalid ZIP Code. Use 5 digits or 5+4 format.";
		}

		// Validate Card Number
		if (!/^\d{13,19}$/.test(formData.cardNumber)) {
			errors.cardNumber = "Invalid Card Number. Must be 13-19 digits.";
		}

		// Validate CVC
		if (!/^\d{3,4}$/.test(formData.cvc)) {
			errors.cvc = "Invalid CVC. Must be 3-4 digits.";
		}

		// Validate Expiration Date
		const [month, year] = formData.expirationDate.split("/");
		const currentDate = new Date();
		const inputDate = new Date(`20${year}`, month - 1);

		if (!month || !year || isNaN(inputDate) || inputDate <= currentDate) {
			errors.expirationDate = "Invalid or expired expiration date.";
		}

		console.log("Validation Errors:", errors); // Debugging
		return errors;
	};

	const handlePlaceOrder = async () => {
		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			console.log("Form Validation Failed:", formErrors); // Debugging
			return;
		}

		try {
			for (const item of cartItems) {
				const startDate = item.date
					? new Date(item.date).toISOString().split("T")[0]
					: null;

				const expirationDate = item.date
					? new Date(
							new Date(item.date).setDate(
								new Date(item.date).getDate() + 30
							)
						)
							.toISOString()
							.split("T")[0]
					: null;

				const ticketData = {
					ticket_id: item.id,
					customer_id: user.customer_id,
					price: item.price,
					purchase_date: new Date().toISOString().split("T")[0],
					start_date: startDate,
					expiration_date: expirationDate,
					discount: 0.0,
					special_access: null,
					status: "ACTIVE",
					ticket_type_id: getTicketTypeId(item.name),
				};

				const response = await fetch(
					"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/tickets/",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(ticketData),
					}
				);

				if (!response.ok) {
					throw new Error("Failed to place order.");
				}
			}

			localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
			setCartItems([]);
			navigate("/confirmation");
		} catch (error) {
			console.error(error);
			alert(
				"There was an error processing your order. Please try again."
			);
		}
	};

	const total = calculateTotal();

	return (
		<Box p={3} maxWidth="md" mx="auto">
			<Typography variant="h3" gutterBottom align="center">
				Checkout
			</Typography>
			<Divider />

			<Box
				mt={3}
				component={Paper}
				elevation={3}
				p={3}
				borderRadius="8px"
			>
				{/* Order Summary */}
				<Typography variant="h5" gutterBottom>
					Order Summary
				</Typography>
				{/* Existing order summary code */}

				{/* Customer Information */}
				<Typography variant="h6" gutterBottom>
					Customer Information
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="First Name"
							name="first_name"
							value={formData.first_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="Last Name"
							name="last_name"
							value={formData.last_name}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</Grid>
				</Grid>

				{/* Billing Address */}
				<Typography variant="h6" gutterBottom mt={3}>
					Billing Address
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="City"
							name="city"
							value={formData.city}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							fullWidth
							label="ZIP Code"
							name="zip"
							value={formData.zip}
							onChange={handleChange}
							type="number"
							error={!!errors.zip}
							helperText={errors.zip}
						/>
					</Grid>
				</Grid>

				{/* Payment Information */}
				<Typography variant="h6" gutterBottom mt={3}>
					Payment Information
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Card Number"
							name="cardNumber"
							value={formData.cardNumber}
							onChange={handleChange}
							type="number"
							error={!!errors.cardNumber}
							helperText={errors.cardNumber}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="Expiration Date (MM/YY)"
							name="expirationDate"
							value={formData.expirationDate}
							onChange={handleChange}
							placeholder="MM/YY"
							error={!!errors.expirationDate}
							helperText={errors.expirationDate}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label="CVC"
							name="cvc"
							value={formData.cvc}
							onChange={handleChange}
							type="number"
							error={!!errors.cvc}
							helperText={errors.cvc}
							inputProps={{ maxLength: 4 }}
						/>
					</Grid>
				</Grid>

				{/* Buttons */}
				<Box mt={4} display="flex" justifyContent="space-between">
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => navigate("/shopping-cart")}
					>
						Back to Shopping Cart
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handlePlaceOrder}
						sx={{
							backgroundColor: "#2344A1",
							color: "white",
							"&:hover": {
								backgroundColor: "#3A5BC7",
							},
						}}
					>
						Place Order
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Checkout;
