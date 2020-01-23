import React from 'react';
import './style.css';

const Order = (props) => (
        <ol className={'order'}>
            {props.menuItens.map((menu) =>
            <button key={menu.id} onClick={() => props.handleClick(menu)}>
                <div>
                    <p>{menu.name} </p>
                    <h4>R$ {menu.price},00</h4>
                </div>
            </button>  
            )}
        </ol>
)

export default Order