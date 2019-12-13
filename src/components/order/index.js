import React from 'react';

const Order = (props) =>{
    return (
        <ol placeholder={props.placeholder} value={props.state} id={props.id} onChange={props.handleChange} className="list" />
    );
} 


export default Order;