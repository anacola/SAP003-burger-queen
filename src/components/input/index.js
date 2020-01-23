import React from 'react';
import './style.css'

const Input = (props) => (
        <input placeholder={props.placeholder} value={props.state} id={props.id} onChange={props.handleChange} className="input" />
    );

export default Input;