import React from 'react';
import './style.css';

const OrderCozinha = (props) => (
        <div className={'card'}>
            <h3>Nome: {props.name}</h3>
            <p>Mesa: {props.mesa} </p>
            <section>Itens: 
                {props.productSelect.map((item, index) =>
                    <p key={index} className={'itens'}>{item.contador} {item.name}</p> 
                 )}
            </section>
            <h4>Total: {props.total}</h4>
                       
        </div>
)

export default OrderCozinha