import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/Layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from "./app/common/util/ScrollToTop";
import { loadEvents } from './features/event/eventActions';

const store = configureStore(); // instantiating the store 
store.dispatch(loadEvents()) // using the store to dispatch the redux thunk action creator directly
const rootEl = document.getElementById('root');

let render = () => { 
    ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>, rootEl);
}; 
// configuring react router using <BrowserRouter/>. And Wrapping our app with <Provider/> and setting store instance as a prop..
//..to connect to redux

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
