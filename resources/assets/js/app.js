require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Main from './components/Main';
import Create from './components/Create';
import List from './components/List';
import Done from './components/Done';
import Edit from './components/Edit';
import Time from './components/Time';
//import App from './components/Auth/index';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { store } from './reducers/reducer'
import { isLogin } from './apiController/ActionApi'

let applicationStore = createStore(store);
let rootElement = document.getElementById('example');

render(
    <Provider store={applicationStore}>
        <Router history={browserHistory}>
            <Route path="/" component={Main} >
                <Route path="/create" component={Create} />
                <Route path="/list" component={List} />
                <Route path="/done" component={Done} />
                <Route path="/time" component={Time} />
                <Route path="/todos/:id/edit" component={Edit} />
            </Route>
        </Router>
    </Provider >,
    rootElement)