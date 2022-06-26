import React, {useEffect, useRef} from "react";

function Popup({onClose, className, children}) {
    const popup = useRef(null);

    function handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
            onClose();
        }
    }

    //закрытие попапов по Esc
    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleEscClose);
        document.addEventListener("click", handleOverlayClose)
        return () => {
            document.removeEventListener("keydown", handleEscClose);
            document.removeEventListener("click", handleOverlayClose);
        }
    }, []);

    return (
        <div className={className} ref={popup}>
            {children}
        </div>
    )
}

export default Popup;