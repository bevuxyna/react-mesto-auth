import React from 'react';
import Popup from "./Popup";

function PopupWithForm({onClose, name, isOpen, onSubmit, title, buttonText, children}) {
    return (
        <Popup
            className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
            onClose={onClose}
        >
            <div className="popup__container">
                <button
                    type="button"
                    className={`popup__button-close popup__button-close_type_${name}`}
                    onClick={onClose}>
                </button>
                <h2 className="popup__title">{title}</h2>
                <form
                    name={name}
                    className={`popup__form popup__form_type_${name}`}
                    onSubmit={onSubmit}>
                    {children}
                    <button
                        type="submit"
                        className="popup__button-save popup__button-submit"
                    >{buttonText}</button>
                </form>
            </div>
        </Popup>
    )
}

export default PopupWithForm;