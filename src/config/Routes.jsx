import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail/Detail';
import App from '../App';

const Routes = () => {
    return(
        <Switch>
            
         
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/reserves'
                component={Home}
            />
            <Route
                path='/billboard'
                component={Catalog}
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