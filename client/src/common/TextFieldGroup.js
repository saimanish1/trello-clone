import React from 'react';
import classes from './TextFieldGroup.module.scss';
const TextFieldGroup = props => {
  const {
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
    disabled,
    label,
    autoComplete,
  } = props;
  return (
    <div>
      {label && <p className={classes.label}>{label}</p>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={'inputField'}
        autoComplete={'off'}
      />
      {info && <small>{info}</small>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default TextFieldGroup;
