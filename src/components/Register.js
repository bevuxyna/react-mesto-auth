import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register({onRegister}) {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setUserData({
            ...userData, [name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister(userData);
    }

    return (
        <div className="form__container">
            <div className="form__block">
                <h2 className="form__title">Регистрация</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="form__input"
                        name="email"
                        type="email"
                        id="email"
                        value={userData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />

                    <input
                        className="form__input"
                        name="password"
                        type="password"
                        id="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Пароль"
                        required
                    />

                    <button
                        className="form__button-submit form__button-submit_type_register"
                        type="submit"
                    >
                        Зарегистрироваться
                    </button>
                </form>

                <div className="form__signin-block">
                    <p className="form__signin-text">Уже зарегистрированы? </p>
                    <Link className="form__signin-link" to="/sign-in">Войти</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;