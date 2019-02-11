import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import classes from './Header.module.css'
import {ReactComponent as Logo} from '../../assets/images/trello-logo-blue.svg';
import {clearCurrentProfile, logoutUser} from "../../store/actions/authActions";
class Header extends Component {
    onLogoutClick = (e)=>{
      e.preventDefault();
      this.props.logoutUser();
      this.props.clearCurrentProfile();
    };
    render() {

        const  {isAuthenticated}=this.props.auth;
        const authLinks = (
            <React.Fragment>
                <Link to={'/boards'} className={classes.header__boards}>Boards</Link>
                <a href="#" className={classes.header__logout} onClick={this.onLogoutClick}>Logout</a>
            </React.Fragment>
        );

        const guestLinks = (
           <React.Fragment>
               <Link to={'/register'} className={classes.header__login}>Sign up</Link>
               <Link to={'/'} className={classes.header__logout}>Login</Link>
           </React.Fragment>
        );

        return (
            <header className={classes.header}>
               <Logo className={classes.logo}/>
                {isAuthenticated?authLinks:guestLinks}
            </header>
        );
    }
}
const mapStateToProps = (state)=>{
return {
    auth:state.auth
}
};
export default connect(mapStateToProps,{logoutUser,clearCurrentProfile})(Header);