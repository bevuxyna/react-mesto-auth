import React, {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleCardName = (evt) => {
        setName(evt.target.value);
    }

    const handleCardLink = (evt) => {
        setLink(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            link: link
        })
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    return (
        <PopupWithForm
            name={'add'}
            title='Новое место'
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText='Создать'
            onSubmit={handleSubmit}
            onOverlayClose={props.onOverlayClose}
        >
            <input
                type="text"
                name="name"
                required
                placeholder="Название"
                className="popup__input popup__input_type_place"
                id="place"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleCardName} />
            <span className="popup__error place-error"></span>
            <input
                type="url"
                name="link"
                required
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_link"
                id="link"
                value={link}
                onChange={handleCardLink} />
            <span className="popup__error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;