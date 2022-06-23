import React from 'react';

function InfoTooltip(props) {

    return (
        <div
            className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <img
                    className="popup__info-image"
                    alt="Картинка"
                    src={props.image} />

                <p className="popup__info-text">{props.message}</p>

                <button
                    type="button"
                    className="popup__button-close"
                    onClick={props.onClose}>
                </button>
            </div>
        </div>

    );
}

export default InfoTooltip;