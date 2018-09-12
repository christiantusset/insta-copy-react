import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { timeline } from './reducers/timeline';
import { notificacao } from './reducers/header';

const reducers = combineReducers({ timeline, notificacao });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function verificaAutenticacao() {
    if (localStorage.getItem('auth-token') != null) {
        return true;
    }
    else {
        return false;
    }
}

ReactDOM.render(
    (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/timeline/:login" component={App} />
                    <Route path="/timeline" render={() => (
                        verificaAutenticacao() ? (
                            <App />
                        ) : (
                                <Redirect to="/?msg=Você precisa estar logado para acessar a Timeline!" />
                            )
                    )} />
                    <Route exact path="/logout" component={Logout} />
                </Switch>
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);
registerServiceWorker();
