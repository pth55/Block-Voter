import React from 'react';
import { Navigate } from 'react-router-dom';

const VoterPrivateRoute = ({ children }) => {
    const voterData = JSON.parse(localStorage.getItem('voterData'));
    const isVoterLoggedIn = voterData?.isLogin;
    return isVoterLoggedIn ? children : <Navigate to="/voterLogin"/>;
};

export default VoterPrivateRoute;
