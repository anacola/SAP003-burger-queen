import React from 'react';

const Card = (props) =>{
    return (
        <div placeholder={props.placeholder} value={props.state} id={props.id} onClick={props.handleClick} className="card">{props.text} R$ {props.price},00</div>
    );
} 


export default Card;