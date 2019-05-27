import React, {Component, Fragment} from "react";
import {GlobalStyle} from "./style";
import store from './store/index';
import {Provider} from 'react-redux';
import Home from './pages/home';

class App extends Component{
    render() {
        return (
            <Fragment>
                <GlobalStyle/>
                <Provider store={store}>
                    <Home/>
                </Provider>
            </Fragment>
        )
    }
}

export default App;