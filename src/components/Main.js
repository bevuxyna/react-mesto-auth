import React, {useContext} from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <section className="profile">
                <div className="profile__content">
                    <img src={currentUser.avatar} alt="Аватар"
                         className="profile__avatar"/>
                    <button
                        type="button"
                        className="profile__edit-avatar-button"
                        onClick={onEditAvatar}></button>
                    <div className="profile__info">
                        <div className="profile__item">
                            <h1 className="profile__author">{currentUser.name}</h1>
                            <button
                                type="button"
                                className="profile__edit-button"
                                aria-label="Редактировать профиль"
                                onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__box">
                    {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}/>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Main;