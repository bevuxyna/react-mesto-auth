import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register({onRegister}) {
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setState((state) => ({
            ...state,
            [name]: value,
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const {email, password} = state;
        if (onRegister && email && password) {
            onRegister(email, password)
        }
    }

        return(
            <div className="form__container">
                <div className="form__block">
                    <h2 className="form__title">Регистрация</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            className="form__input"
                            name="email"
                            type="email"
                            id="email"
                            value={state.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />

                        <input
                            className="form__input"
                            name="password"
                            type="password"
                            id="password"
                            value={state.password}
                            onChange={handleChange}
                            placeholder="Пароль"
                            required
                        />

                        <button
                            className="form__button-submit form__button-submit_type_register"
                            type="submit"
                            onSubmit={handleSubmit}
                        >
                            Зарегистрироваться
                        </button>
                    </form>

                    <div className="form__signin_block">
                        <p className="form__signin_text">Уже зарегистрированы? </p>
                        <Link className="form__signin_link" to="/sign-in" >Войти</Link>
                    </div>
            </div>
            </div>
        )
}

export default Register;