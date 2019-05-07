import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    //Link,
    Switch,
    //Redirect,
} from 'react-router-dom';
import Home from './home';
import Login from './login';
import 'semantic-ui-css/semantic.min.css';
import '../css/main.css';



export default ()=>(
    <Router>
        <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Login} />
        </Switch>
    </Router>
)
