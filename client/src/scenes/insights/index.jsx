import { Box, Card, CardContent, Typography } from "@mui/material";
import CustomizedTabs from "../../components/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Invoices from "../invoices";
import Transactions from "../customertransactions";
import Leaderboard from "../../components/Leaderboard";
import MaintenanceReports from "./workorderreports";
import RidesReports from "./ridesreports";
import Orders from "../orders";
import EmployeePayroll from "../employees/payroll";
import Customers from "../customers";
import InvoiceReports from "./invoicereports";



const Insights = () => {


  const navigate = useNavigate();



    const [activeTab, setActiveTab] = useState('Customer Reports');
    const tabs = ['Rides Reports', 'Maintenance Reports', 'Order Reports', 'Timelog Reports' ];   // Page table tabs
    // Function to render the correct table component
    const renderTable = () => {
      switch (activeTab) {
        case 'Customer Reports':
          return <Customers />
        case 'Rides Reports':
          return <RidesReports />
        case 'Maintenance Reports':
            return <MaintenanceReports />
        case 'Order Reports':
            return <InvoiceReports />
        case 'Timelog Reports':
            return <EmployeePayroll />
        default:
          return null;
      }
    };
  

      return <Box m="20px"> 
                  <Header title="Insights" subtitle="View a list of relevant reports " />
                      <Box >
                        <CustomizedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                        {renderTable()} 
                      </Box>  
      
              </Box>
      
      }
    
    export default Insights; 