import { Box, Card, CardContent, Typography } from "@mui/material";
import CustomizedTabs from "../../../components/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Employees from "../../employees";
import EmployeePayroll from "../../employees/payroll";
import MyEmployees from "../../employees/manager";
import Departments from "../../departments";

const ManagerStaffView = ({ isOpen }) => {
	const navigate = useNavigate();


	const [activeTab, setActiveTab] = useState("My Department");
	const tabs = ["My Department", "Timesheets"]; // Page table tabs
	// Function to render the correct table component
	const renderTable = () => {
		switch (activeTab) {
			case "My Department":
				return <MyEmployees />;
			case "Timesheets":
				return <EmployeePayroll />;
			default:
				return null;
		}
	};

	return (
		<Box
			m="20px"
			ml={isOpen ? "250px" : "80px"} // Adjust left margin based on isOpen
			transition="margin 0.3s ease" // Smooth transition for margin
		>
			<Header
				title="Manage Team "
				subtitle="View your department roster and track you employee's timelogs."
			/>
			<Box>
				<CustomizedTabs
					tabs={tabs}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				{renderTable()}
			</Box>
		</Box>
	);
};

export default ManagerStaffView;
