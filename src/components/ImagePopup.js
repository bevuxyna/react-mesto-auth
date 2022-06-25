import React from "react";
import Popup from "./Popup";

function ImagePopup({card, onClose}) {
    return (
        <Popup
            className={`popup popup_type_open-image ${card.link ? 'popup_opened' : ''}`}
            onClose={onClose}
        >
            <div className="popup__container-image">
                <img className="popup__picture" src={card.link} alt={card.name}/>
                <p className="popup__figcaption">{card.name}</p>
                <button
                    type="button"
                    className="popup__button-close popup__button-close_type_image"
                    onClick={onClose}>
                </button>
            </div>
        </Popup>
    )
}

export default ImagePopup;