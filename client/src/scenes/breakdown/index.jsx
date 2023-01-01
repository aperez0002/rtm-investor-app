import React from 'react';
import { Box } from "@mui/material";
import Header from 'components/Header';
import BreakdownChart from 'components/BreakdownChart';
import ComingSoon from 'components/ComingSoon';

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="BREAKDOWN" subtitle="Breakdown of sales by category" />
        {/* <Box mt="40px" height="75vh">
            <BreakdownChart />
        </Box> */}
        <Box height="50vh" display="flex" justifyContent="center" alignItems="center">
          <ComingSoon />
        </Box>
    </Box>
  )
}

export default Breakdown