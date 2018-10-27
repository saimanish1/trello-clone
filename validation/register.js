import validator from "validator";
import {isEmpty} from "./is-empty";

export const validateRegisterInput = (data) => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    const re=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if (!validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!re.test(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password required';
    }
    if (!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = ' confirm Password required';
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password2='Passwords must match';
    }

    return {errors, isValid: isEmpty(errors)};
};
