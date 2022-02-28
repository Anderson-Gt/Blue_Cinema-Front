import React from 'react';
import { Redirect, Route } from 'react-router';
import { useState } from 'react';
import userService from '../api/services/user.service';


const ProtectedRoute = ({ component: Component, ...restOfProps }) => {

    const [isAdmin] = useState(userService.getRolesCurrentUser().includes("ROLE_ADMIN"));

    return (
        <Route{...restOfProps} render={(props) => (isAdmin ? <Component {...props} /> : <Redirect to="/home" />)} />
    );

}

export default ProtectedRoute;
