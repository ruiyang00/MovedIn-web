import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore,compose} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
//need to import REDUCERS, authGuard
import reducers from './reducers';

axios.defaults.withCredentials=true;

//ReactDOM.render(<App />, document.getElementById('root'));

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store= createStore(
    reducers,
    {},
    composeWithDevTools(
    applyMiddleware(reduxThunk)
));

ReactDOM.render(
   <Provider store={store}>
     <BrowserRouter>
          <App />
        </BrowserRouter>
  </Provider>
   , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();