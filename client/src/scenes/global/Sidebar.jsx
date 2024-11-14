import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
	Box,
	IconButton,
	Typography,
	useTheme,
	Divider,
	ListItemIcon,
	Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens, DisplayModeContext } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TourIcon from "@mui/icons-material/Tour";
import InventoryIcon from "@mui/icons-material/Inventory";
import InsightsIcon from "@mui/icons-material/Insights";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import SecurityIcon from "@mui/icons-material/Security";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import NotificationMenu from "./NotificationMenu";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import { useUser } from "../../components/context/UserContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(DisplayModeContext);
	const [isClosed, setIsClosed] = useState(false);
	const [selected, setSelected] = useState("Dashboard");
	const { user, logout } = useUser();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/emplogin");
	};

	const handleProfileClick = () => {
		navigate("/profile");
	};

	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				height: "100vh",
				width: isOpen ? "250px" : "80px",
				background: `${colors.grey[700]} !important`,
				zIndex: 1000,
				"& .pro-sidebar-inner": {
					background: `${colors.grey[700]} !important`,
				},
				"& .pro-icon-wrapper": {
					backgroundColor: "transparent !important",
				},
				"& .pro-inner-item": {
					padding: "5px 35px 5px 20px !important",
				},
				"& .pro-inner-item:hover": {
					color: "#868dfb !important",
				},
				"& .pro-menu-item.active": {
					color: "#6870fa !important",
				},
			}}
		>
			<ProSidebar collapsed={!isOpen}>
				<Menu iconShape="square">
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={toggleSidebar}
						icon={<MenuOutlinedIcon fontSize="small" />}
						style={{
							color: colors.grey[100],
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							marginBottom: "10px",
						}}
					>
						{isOpen && (
							<Typography variant="h4" color={colors.grey[100]}>
								SHASTA PORTAL
							</Typography>
						)}
					</MenuItem>

					{/* Profile Section */}
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						py={2}
					>
						{/* Profile Picture for Collapsed Sidebar */}
						<Box
							sx={{
								width: isOpen ? "70px" : "40px",
								height: isOpen ? "70px" : "40px",
								borderRadius: "50%",
								overflow: "hidden",
								border: `2px solid ${colors.primary[500]}`,
							}}
						>
							<img
								alt="profile-photo"
								src={
									user.userType === "employee"
										? "../../assets/user.png"
										: "../../assets/user2.jpeg"
								}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						</Box>

						{/* Name and Role for Expanded Sidebar */}
						{isOpen && (
							<>
								<Typography
									variant="h4"
									color={colors.grey[100]}
									fontWeight="bold"
									sx={{ mt: 1 }}
								>
									{user.first_name} {user.last_name}
								</Typography>
								<Typography
									variant="body2"
									color={colors.greenAccent[500]}
								>
									{user.role} | {user.email}
								</Typography>
							</>
						)}

						{/* Action Icons (Toggle & Notifications) */}
						{isOpen && (
							<Box
								display="flex"
								justifyContent="center"
								gap={1}
								mt={1}
							>
								<IconButton
									onClick={colorMode.toggleDisplayMode}
									size="small"
									sx={{
										color: colors.grey[100],
										padding: 0,
									}}
								>
									{theme.palette.mode === "dark" ? (
										<DarkModeOutlinedIcon fontSize="small" />
									) : (
										<LightModeOutlinedIcon fontSize="small" />
									)}
								</IconButton>
								<IconButton
									size="small"
									sx={{
										color: colors.grey[100],
										padding: 0,
									}}
								>
									<NotificationMenu fontSize="small" />
								</IconButton>
							</Box>
						)}
					</Box>

					{/* Sidebar Main Items */}
					<Box paddingLeft={isOpen ? "10%" : undefined}>
						<Item
							title="Dashboard Home"
							to={
								user?.role === "employee"
									? "/employeedashboard"
									: user?.role === "manager"
										? "/managerdashboard"
										: "/dashboard"
							}
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						{/* Employee elements */}
						{user.role === "employee" && (
							<>
								{isOpen && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										My Employment
									</Typography>
								)}
								<Item
									title="Timesheet"
									to="/clockin"
									icon={<AccessibilityNewIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Payroll"
									to="/mypayroll"
									icon={<InventoryIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							</>
						)}

						{/* Departmental Tab Bar */}

						{/* Manager Elements */}
						{user.role === "manager" && (
							<>
								{!isClosed && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										My Team
									</Typography>
								)}
								<Item
									title="Manage Team"
									to="/my-team"
									icon={<PeopleOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Budget"
									to=""
									icon={<HandymanIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Meetings"
									to=""
									icon={<TourIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								{!isClosed && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										Communication and Planning
									</Typography>
								)}
								<Item
									title="Tasks"
									to=""
									icon={<InsightsIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Workflow"
									to=""
									icon={<ReceiptOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Announcements"
									to=""
									icon={<AnalyticsOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							</>
						)}

						{/* Park Overview (Admin) */}
						{user.role === "admin" && (
							<>
								{isOpen && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										Park Overview
									</Typography>
								)}
								<Item
									title="Shops & Inventory"
									to="/supplies"
									icon={<InventoryIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Orders & Vendors"
									to="/vendorsorders"
									icon={<ContactsOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							</>
						)}

						{/* Manager Elements */}
						{user.role === "manager" && (
							<>
								{isOpen && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										My Team
									</Typography>
								)}
								<Item
									title="Manage Team"
									to="/my-team"
									icon={<PeopleOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Budget"
									to="/managerdashboard"
									icon={<HandymanIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Meetings"
									to="/managerdashboard"
									icon={<TourIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								{isOpen && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										Communication and Planning
									</Typography>
								)}
								<Item
									title="Tasks"
									to="/managerdashboard"
									icon={<InsightsIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Workflow"
									to="/managerdashboard"
									icon={<ReceiptOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Announcements"
									to="/managerdashboard"
									icon={<AnalyticsOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							</>
						)}

						{/* Admin Elements */}
						{user.role === "admin" && (
							<>
								<Item
									title="Rides & Attractions"
									to="/rides"
									icon={<LocalActivityIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Park Safety"
									to="/safety"
									icon={<SecurityIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								{isOpen && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										Team and Operations
									</Typography>
								)}
								<Item
									title="Rides & Attractions"
									to="/rides"
									icon={<LocalActivityIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Park Safety"
									to="/safety"
									icon={<SecurityIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Manage Staff"
									to="/managestaff"
									icon={<PeopleOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Maintenance"
									to="/maintenance"
									icon={<HandymanIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Customer/Visit info"
									to="/customervisits"
									icon={<TourIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Facilities"
									to="/facilities"
									icon={<AccessibilityNewIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								{isOpen && (
									<Typography
										variant="h4"
										color={colors.grey[300]}
										sx={{ m: "15px 0 5px 20px" }}
									>
										Reports and Analytics
									</Typography>
								)}
								<Item
									title="Charts"
									to="/charts"
									icon={<AnalyticsOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Insights"
									to="/insights"
									icon={<InsightsIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
								<Item
									title="Finances"
									to="/finances"
									icon={<ReceiptOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							</>
						)}
					</Box>

					{/* Bottom Action Icons */}
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						gap={2}
						flexDirection="column"
						mt="auto"
						pb={2}
					>
						{/* Divider */}
						<Divider sx={{ width: "80%", my: 1 }} />

						{/* Profile, Settings, Logout - Styled Row */}
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							width="100%"
							gap={isOpen ? 3 : 2}
							px={isOpen ? 1 : 2}
							flexDirection={isOpen ? "row" : "column"}
						>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								sx={{ cursor: "pointer" }}
								onClick={handleProfileClick}
							>
								<PersonAdd fontSize="small" />
								<Typography variant="caption">
									Profile
								</Typography>
							</Box>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								sx={{ cursor: "pointer" }}
								onClick={() => navigate("/settings")}
							>
								<Settings fontSize="small" />
								<Typography variant="caption">
									Settings
								</Typography>
							</Box>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								sx={{ cursor: "pointer" }}
								onClick={handleLogout}
							>
								<LogoutIcon fontSize="small" />
								<Typography variant="caption">
									Logout
								</Typography>
							</Box>
						</Box>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;