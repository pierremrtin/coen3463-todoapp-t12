import React from 'react';
import ReactRouter, { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './../components/App';
import Home from './../components/Home';
import LogiRegiCont from '../container/LogiRegiCont';
import ToDoCont from '../container/ToDoCont';

var routes = (
    <Router history={browserHistory} >
        <Route path='/' component={App}>
        	<IndexRoute component={LogiRegiCont} />
        	<Route path ='login/:mode' component={LogiRegiCont} />
        	<Route path ='login' component={LogiRegiCont} />
            <Route path ='register' component={LogiRegiCont} />
            <Route path ='todos' component={ToDoCont} />
            <Route path ='todos/:mode' component={ToDoCont} />
        	<Route path ='home' component={Home}/>
        </Route>
    </Router>
)

export default routes;