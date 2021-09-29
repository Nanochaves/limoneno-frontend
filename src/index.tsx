import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/app/App';
import RegisterContainer from './containers/register/register';
import LoginContainer from './containers/login/login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  // And create the App with redux storage
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route path={`/login`} component={LoginContainer} />
        <Route path={`/register`} component={RegisterContainer} />
        <Route path={`/`} component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
