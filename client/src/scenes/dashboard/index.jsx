import React from 'react';
import FlexBetween from 'components/FlexBetween';
import Header from 'components/Header';
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic, DatasetLinked } from '@mui/icons-material';
import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BreakdownChart from 'components/BreakdownChart';
import OverviewChart from 'components/OverviewChart';
import { useGetDashboardQuery } from 'state/api';
import StatBox from "components/StatBox"
import { useSelector } from 'react-redux';
import Snaps from 'components/News';


const Dashboard = () => {

  const { userInfo } = useSelector((state) => state.auth)
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  // console.log(userInfo._id)
  const { data, isLoading } = useGetDashboardQuery();

  if (isLoading) {
    console.log("still loading")
  }else{
    console.log(data)
  }
  
  

  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1,
    },
    {
        field: "userId",
        headerName: "User ID",
        flex: 1,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        flex: 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
]

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px"
            }}
          >
            <DownloadOutlined sx={{ mr: "10px"}} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12"}
        }}
      >
        {/* ROW 1 */}
        <StatBox 
          title="Liquidation Value"
          value={data && new Intl.NumberFormat(
            'en-US',
            {
              style: 'currency',
              currency: 'USD'
            }
          ).format(data.balData.securities_account.current_balances.liquidation_value)}
          increase={data && data.percentageData.liq.toFixed(2)}
          // increase={12}
          description="Since yesterday"
          icon={
            <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px"}} />
          }
        />
        <StatBox 
          title="Cash"
          value={data && new Intl.NumberFormat(
            'en-US',
            {
              style: 'currency',
              currency: 'USD'
            }
          ).format(data.balData.securities_account.current_balances.available_funds)}
          increase={data && data.percentageData.cash.toFixed(2)}
          // increase={-1}
          description="Since yesterday"
          icon={
            <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px"}} />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        
        <StatBox 
          title="Trades YTD"
          value={0}
          increase={null}
          description=""
          icon={
            <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px"}} />
          }
        />
        <StatBox 
          title="P/L YTD"
          value={0}
          increase={null}
          icon={
            <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px"}} />
          }
        />

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none"
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`
            }
          }}
        >
          
          
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
          
        </Box>
        
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100]}}>
            Industries
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200]}}>
            Breakdown of positions by industry
          </Typography>
        </Box> */}
        
      </Box>
      
    </Box>
    
  )
}

export default Dashboard