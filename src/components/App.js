import React, {useState, useEffect} from "react";
import {Switch, Route, Redirect, useHistory} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from '../utils/auth.js';
import imageError from '../styles/images/image_error.svg';
import imageSuccess from '../styles/images/image_success.svg';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
    const [message, setMessage] = useState('');

    const history = useHistory();

    //проверка наличия у пользователя токена
    function tokenCheck() {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res.data) {
                        setUserEmail(res.data.email);
                        //Авторизуем пользователя
                        setLoggedIn(true);

                        //Переадресация пользователя на основную страницу со всей функциональностью приложения
                        history.push('/');
                    }
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`);
                })
        }
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData);
                    setCards(cardsData);
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`);
                })
        }
    }, [loggedIn]);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setInfoTooltipOpen(false);
        setSelectedCard({});
    };

    function handleUpdateUser(data) {
        api.updateUserInfo(data)
            .then((res) => {
                //обновляем стейт currentUser из полученных данных
                setCurrentUser(res);

                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    function handleUpdateAvatar(data) {
        api.updateAvatar(data)
            .then(res => {
                //обновляем стейт currentUser из полученных данных
                setCurrentUser(res);

                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(item => item._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                //обновление стейта cards с помощью метода filter: создаём копию массива, исключив из него удалённую карточку
                setCards((state) => state.filter((c) => c._id !== card._id && c));
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    function handleAddPlaceSubmit(data) {
        api.sendCard(data)
            .then((newCard) => {
                //обновляем стейт cards с помощью расширенной копии текущего массива
                setCards([newCard, ...cards]);

                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка ${err}`);
            })
    }

    //Регистрация пользователя
    function handleRegister(registerData) {
        auth.register(registerData)
            .then(() => {
                //Попап успешной регистрации
                setInfoTooltipImage(imageSuccess);
                setMessage('Вы успешно зарегистрировались!');
                setInfoTooltipOpen(true);

                //Переадресация пользователя на страницу входа
                history.push('/sign-in');
            })
            .catch((err) => {
                //Попап ошибки регистрации
                setInfoTooltipImage(imageError);
                setMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setInfoTooltipOpen(true);

                console.log(`Ошибка ${err}`);
            });
    }

    //Вход пользователя
    function handleLogin(loginData) {
        auth.authorize(loginData)
            .then((res) => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('jwt', res.token);
                    tokenCheck();

                    //Переадресация пользователя на основную страницу со всей функциональностью приложения
                    history.push('/');
                }
            })
            .catch((err) => {
                //Попап ошибки входа
                setInfoTooltipImage(imageError);
                setMessage('Что-то пошло не так! Попробуйте ещё раз.');
                setInfoTooltipOpen(true);

                console.log(`Ошибка ${err}`);
            })
    }

    //Выход из системы, удаляем JWT-токен из localStorage
    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page__container">
                <div className="page">
                    <Header
                        loggedIn={loggedIn}
                        userEmail={userEmail}
                        onSignOut={handleSignOut}
                    />

                    <Switch>
                        <ProtectedRoute
                            exact path='/'
                            component={Main}
                            cards={cards}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            loggedIn={loggedIn}
                        />

                        <Route exact path="/sign-up">
                            <Register onRegister={handleRegister}/>
                        </Route>

                        <Route exact path="/sign-in">
                            <Login onLogin={handleLogin}/>
                        </Route>

                        //Переадресация неавторизованного пользователя на страницу авторизации
                        <Route>
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                        </Route>

                    </Switch>

                    <Footer/>

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />

                    <InfoTooltip
                        isOpen={infoTooltipOpen}
                        onClose={closeAllPopups}
                        image={infoTooltipImage}
                        message={message}
                    />

                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
