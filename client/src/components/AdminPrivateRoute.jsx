import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
    // Check if the admin is logged by using localStorage data
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const isLoggedIn = adminData?.isLogin;

    // If not logged in, redirect to login; otherwise, show the requested component
    return isLoggedIn ? children : <Navigate to="/adminLogin" replace />;
};

export default AdminPrivateRoute;
