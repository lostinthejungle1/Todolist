import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);

    if (!user) {
        console.log('user not exist');
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;

