import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";

export default function SignUpPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const { login } = useUser();
	const [emailError, setEmailError] = useState("");

	const handleSignUp = async (e) => {
		e.preventDefault();
		setEmailError("");

		// Check password length and match
		if (password.length < 8) {
			alert("Password must be at least 8 characters long.");
			return;
		}
		if (password !== confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		try {
			const response = await fetch(
				"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/cust-auth/signup",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username,
						email,
						first_name,
						last_name,
						password,
					}),
				}
			);

			if (response.ok) {
				let data;
				try {
					// Attempt to parse the JSON response
					data = await response.json();
					console.log("Sign-up successful:", data);
				} catch (parseError) {
					console.error("Failed to parse JSON:", parseError);
					alert("Unexpected response format. Please try again.");
					return;
				}

				login(
					{
						uid: data.user?.uid || data.uid,
						email: data.user?.email || data.email,
						customer_id: data.user?.customer_id || data.customer_id,
						first_name: data.user?.first_name || data.first_name,
						last_name: data.user?.last_name || data.last_name,
					},
					"customer"
				);

				localStorage.setItem("access_token", data.access_token);
				localStorage.setItem("refresh_token", data.refresh_token);
				localStorage.setItem(
					"user_data",
					JSON.stringify({
						uid: data.user?.uid || data.uid,
						email: data.user?.email || data.email,
						customer_id: data.user?.customer_id || data.customer_id,
						first_name: data.user?.first_name || data.first_name,
						last_name: data.user?.last_name || data.last_name,
					})
				);
				navigate("/"); // Send user to completion page after successful signup
			} else {
				let errorData;
				try {
					// Attempt to parse the JSON error response
					errorData = await response.json();
				} catch (parseError) {
					console.error("Failed to parse error JSON:", parseError);
					alert("An error occurred. Please try again.");
					return;
				}

				if (
					errorData.message &&
					errorData.message.includes("email already exists")
				) {
					setEmailError(
						"An account with this email already exists. Please try logging in."
					);
				} else {
					alert("An error occurred. Please try again.");
				}
			}
		} catch (error) {
			console.error("Sign-up failed:", error);
			alert(
				"An error occurred while signing up. Please try again later."
			);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				pt: 4,
			}}
		>
			<Box
				className="wrapper"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					maxWidth: 700,
					margin: "0 auto",
					padding: 6,
					border: "1px solid #ccc",
					borderRadius: 2,
					boxShadow: 3,
				}}
			>
				<Box
					flex="1"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<img
						src="assets/logo.png"
						alt="Logo"
						style={{ maxHeight: "50px", cursor: "pointer" }}
						onClick={() => navigate("/")}
					/>
				</Box>
				<Typography variant="h4" gutterBottom marginBottom="35px">
					Customer Sign-Up
				</Typography>
				<form onSubmit={handleSignUp}>
					<Box sx={{ mb: 2 }}>
						<TextField
							type="text"
							placeholder="Username"
							required
							fullWidth
							variant="outlined"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							sx={{ mb: 2 }}
						/>
						<TextField
							type="email"
							placeholder="Email"
							required
							fullWidth
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<PersonOutlinedIcon />
									</InputAdornment>
								),
							}}
							sx={{ mb: 2 }}
							error={Boolean(emailError)}
							helperText={emailError}
						/>
						<TextField
							type="text"
							placeholder="First Name"
							required
							fullWidth
							variant="outlined"
							value={first_name}
							onChange={(e) => setFirstName(e.target.value)}
							sx={{ mb: 2 }}
						/>
						<TextField
							type="text"
							placeholder="Last Name"
							required
							fullWidth
							variant="outlined"
							value={last_name}
							onChange={(e) => setLastName(e.target.value)}
							sx={{ mb: 2 }}
						/>
						<TextField
							type="password"
							placeholder="Password"
							required
							fullWidth
							variant="outlined"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								setIsPasswordValid(e.target.value.length >= 8);
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
								inputProps: {
									minLength: 8,
								},
							}}
							sx={{ mb: 2 }}
							error={!isPasswordValid}
							helperText={
								!isPasswordValid
									? "Password must be at least 8 characters long."
									: ""
							}
						/>
						<TextField
							type="password"
							placeholder="Confirm Password"
							required
							fullWidth
							variant="outlined"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
								setPasswordsMatch(e.target.value === password);
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
							sx={{ mb: 2 }}
							error={!passwordsMatch}
							helperText={
								!passwordsMatch ? "Passwords do not match." : ""
							}
						/>
					</Box>
					<Box
						sx={{
							mb: 2,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Typography variant="h4" gutterBottom>
							Already a Customer?{" "}
							<Link to="/custlogin"> Login Here</Link>
						</Typography>
					</Box>
					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{
							mt: 2,
							backgroundColor: "#2344A1",
							color: "white",
							"&:hover": {
								backgroundColor: "#3A5BC7",
							},
						}}
					>
						Sign Up
					</Button>
				</form>
			</Box>
		</Box>
	);
}
