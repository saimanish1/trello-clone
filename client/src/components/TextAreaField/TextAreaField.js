import React from 'react';
import classes from './TextAreaField.module.scss'

const TextAreaField = (props) => {
    return (

        <div className={classes.container}>
            <textarea placeholder={"Enter a title for this card..."} className={classes.textareaField}/>

            <div>Add Card</div>
        </div>

    );
};

export default TextAreaField;