import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Paper,
	Divider,
	FormControlLabel,
	Checkbox,
	Modal,
	CircularProgress,
} from "@mui/material";
import { useUser } from "../../components/context/UserContext";

const ProfilePage = () => {
	const { user, login } = useUser();
	const [formData, setFormData] = useState({});
	const [initialData, setInitialData] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const initialFormData = {
			first_name: user.first_name || "",
			last_name: user.last_name || "",
			email: user.email || "",
			phone_number: user.phone_number || "",
			rewards_member: user.rewards_member || false,
			address_line1: user.address_line1 || "",
			address_line2: user.address_line2 || "",
			city: user.city || "",
			state: user.state || "",
			zip_code: user.zip_code || "",
			country: user.country || "US",
			date_of_birth: user.date_of_birth || "",
			membership_type: user.membership_type || "Not Available",
			registration_date: user.registration_date || "",
			renewal_date: user.renewal_date || "",
		};
		setFormData(initialFormData);
		setInitialData(initialFormData); // Save initial data for comparison
	}, [user]);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const validatePhoneNumber = (phone) => {
		// Remove non-numeric characters
		const numericPhone = phone.replace(/\D/g, "");
		// Validate length (10 digits for US-based numbers)
		if (numericPhone.length < 10) {
			return "Phone number must have at least 10 digits.";
		}
		return null; // No error
	};

	const validateForm = () => {
		const validationErrors = {};

		// Validate phone number
		if (formData.phone_number) {
			const phoneError = validatePhoneNumber(formData.phone_number);
			if (phoneError) {
				validationErrors.phone_number = phoneError;
			}
		}

		// ZIP code validation
		if (formData.zip_code && !/^\d{5}(-\d{4})?$/.test(formData.zip_code)) {
			validationErrors.zip_code = "Invalid ZIP Code format.";
		}

		// Date of birth validation
		if (formData.date_of_birth) {
			const dob = new Date(formData.date_of_birth);
			if (isNaN(dob)) {
				validationErrors.date_of_birth = "Invalid date of birth.";
			}
		}

		return validationErrors;
	};

	const handleSave = async () => {
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch(
				`https://theme-park-backend.ambitioussea-02dd25ab.eastus.azurecontainerapps.io/api/v1/customers/${user.email}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update profile");
			}

			const updatedUser = await response.json();
			login(updatedUser, "customer");
			setInitialData(formData); // Update initial data after saving changes
			setIsModalOpen(true);
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Failed to update profile. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Compare formData with initialData to check if changes were made
	const isChanged = JSON.stringify(formData) !== JSON.stringify(initialData);

	return (
		<Box p={3} display="flex" justifyContent="center">
			<Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: "100%" }}>
				<Typography variant="h4" gutterBottom>
					Edit Profile
				</Typography>
				<Divider sx={{ mb: 3 }} />

				<Box display="flex" flexDirection="column" gap={2}>
					<TextField
						label="First Name"
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="Last Name"
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="Email"
						name="email"
						value={formData.email}
						fullWidth
						disabled
					/>
					<TextField
						label="Phone Number"
						name="phone_number"
						value={formData.phone_number}
						onChange={handleChange}
						fullWidth
						error={!!errors.phone_number}
						helperText={errors.phone_number}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={formData.rewards_member}
								name="rewards_member"
								disabled
							/>
						}
						label="Rewards Member"
					/>
					<TextField
						label="Address Line 1"
						name="address_line1"
						value={formData.address_line1}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="Address Line 2"
						name="address_line2"
						value={formData.address_line2}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="City"
						name="city"
						value={formData.city}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="State"
						name="state"
						value={formData.state}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						label="ZIP Code"
						name="zip_code"
						value={formData.zip_code}
						onChange={handleChange}
						fullWidth
						error={!!errors.zip_code}
						helperText={errors.zip_code}
					/>
					<TextField
						label="Country"
						name="country"
						value={formData.country}
						fullWidth
						disabled
					/>
					<TextField
						label="Date of Birth"
						name="date_of_birth"
						type="date"
						value={formData.date_of_birth}
						onChange={handleChange}
						fullWidth
						error={!!errors.date_of_birth}
						helperText={errors.date_of_birth}
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						label="Membership Type"
						name="membership_type"
						value={formData.membership_type}
						fullWidth
						disabled
					/>
					<TextField
						label="Registration Date"
						name="registration_date"
						type="date"
						value={formData.registration_date}
						fullWidth
						disabled
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						label="Renewal Date"
						name="renewal_date"
						type="date"
						value={formData.renewal_date}
						onChange={handleChange}
						fullWidth
						InputLabelProps={{ shrink: true }}
					/>
				</Box>

				<Button
					variant="contained"
					color="primary"
					onClick={handleSave}
					disabled={!isChanged || isLoading} // Disable button if no changes or loading
					sx={{
						mt: 3,
						backgroundColor: isChanged ? "#2344A1" : "gray", // Change button color if disabled
						color: "white",
						"&:hover": {
							backgroundColor: isChanged ? "#3A5BC7" : "gray",
						},
					}}
				>
					{isLoading ? (
						<CircularProgress size={24} color="inherit" />
					) : (
						"Save Changes"
					)}
				</Button>

				<Modal
					open={isModalOpen}
					onClose={handleCloseModal}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 300,
							bgcolor: "background.paper",
							borderRadius: 2,
							boxShadow: 24,
							p: 3,
						}}
					>
						<Typography
							id="modal-title"
							variant="h6"
							component="h2"
							gutterBottom
						>
							Changes Saved
						</Typography>
						<Typography id="modal-description" sx={{ mt: 2 }}>
							Your profile changes have been saved successfully.
						</Typography>
						<Button
							variant="contained"
							color="primary"
							onClick={handleCloseModal}
							sx={{
								mt: 3,
								backgroundColor: "#2344A1",
								color: "white",
								"&:hover": {
									backgroundColor: "#3A5BC7",
								},
							}}
						>
							Close
						</Button>
					</Box>
				</Modal>
			</Paper>
		</Box>
	);
};

export default ProfilePage;
