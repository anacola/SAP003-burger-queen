import React from 'react';

const Header = (props) =>{
    return (
        <div placeholder={props.placeholder} value={props.state} id={props.id} className="header">{props.text} {props.price}</div>
    );
} 


export default Header;