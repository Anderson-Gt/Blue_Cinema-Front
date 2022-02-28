import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail/Detail';
import Reserves from '../components/Reserves/Reserves';
import MovieAdmin from '../components/Movie-Admin/MovieAdmin';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    return(
        <Switch>
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/reserves'
                component={Reserves}
            />
            <Route
                path='/billboard'
                component={Catalog}
            />
            <ProtectedRoute
                path='/admin'
                component={MovieAdmin}
            />
             <Route
                path='/home'
                exact
                component={Home}
            />
               
        </Switch>
    ) 
}

export default Routes;