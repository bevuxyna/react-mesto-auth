import React from 'react';
import logo from '../styles/images/logo_mesto.svg';

function Header() {
    return (
        <header className="header">
                <img src={logo} alt="Логотип MESTO RUSSIA" className="header__logo" />
        </header>
    )
}

export default Header