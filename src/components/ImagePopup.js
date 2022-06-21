import React from "react";

function ImagePopup({card, onClose, onOverlayClose}) {
    return(
        <div
            className={`popup popup_type_open-image ${card.link ? 'popup_opened' : ''}`}
            onClick={onOverlayClose}>
            <div className="popup__container-image">
                <img className="popup__picture" src={card.link} alt={card.name} />
                <p className="popup__figcaption">{card.name}</p>
                <button
                    type="button"
                    className="popup__button-close popup__button-close_type_image"
                    onClick={onClose}>
                </button>
            </div>
        </div>
    )
}

export default ImagePopup;