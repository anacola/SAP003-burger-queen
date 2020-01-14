import React from 'react';
import Logo from './img/logo1.png';
import { Link } from "react-router-dom"
import './main.css';

const Main = () => {
    
    return (
        <div className={'main'}>

            <img src={Logo} alt={'Burger Queen'} className={'img-main'} />

            <nav className={'main-navegation'}>
                <Link to="/service" className='main-link'>Restaurante</Link>
                <Link to="/kitchen" className='main-link'>Cozinha</Link>
                <Link to="/delivery" className='main-link'>Delivery</Link>
            </nav>
        </div>
    )
}

export default Main