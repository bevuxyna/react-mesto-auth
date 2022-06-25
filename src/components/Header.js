import React from 'react';
import {Link, Route} from "react-router-dom";
import logo from '../styles/images/logo_mesto.svg';


function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип MESTO RUSSIA" className="header__logo"/>

            {!props.loggedIn &&
                <>
                    {<Route path="/sign-up">
                        <Link to="/sign-in" className="header__link">Войти</Link>
                    </Route>}
                    {<Route path="/sign-in">
                        <Link to="/sign-up" className="header__link">Регистрация</Link>
                    </Route>}
                </>
            }

            {props.loggedIn &&
                <div className="header__menu">
                    <p className="header__user-email">{props.userEmail}</p>
                    <a className="header__link header__link_logout" onClick={props.onSignOut}>Выйти</a>
                </div>
            }
        </header>
    )
}

export default Header