import React from 'react';
import './style.css';

const Content = (props) => {
    return (
        <div className={props.className}>
            {props.name}
            {props.price}
            {props.text} 
        </div>
    )
} 

export default Content;