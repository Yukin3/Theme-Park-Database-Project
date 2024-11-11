import {
	Box,
	IconButton,
	useTheme,
	Typography,
	useMediaQuery,
	Button,
} from "@mui/material";
import { useContext } from "react";
import { DisplayModeContext } from "../../theme";
import { useLocation, Link, useNavigate } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import NotificationMenu from "./NotificationMenu";
import AccountMenu from "../../components/AccountMenu";
import DropdownMenu from "../../components/DropdownMenu";
import { useUser } from "../../components/context/UserContext";

const Item = ({ title, to, icon }) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	return (
		<Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					padding: "10px 20px",
					backgroundColor: isActive
						? "rgba(255, 255, 255, 0.1)"
						: "transparent",
					borderRadius: "8px",
				}}
			>
				<Box
					sx={{
						color: isActive ? "#FFD700" : "inherit",
						marginRight: "8px",
					}}
				>
					{icon}
				</Box>
				<Typography
					sx={{
						marginLeft: "8px",
						fontSize: "1rem",
					}}
				>
					{title}
				</Typography>
			</Box>
		</Link>
	);
};

const Navbar = () => {
	const theme = useTheme();
	const colorMode = useContext(DisplayModeContext);
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
	const navigate = useNavigate();
	const { user } = useUser();

	return (
		<Box
			display="flex"
			alignItems="center"
			p={1}
			position="sticky"
			top={0}
			zIndex={10}
			backgroundColor="black"
			boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
		>
			{/* Left Spacer */}
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

			{/* Centered Navbar Content - visible for all users */}
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				flex="2"
				mx="auto"
				pr={2}
			>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					flexWrap={isSmallScreen ? "wrap" : "nowrap"}
					gap={1}
					maxWidth="800px"
				>
					<Item title="Home" to="/" icon={<HomeOutlinedIcon />} />
					<DropdownMenu
						title="Tickets"
						menuItems={[
							{
								label: "My Tickets",
								path: "/customertickets",
							},
							{
								label: "Purchase Tickets",
								path: "/purchaseTickets",
							},
						]}
						icon={<LocalActivityIcon />}
					/>
					<Item
						title="Map"
						to="/parkmap"
						icon={<MapOutlinedIcon />}
					/>
					<DropdownMenu
						title="Amusement"
						menuItems={[
							{ label: "Rides", path: "/customer-rides" },
							{ label: "Events", path: "/customer-events" },
						]}
						icon={<AttractionsOutlinedIcon />}
					/>
					<DropdownMenu
						title="Services"
						menuItems={[
							{ label: "Dining", path: "/customerdining" },
							{
								label: "Facilities",
								path: "/customerfacilities",
							},
							{ label: "Shopping", path: "/customershops" },
						]}
						icon={<StoreOutlinedIcon />}
					/>
				</Box>
			</Box>

			{/* Right-aligned Icon Section */}
			<Box
				display="flex"
				alignItems="center"
				flex="1"
				justifyContent="flex-end"
				pl={3}
			>
				<IconButton onClick={colorMode.toggleDisplayMode}>
					{theme.palette.mode === "dark" ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
				{/* <IconButton>
					<CalendarTodayOutlinedIcon />
				</IconButton> */}

				{/* Conditionally render AccountMenu or Sign Up */}
				{user ? (
					<Box display="flex" gap={1}>
						<IconButton>
							<NotificationMenu />
						</IconButton>
						<AccountMenu userType={user.userType} />
					</Box>
				) : (
					<Box display="flex" gap={1}>
						<Button
							variant="text"
							color="inherit"
							onClick={() => navigate("/custlogin")}
						>
							Log In
						</Button>
						<Button
							variant="text"
							color="inherit"
							onClick={() => navigate("/signup")}
						>
							Register
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Navbar;
