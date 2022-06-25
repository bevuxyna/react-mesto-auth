import React, {useEffect, useRef} from "react";

function Popup(props) {
    const popup = useRef(null);

    function handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button-close')) {
            props.onClose();
        }
    }

    //закрытие попапов по Esc
    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            props.onClose();
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
        <div className={props.className} ref={popup}>
            {props.children}
        </div>
    )
}

export default Popup;