import {
	Routes,
	Route,
	Link,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { DisplayModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import Navbar from "./scenes/global/Navbar";
import Sidebar from "./scenes/global/Sidebar";
//import Calendar from "./scenes/Calendar";
import Dashboard from "./scenes/dashboard";
import LoginForm from "./scenes/login2/LoginForm";
import Employees from "./scenes/employees";
import Vendors from "./scenes/vendors";
import TransactionSelection from "./scenes/transactions/transactionSelection";
import Invoices from "./scenes/invoices";
import EmployeeForm from "./scenes/form/employeesform";
import Maintenance from "./scenes/maintenance";
import Shops from "./scenes/shops";
import Supplies from "./scenes/supplies";
import Customers from "./scenes/customers";
import Facilities from "./scenes/facilities";
import VendorSelection from "./scenes/vendorsandorders/vendorSelection";
import Safety from "./scenes/safety";
import InventoryForm from "./scenes/inventoryform/inventoryform";
import Rides from "./scenes/rides";
import CustomerVisitSelection from "./scenes/customervisits/customervisitselection";
import LoginPage from "./scenes/login/loginPage";
import SignUpPage from "./scenes/login/signupPage";
import SidebarCust from "./scenes/global/Sidebar2";
import CustomerSidebar from "./scenes/customerscreens/customerglobal/CustomerSidebar";
import CustomerDashboard from "./scenes/customerscreens/customerdashboard";
import CustomerTickets from "./scenes/customerscreens/customertickets/customerTickets";
import CustomerAppBar from "./scenes/customerscreens/customerglobal/CustomerAppBar";
import Tickets from "./scenes/tickets/Tickets";
import VisitForm from "./scenes/form/visitsform";
import RideForm from "./scenes/form/rideform";
import OrderForm from "./scenes/form/orderform";
import SafetyForm from "./scenes/form/safetyform";
import MaintenanceForm from "./scenes/form/maintenanceform";
import FacilitiesForm from "./scenes/form/facilitiesform";
import ProtectedRoute from "./components/ProtectedRoute";
import NewCustForm from "./scenes/form/newcustomerform";
import { useUser } from "./components/context/UserContext";
import MapPage from "./scenes/map";
import EmployeePayroll from "./scenes/employees/payroll";
import ManageStaff from "./scenes/managestaff/admin/managestaffselection";
import MaintenanceReports from "./scenes/insights/workorderreports";
import Insights from "./scenes/insights";
import Charts from "./scenes/charts";
import Finances from "./scenes/finances";
import ManagerDashboard from "./scenes/dashboard/managerdashboard";
import CustomerRides from "./scenes/customerrides";
import CustomerEvents from "./scenes/customerevents";
import ManagerStaffView from "./scenes/managestaff/manager";
import CustomerRestaurants from "./scenes/customerrestaurants";
import CustomerShops from "./scenes/customershops";
import CustomerFacilities from "./scenes/customerfacilities";
import PurchaseTickets from "./scenes/purchasetickets";
import ShoppingCart from "./scenes/shoppingcart";
import Checkout from "./scenes/checkout";
import ConfirmationPage from "./scenes/confirmation";
import MyTickets from "./scenes/mytickets";
import Footer from "./components/Footer";
import ProfilePage from "./scenes/profile";
import MyTeam from "./scenes/employees/worker";

function App() {
	const navigate = useNavigate();

	/*user state management */
	const { user } = useUser();

	/*diplay state management */
	const [theme, colorMode] = useMode();

	// Track sidebar state (open/closed)
	const [sidebarOpen, setSidebarOpen] = useState(true);

	//keep track of pages for limiting ui
	const location = useLocation();
	const isCustLogin = location.pathname === "/custlogin";
	const isEmpLogin = location.pathname === "/emplogin";
	const isSignUpPage = location.pathname === "/signup";
	const isSignUpPageSub = location.pathname === "/sub";

	return (
		<DisplayModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box className="app" displ>
					{!isCustLogin &&
						!isSignUpPage &&
						!isEmpLogin &&
						user?.userType === "employee" && (
							<Sidebar
								isOpen={sidebarOpen}
								toggleSidebar={() =>
									setSidebarOpen(!sidebarOpen)
								}
							/>
						)}
					<Box
						component="main"
						sx={{
							marginLeft:
								user?.userType === "employee" && sidebarOpen
									? "250px"
									: user?.userType === "employee"
										? "80px"
										: "0px",
							transition:
								user?.userType === "employee"
									? "margin-left 0.3s ease"
									: "none", // Smooth transition for sidebar toggle
						}}
						flexGrow={1}
						ml={
							!isCustLogin &&
							!isSignUpPage &&
							!isEmpLogin &&
							user?.userType === "employee"
								? "250px"
								: 0
						}
						// pt="70px"
						// p={2}

						className="content"
					>
						{/* {!isCustLogin && !isSignUpPage && !isEmpLogin && (
							<Navbar />
						)} */}
						{!isCustLogin &&
							!isEmpLogin &&
							!isSignUpPage &&
							(user?.userType !== "employee" || !user) && (
								<Navbar />
							)}
						<Routes>
							{/*User Authentication pages */}
							<Route
								path="/"
								element={<CustomerDashboard />}
							/>{" "}
							<Route path="/emplogin" element={<LoginForm />} />{" "}
							{/*Login page routing */}
							<Route
								path="/custlogin"
								element={<LoginPage />}
							/>{" "}
							{/*Inventory's form page routing */}
							<Route
								path="/signup"
								element={<SignUpPage />}
							/>{" "}
							{/*Inventory's form page routing */}
							{/*Access controlled routes */}
							{/* Dashboard routing */}
							<Route
								path="/dashboard"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<Dashboard />
									</ProtectedRoute>
								}
							/>{" "}
							{/* Dashboard routing */}
							<Route
								path="/managerdashboard"
								element={
									<ProtectedRoute allowedRoles={["manager"]}>
										<ManagerDashboard />
									</ProtectedRoute>
								}
							/>{" "}
							{/* Dashboard routing */}
							<Route
								path="/employees"
								element={
									<ProtectedRoute
										allowedRoles={["admin", "manager"]}
									>
										<Employees />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Employee page routing */}
							<Route
								path="/payroll"
								element={
									<ProtectedRoute
										allowedRoles={["admin", "manager"]}
									>
										<EmployeePayroll />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Employee page routing */}
							<Route path="/rides" element={<Rides />} />{" "}
							<Route
								path="/customer-rides"
								element={<CustomerRides />}
							/>{" "}
							<Route
								path="/customer-events"
								element={<CustomerEvents />}
							/>{" "}
							<Route
								path="/restaurants"
								element={<CustomerRestaurants />}
							/>{" "}
							<Route
								path="/customerfacilities"
								element={<CustomerFacilities />}
							/>{" "}
							<Route
								path="/customershops"
								element={<CustomerShops />}
							/>{" "}
							<Route
								path="/purchase-tickets"
								element={<PurchaseTickets />}
							/>{" "}
							<Route path="/my-tickets" element={<MyTickets />} />{" "}
							<Route
								path="/shopping-cart"
								element={<ShoppingCart />}
							/>{" "}
							<Route path="/checkout" element={<Checkout />} />{" "}
							<Route
								path="/confirmation"
								element={<ConfirmationPage />}
							/>{" "}
							<Route path="/profile" element={<ProfilePage />} />{" "}
							{/*Inventory's form page routing */}
							<Route
								path="/vendors"
								element={
									<ProtectedRoute>
										<Vendors />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Vendors page routing */}
							<Route
								path="/customers"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<Customers />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Customers page routing */}
							<Route
								path="/invoices"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<Invoices />
									</ProtectedRoute>
								}
							/>{" "}
							<Route
								path="/my-team"
								element={
									<ProtectedRoute allowedRoles={["employee"]}>
										<MyTeam />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Invoice page routing */}
							<Route path="/shops" element={<Shops />} />{" "}
							{/*Shops page pagerouting */}
							<Route
								path="/maintenance"
								element={
									<ProtectedRoute>
										<Maintenance />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Maintenance page routing */}
							<Route path="/safety" element={<Safety />} />{" "}
							{/*Safety page routing */}
							<Route
								path="/tickets"
								element={
									<ProtectedRoute>
										<Tickets />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Inventory's form page routing */}
							<Route
								path="/facilities"
								element={
									<ProtectedRoute>
										<Facilities />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Facilities page routing */}
							<Route
								path="/managestaff"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<ManageStaff />
									</ProtectedRoute>
								}
							/>{" "}
							<Route
								path="/manage-team"
								element={
									<ProtectedRoute allowedRoles={["manager"]}>
										<ManagerStaffView />
									</ProtectedRoute>
								}
							/>{" "}
							{/*DESIRED ROUTES FORMAT !! */}
							{/*Staff management page routing */}✅
							<Route
								path="/transactions"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<TransactionSelection />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Transactions tab routing */} ✅
							<Route
								path="/insights"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<Insights />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Transactions tab routing */} ✅
							{/*Report pages */}
							<Route
								path="/workorderreports"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<MaintenanceReports />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Transactions tab routing */} ✅
							<Route
								path="/charts"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<Charts />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Transactions tab routing */} ✅
							<Route
								path="/finances"
								element={
									<ProtectedRoute allowedRoles={["admin"]}>
										<Finances />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Transactions tab routing */} ✅
							{/*Creation forms*/}
							<Route
								path="/employeeform"
								element={<EmployeeForm />}
							/>{" "}
							{/*Employee creation form routing */}
							<Route
								path="/visitform"
								element={<VisitForm />}
							/>{" "}
							{/*Login page routing */}
							<Route
								path="/orderform"
								element={<OrderForm />}
							/>{" "}
							{/*Employee creation form routing */}
							<Route
								path="/safetyform"
								element={<SafetyForm />}
							/>{" "}
							{/*Login page routing */}
							<Route
								path="/maintenanceform"
								element={<MaintenanceForm />}
							/>{" "}
							{/*Employee creation form routing */}
							<Route
								path="/facilitiesform"
								element={<FacilitiesForm />}
							/>{" "}
							{/*Login page routing */}
							<Route
								path="/ridesform"
								element={<RideForm />}
							/>{" "}
							{/*Wrong route for error dimmissal ! change to no s */}
							<Route
								path="/inventoryForm"
								element={<InventoryForm />}
							/>{" "}
							{/*Inventory's form page routing */}
							{/*Customer side routes*/}
							{/* <Route
								path="/customerhome"
								element={<CustomerDashboard />}
							/>{" "} */}
							{/*Inventory's form page routing */}
							<Route
								path="/customertickets"
								element={<CustomerTickets />}
							/>{" "}
							{/*Inventory's form page routing */}
							<Route path="/parkmap" element={<MapPage />} />{" "}
							{/*Inventory's form page routing */}
							<Route
								path="/restaurants"
								element={<CustomerRestaurants />}
							/>{" "}
							<Route
								path="/customerfacilities"
								element={<Facilities />}
							/>{" "}
							<Route
								path="/customershops"
								element={<CustomerShops />}
							/>{" "}
							{/*Sidebar page routes*/}
							<Route
								path="/vendorsorders"
								element={
									<ProtectedRoute>
										<VendorSelection />{" "}
									</ProtectedRoute>
								}
							/>{" "}
							{/*Vendors & Orders tab form routing */}
							<Route
								path="/customervisits"
								element={
									<ProtectedRoute>
										<CustomerVisitSelection />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Inventory's form page routing */}
							<Route
								path="/supplies"
								element={
									<ProtectedRoute>
										<Supplies />
									</ProtectedRoute>
								}
							/>{" "}
							{/*Shops&Inventory tab routing */}
						</Routes>
					</Box>
				</Box>
			</ThemeProvider>
		</DisplayModeContext.Provider>
	);
}

export default App;
