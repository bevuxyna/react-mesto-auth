import React, {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [formInputValues, setFormInputValues] = useState({name: "", link: ""});

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormInputValues(prevState => ({...prevState, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(formInputValues);
    }

    useEffect(() => {
        setFormInputValues({name: "", link: ""});
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='add'
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
                value={formInputValues.name}
                onChange={handleChange}/>
            <span className="popup__error place-error"></span>
            <input
                type="url"
                name="link"
                required
                placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_link"
                id="link"
                value={formInputValues.link}
                onChange={handleChange}/>
            <span className="popup__error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;