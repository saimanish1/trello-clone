import React from 'react';
import classnames from "classnames";

const InputGroup = (props) => {
    const {name,placeholder,value,error,type,icon,onChange}=props;
    return (
        <div className="input-group mb-3">

            <input type={type} className={classnames("form-control form-control-lg",{
                'is-invalid':error
            })}
                   placeholder={placeholder}
                   name={name}
                   value={value}
                   onChange={onChange}

            />

            {error&&(<div className={"invalid-feedback"}>{error}</div>)}
        </div>
    );
};

export default InputGroup;