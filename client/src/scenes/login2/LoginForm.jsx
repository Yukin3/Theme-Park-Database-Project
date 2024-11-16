import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";

export default function LoginForm() {
	//Get cust credentials
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useUser();
	const [errorMessage, setErrorMessage] = useState("");

	//Handle cust login authentication
	const handleLogin = async (e) => {
		console.log({ email, password });
		e.preventDefault();
		try {
			const response = await fetch(
				"https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/emp-auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Login failed with status:", response.status);
				console.error("Error details:", errorData);
				setErrorMessage("Invalid email or password");
				return;
			}

			const data = await response.json();
			if (data && data.user) {
				const { role, uid, email } = data.user;

				{
					/*details for fetching customer info */
				}

				const userResponse = await fetch(
					`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/employees/email/${data.user.user}`
				);
				console.log("Data: ", userResponse);

				if (!userResponse.ok) {
					setErrorMessage("Failed to fetch user details");
					console.error(
						"Failed to fetch user details:",
						userResponse.status
					);
					return;
				}

				const userData = await userResponse.json();
				console.log("User Response:", userResponse); //sign in details
				console.log("User Data:", userData); //user details
				console.log("User Data:", userData.department_id); //user details

				// Check if userData contains employee-specific details
				if (userData && userData.first_name && userData.last_name) {
					login(
						{
							uid,
							email: userData.department_id,
							role,
							employee_id: userData.employee_id,
							first_name: userData.first_name,
							last_name: userData.last_name,
							department: userData.department_id,
						},
						"employee"
					);

					localStorage.setItem("access_token", data.access_token);
					localStorage.setItem("refresh_token", data.refresh_token);
					localStorage.setItem(
						"user_data",
						JSON.stringify(
							{
								uid,
								email: userData.department_id,
								role,
								employee_id: userData.employee_id,
								first_name: userData.first_name,
								last_name: userData.last_name,
								department: userData.department_id,
							},
							"employee"
						)
					);

					console.log("Login successful:", data.user);
					setErrorMessage("");
					navigate("/dashboard");
				} else {
					setErrorMessage("User details not found");
					console.error("User details not found");
				}
			} else {
				setErrorMessage("No user data in response");
				console.error("No user data in response");
			}
		} catch (error) {
			console.error("Login failed:", error);
			alert(
				"An error occurred while logging in. Please try again later."
			);
			setErrorMessage(
				"An error occurred while logging in. Please try again later."
			);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh", // Fill the viewport height for vertical centering
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
					margin: "0 auto", // Center horizontally
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
					Employee Sign In
				</Typography>

				<form onSubmit={handleLogin}>
					<Box sx={{ mb: 2 }}>
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
						/>

						<TextField
							type="password"
							placeholder="Password"
							required
							fullWidth
							variant="outlined"
							value={password} //Bind to typing state
							onChange={(e) => setPassword(e.target.value)} //update as typed
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
								inputProps: {
									minLength: 8, //Force min length requirement
								},
							}}
							sx={{ mb: 2 }}
						/>
					</Box>

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							mb: 2,
						}}
					>
						<FormControlLabel
							control={<Checkbox />}
							label="Remember me"
						/>
						<a href="#">Forgot Password?</a>
					</Box>

					<Box
						sx={{
							mb: 2,
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Typography variant="h4" gutterBottom>
							Customer ?
							<Link to="/custlogin "> Sign in Here</Link>
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
						Sign In
					</Button>
				</form>
			</Box>
		</Box>
	);
}
