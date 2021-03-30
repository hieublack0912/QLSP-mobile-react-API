import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import routes from './routes';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Menu />

                    <div className="container">

                        <div className="row">
                            
                            {this.showContentMenus(routes)}
                        </div>

                    </div>
                </div>
            </Router>
        );
    }
    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((routes, index) => {
                return (
                    <Route
                        key={index}
                        path={routes.path}
                        exact={routes.exact}
                        component={routes.main}
                    />
                )
            });
        }
        return <Switch>{result}</Switch>
    }
}

export default App;