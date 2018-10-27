import React from 'react';
import {Redirect,Route} from "react-router-dom";
import {connect} from 'react-redux';
const PrivateRoute = ({component:Component,auth,...rest}) => {
    return (
        <Route
            {...rest}
            render={props => auth.isAuthenticated ? (<Component {...props}/>) : (<Redirect to={"/login"}/>)}
        />
    );
};

const mapStateToProps = (state)=>{
return {
    auth:state.auth
}
};
export default connect(mapStateToProps)(PrivateRoute);