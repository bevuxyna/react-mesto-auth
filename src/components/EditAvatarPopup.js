import React, {useContext, useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const currentUser = useContext(CurrentUserContext);
    const avatarRef = useRef();

    //используем реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению
    useEffect(() => {
        avatarRef.current.value = '';
    }, [currentUser, isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name={'avatar'}
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                name="avatar"
                required
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_avatar"
                id="avatar-link"
                ref={avatarRef}/>
            <span className="popup__error avatar-link-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;