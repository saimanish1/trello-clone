import React, {Component} from 'react';
import {Link,Route} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Board from "../containers/Board/Board";

class Router extends Component {
    render() {
        return (
            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Route path={'/'} component={Home}/>
                <Route path={'/about'} component={Board}/>

            </div>
        );
    }
}

export default Router;