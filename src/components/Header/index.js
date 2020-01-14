import React from 'react';
import './style.css';
import Logo from './logo1.png';
import { Link } from "react-router-dom"

const Header = (props) =>{
    return (
        <header className={'header'}>
            <div>
                <img src={Logo} alt={props.alt} className={'img'}/>
            </div>
            <nav className={'navegation'}>
                     <Link to="/service" className='link'>Restaurante</Link>
                     <Link to="/kitchen" className='link'>Cozinha</Link>
                     <Link to="/delivery" className='link'>Delivery</Link>  
            </nav>
        </header>
    );
} 


export default Header;