import { Box, Card, CardContent, Typography } from "@mui/material";
import CustomizedTabs from "../../components/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Vendors from "../vendors";
import Customers from "../customers";
import Visits from "../visists";
import Tickets from "../tickets/Tickets";


const CustomerVisitSelection = () => {


  const navigate = useNavigate();


  {/*Table/Tab state management */}
    const [activeTab, setActiveTab] = useState('Customers');
    const tabs = ['Customers', 'Visits', 'Tickets'];   // Page table tabs
    // Function to render the correct table component
    const renderTable = () => {
      switch (activeTab) {
        case 'Customers':
          return <Customers />
        case 'Visits':
          return <Visits />
        case 'Tickets':
          return <Tickets />
        default:
          return null;
      }
    };
  
  
  
  
      return <Box m="20px"> 
                  <Header title="Customer and Visit history " subtitle="Track visit history and see a list of your customers " />
                      <Box >
                        <CustomizedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                        {renderTable()} 
                      </Box>  
              </Box>
      
      }
    
    export default CustomerVisitSelection; 