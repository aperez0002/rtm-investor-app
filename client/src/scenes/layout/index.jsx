import React, { useState } from 'react';
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar';
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from 'state/api';

const Layout = () => {

    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { userInfo } = useSelector((state) => state.auth ); // grabs the userID from the state index.js file
    console.log("in the layout, userInfo is", userInfo);
    
    const { data } = useGetUserQuery(userInfo.user._id); // Makes the api call to the backend

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
            user={data || {}}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
        />     
        <Box flexGrow={1}>
            <Navbar
                user={data || {}}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet />
        </Box>
    </Box>
  )
}

export default Layout;