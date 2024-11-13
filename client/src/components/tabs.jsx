import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Dynamic color based on theme mode for unselected tabs
    '&.Mui-selected': {
      color: '#1890ff', // Constant color for selected tab (blue for example)
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

const CustomizedTabs = ({ tabs, activeTab, setActiveTab }) => {
  const theme = useTheme(); // Get the current theme

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: 'transparent' }}>
        <StyledTabs
          value={activeTab}
          onChange={handleChange}
        >
          {tabs.map((tab) => (
            <StyledTab label={tab} value={tab} key={tab} />
          ))}
        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
};

export default CustomizedTabs;
