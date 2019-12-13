import React from 'react';

const Button = (props) => {
    return (
        <button onClick={props.handleClick} className="button">{props.text}</button>
    )
} 

export default Button;