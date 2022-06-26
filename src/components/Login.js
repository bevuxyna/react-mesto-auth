import React, {useState} from "react";

function Login({onLogin}) {
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
        onLogin(userData);
        setUserData({email: '', password: ''});
    }

    return (
        <div className="form__container">
            <div className="form__block">
                <h2 className="form__title">Вход</h2>
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
                        className="form__button-submit form__button-submit_type_login"
                        type="submit"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;