import React, {useContext, useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen, currentUser]);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm
            name={'profile'}
            title='Редактировать профиль'
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            onOverlayClose={props.onOverlayClose}
        >
            <input
                type="text"
                name="name"
                required
                placeholder="Имя"
                className="popup__input popup__input_type_name"
                id="name"
                minLength="2"
                maxLength="40"
                value={name || ''}
                onChange={handleNameChange} />
            <span className="popup__error name-error"></span>
            <input
                type="text"
                name="about"
                required
                placeholder="О себе"
                className="popup__input popup__input_type_about"
                id="about"
                minLength="2"
                maxLength="200"
                value={description || ''}
                onChange={handleDescriptionChange} />
            <span className="popup__error about-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;