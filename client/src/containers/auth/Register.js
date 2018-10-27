import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerUser} from "../../store/actions/authActions";
import {Link} from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";

class Register extends Component {
    state={
        email:'',
        name:'',
        password:'',
        password2:'',
        errors:{}
    };
    onChangeHandler = (e)=>{
        this.setState({[e.target.name]:e.target.value});
    };
    onSubmitHandler= (e)=>{
        e.preventDefault();
        const newUser={
            name:this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);



    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props!==prevProps){
            this.setState({errors:this.props.errors});

        }
    }


    render() {
        const {errors}=this.state;

        return (
            <div className={"register"}>
                <h3 className={"register__title"}>Create a Trello Account</h3>
                <p> <span className={"register__span"}>or</span> <Link to={"/"} className={"register__anchor-tag"}>sign in to your account</Link></p>

                <form noValidate onSubmit={this.onSubmitHandler}>

                    <TextFieldGroup
                    placeholder={"e.g.,Ender Wiggin"}
                    type={"text"}
                    name={"name"}
                    value={this.state.name}
                    onChange={this.onChangeHandler}
                    error={errors.name}
                    label={"Name"}
                    />
                    <TextFieldGroup
                        placeholder={"e.g.,ender@battle.edu"}
                        name={"email"}
                        type={"email"}
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        error={errors.email}
                        label={"Email"}
                    />
                    <TextFieldGroup
                        placeholder="e.g., ••••••••••••"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        error={errors.password}
                        label={"Password"}
                    />
                    <TextFieldGroup
                        placeholder="Confirm Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChangeHandler}
                        error={errors.password2}
                        label={"Confirm your password"}
                    />
                    <button className={"register__Button"}>Create New Account</button>

                </form>
                {errors.message?<p>{errors.message}</p>:null}

            </div>
        );
    }
}

const mapStateToProps = (state)=>{
return {
    auth:state.auth,
    errors:state.errors
} 
};

export default connect(mapStateToProps,{registerUser})(Register);