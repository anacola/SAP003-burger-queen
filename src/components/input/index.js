import React from 'react';

const Input = (props) =>{
    return (
        <input placeholder={props.placeholder} value={props.state} id={props.id} onChange={props.handleChange} className="input" />
    );
} 


export default Input;