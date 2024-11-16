// ShoppingCart.js
import React from "react";
import { Box, Typography, Button, Divider, Paper } from "@mui/material";
import ShoppingCartItem from "../../components/ShoppingCartItem";
import { useCart } from "../../components/context/CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
	const { cartItems, removeItem, updateItemQuantity, calculateTotal } =
		useCart();
	const navigate = useNavigate();

	const handleRemoveItem = (itemId) => removeItem(itemId);
	const handleUpdateQuantity = (itemId, newQuantity) =>
		updateItemQuantity(itemId, newQuantity);

	const total = calculateTotal();

	return (
		<Box p={3} maxWidth="md" mx="auto">
			<Typography variant="h4" gutterBottom align="center">
				Shopping Cart
			</Typography>
			<Divider />

			{cartItems.length > 0 ? (
				<Box
					mt={3}
					component={Paper}
					elevation={3}
					p={3}
					borderRadius="8px"
				>
					{cartItems.map((item) => (
						<ShoppingCartItem
							key={item.id}
							item={item}
							onRemove={handleRemoveItem}
							onUpdateQuantity={handleUpdateQuantity}
						/>
					))}
					<Divider sx={{ my: 2 }} />
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="h6">
							Total: ${total.toFixed(2)}
						</Typography>
						<Button
							variant="contained"
							color="primary"
							onClick={() => navigate("/checkout")}
							sx={{
								backgroundColor: "#2344A1",
								color: "white",
								"&:hover": {
									backgroundColor: "#3A5BC7",
								},
							}}
						>
							Proceed to Checkout
						</Button>
					</Box>
				</Box>
			) : (
				<Box textAlign="center" mt={4} p={3}>
					<Typography variant="h6" gutterBottom>
						Your cart is empty.
					</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						gutterBottom
					>
						Looks like you haven't added any tickets yet. Check out
						our available tickets!
					</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={() => navigate("/purchase-tickets")}
						sx={{
							mt: 2,
							backgroundColor: "#2344A1",
							color: "white",
							"&:hover": {
								backgroundColor: "#3A5BC7",
							},
						}}
					>
						Buy Tickets
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default ShoppingCart;
