import validator from "validator";
import {isEmpty} from "./is-empty";

export const validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    const re=/\S+@\S+\.\S+/;

    if (!re.test(data.email)) {
        errors.email = 'Email is invalid';
    }
    if(validator.isEmpty(data.email))
    {
        errors.email='Email is required';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password required';
    }




    return {errors, isValid: isEmpty(errors)};
};
