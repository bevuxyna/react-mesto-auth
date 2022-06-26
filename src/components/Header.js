import React from 'react';
import {Link, Route} from "react-router-dom";
import logo from '../styles/images/logo_mesto.svg';


function Header({loggedIn, userEmail, onSignOut}) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип MESTO RUSSIA" className="header__logo"/>

            {!loggedIn &&
                <>
                    {<Route path="/sign-up">
                        <Link to="/sign-in" className="header__link">Войти</Link>
                    </Route>}
                    {<Route path="/sign-in">
                        <Link to="/sign-up" className="header__link">Регистрация</Link>
                    </Route>}
                </>
            }

            {loggedIn &&
                <div className="header__menu">
                    <p className="header__user-email">{userEmail}</p>
                    <a className="header__link header__link_logout" onClick={onSignOut}>Выйти</a>
                </div>
            }
        </header>
    )
}

export default Header