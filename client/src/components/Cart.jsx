// Cart.js
import React from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ buttonStyle }) => {
	const navigate = useNavigate();
	const { cartItems } = useCart();

	const cartItemCount = cartItems.reduce(
		(total, item) => total + (item.quantity || 1),
		0
	);

	return (
		<IconButton
			onClick={() => navigate("/shopping-cart")}
			sx={{
				...buttonStyle,
				"&:hover": {
					backgroundColor: "transparent",
					opacity: 1,
				},
			}}
		>
			<Badge badgeContent={cartItemCount} color="error">
				<ShoppingCartOutlinedIcon />
			</Badge>
		</IconButton>
	);
};

export default Cart;
