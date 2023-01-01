import React from 'react'
import { Typography, Box, useTheme } from "@mui/material";

const ComingSoon = ({ title, subtitle }) => {
    const theme = useTheme();
  return (
    <Box>
        <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
        >
            Coming Soon
        </Typography>
    </Box>
  );
};

export default ComingSoon