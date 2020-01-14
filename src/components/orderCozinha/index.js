import React from 'react';
// import './style.css';


const OrderCozinha = (props) => {
    return (
        <div className={'card'}>
            <h4>Nome: {props.name}</h4>
            <p> Mesa: {props.mesa} </p>
            <div>Itens: 
                {props.productSelect.map((item) =>
                    <p>{item.contador} {item.name}</p> 
                 )}
            </div>
            <p>Total: {props.total}</p>
            
        </div>
    )
}
export default OrderCozinha