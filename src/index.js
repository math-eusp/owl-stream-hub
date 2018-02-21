import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import './index.css'

// Containers
import Full from './containers/Full/'

//redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/owl'


const store = createStore(reducer)
const history = createBrowserHistory();

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
        <Switch>
            <Route path="/" name="Home" component={Full}/>
        </Switch>
        </Router>
    </Provider>
), document.getElementById('root'))
